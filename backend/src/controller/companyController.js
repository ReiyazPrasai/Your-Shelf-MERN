const Company = require("../models/Company");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { companyValidation } = require("../validation/companyValidation");

module.exports.companyRegisterCallback = async (req, res, next) => {
  if (req.compnay) {
    try {
      const companyExists = await Company.findOne({
        registrationNumber: req.body.company.registrationNumber,
      });
      if (companyExists) {
        if (companyExists.isApproved) {
          return res.status(400).send(onFailure(400, "Company already exists"));
        } else {
          return res
            .status(400)
            .send(
              onFailure(400, "Company is registered and waiting for approval")
            );
        }
      } else {
        const company = new Company({
          basic: req.body.company.basic,
          finance: {
            vat: 13,
            allowedProfitMargin: null,
          },
          isApproved: false,
        });
        req.company = company;
      }
      next();
    } catch (err) {
      res.status(400).send(onFailure(400, err));
    }
  } else {
    next();
  }
};

module.exports.getByIdCompanyCallback = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(onSuccess(200, company, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch company"));
  }
};

module.exports.updateCompanyCallback = async (req, res) => {
  const { error } = companyValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const company = await Company.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      company[key] = req.body[key];
    }
  }

  const savedCompany = await company.save();
  res.status(200).json(onSuccess(200, savedCompany, "SuccessFully Updated"));
};
