const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const Company = require("../models/Company");

const User = require("../models/User");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const {
  loginValidation,
  registerValidation,
} = require("../validation/authValidation");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL_ADDRESS,
    pass: process.env.MY_EMAIL_PASSWORD,
  },
});

const sendMail = async (req, res) => {
  const savedCompany = (await req.company) ? req.company.save() : null;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.user.password, salt);
  const user = new User({
    ...req.body.user,
    password: hashPassword,
    companyId: savedCompany ? savedCompany._id : req.user.companyId,
  });
  try {
    jwt.sign(
      {
        userId: user._id,
        companyId: savedCompany ? savedCompany._id : req.user.companyId,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        const url = `http://localhost:8000/api/user/confirmation/${emailToken}`;
        const mailOptions = {
          from: process.env.MY_EMAIL_ADDRESS,
          to: req.body.user.email,
          subject: "Activate you email",
          html: `Please click the button to activate you email: <a href="${url}">Click here</a>`,
        };
        if (err) {
        } else {
          transporter.sendMail(mailOptions);
        }
      }
    );
    const savedUser = await user.save();
    res
      .status(201)
      .send(onSuccess(201, { user: savedUser, company: savedCompany }));
  } catch (err) {
    console.log(err);
    res.status(400).send(onFailure(400, err));
  }
};

module.exports.registerCallback = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const emailExists = await User.findOne({ email: req.body.user.email });

  if (emailExists) {
    if (emailExists.isConfirmed) {
      return res.status(400).send(onFailure(400, "Email already exists"));
    } else {
      emailExists.remove();
      sendMail(req, res);
    }
  } else {
    sendMail(req, res);
  }
};

module.exports.getUserCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const user = await User.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      const responseData = user.map(item=>({
        name: item.name,
        email: item.email,
        groupName: item.groupName,
        groupId: item.groupId,
        roleId: item.roleId,
        isActive: item.isActive,
        isConfirmed: item.isConfirmed,
      }));
      res
        .status(200)
        .json(onSuccess(200, responseData, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch user"));
  }
};

module.exports.loginCallback = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(onFailure(400, "Email does not exist."));

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send(onFailure(400, "Invalid password"));

  if (!user.isConfirmed)
    return res.status(400).send(onFailure(400, "User is not activated!"));
  const responseData = {
    _id: user._id,
    email: user.email,
    name: user.name,
    companyId: user.companyId,
    roles: user.roles,
  };
  const token = jwt.sign(responseData, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
  res
    .status(202)
    .cookie("Authorization", token, {
      // maxAge: 30 * 60 * 1000,
      path: "/",
      httpOnly: false,
      sameSite: 'none',
      // domain: 'yourshelf.netlify.app'
      
    })
    .send(onSuccess(202, { token: token }));
};

module.exports.logoutCallback = async (req, res) => {
  res.clearCookie("Authorization");
  res.end();
};

module.exports.userInfoCallback = async (req, res) => {
  try {
    const token = req.cookies.Authorization;
    if (!token)
      return res
        .status(401)
        .send(onFailure(401, "Access denied", { loggedIn: false }));
    const userInfo = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      _id: userInfo._id,
      email: userInfo.email,
    });
    if (!user)
      return res
        .status(404)
        .send(onFailure(404, "User not found", { loggedIn: false }));
    res.status(202).send(onSuccess(202, { token: token }));
    res.end();
  } catch (err) {
    console.log(err);
    res.status(401).send(onFailure(401, "Access denied", { loggedIn: false }));
    res.end();
  }
};

module.exports.confirmationCallback = async (req, res) => {
  try {
    const user = jwt.verify(req.params.token, process.env.TOKEN_SECRET);
    await Company.findById(user.companyId).then(async (company) => {
      company.isApproved = true;
      await company.save();
      await User.findById(user.userId).then(async (user) => {
        user.isConfirmed = true;
        user.companyId = company._id;
        await user.save();
        return res.redirect("https://yourshelf.netlify.app/");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(onFailure(400, "Invalid token"));
  }
};

module.exports.forgotPasswordCallback = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(onFailure(400, "Email does not exists"));
  try {
    jwt.sign(
      { _id: user._id, email: user.email, resetFlag: Math.random() },
      process.env.RESET_PASSWORD_TOKEN_SECRET,
      {
        expiresIn: "30m",
      },
      (err, resetToken) => {
        if (err) {
          console.log(err);
        } else {
          const url = `http://localhost:8000/api/user/reset-password/${resetToken}`;
          const mailOptions = {
            from: process.env.MY_EMAIL_ADDRESS,
            to: req.body.email,
            subject: "Reset your password",
            html: `
            <p>Hello ${user.name},</p>
            Please : <a href="${url}">Click here</a> to reset your password.`,
          };
          transporter.sendMail(mailOptions);
        }
      }
    );
    res.status(200).send(
      onSuccess(200, {
        message: "Link to reset your password has been sent to you mail.",
      })
    );
  } catch (err) {
    res.status(400).send(onFailure(400, err));
  }
};

module.exports.resetPasswordRedirectCallback = async (req, res) => {
  try {
    const reqUser = jwt.verify(
      req.params.token,
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );
    await User.findById(reqUser._id).then(async (user) => {
      if (!user) return res.status(400).send(onFailure(400, "Invalid token"));

      return res.redirect(
        `https://yourshelf.netlify.app///#/auth/reset-password/${req.params.token}`
      );
    });
  } catch (error) {
    res.status(400).send(onFailure(400, "Invalid token"));
  }
};

module.exports.resetPasswordCallback = async (req, res) => {
  try {
    await User.findById(req.body.id).then(async (user) => {
      if (user.resetFlag === req.body.resetFlag)
        return res
          .status(400)
          .send(
            onFailure(400, "Password has already been reset using this token.")
          );
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashPassword;
      user.resetFlag = req.body.resetFlag;

      await user.save();
      res
        .status(202)
        .send(onSuccess(202, { message: "Password successfully changed." }));
    });
  } catch (error) {
    res.status(400).send(onFailure(400, "Invalid token"));
  }
};
