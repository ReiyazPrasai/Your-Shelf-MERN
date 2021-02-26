const Company = require("../models/Company");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { companyValidation } = require("../validation/companyValidation");

module.exports.companyRegisterCallback = async (req, res, next) => {
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
        isApproved: false
      });
      req.company = company;
    }
    next();
  } catch (err) {
    res.status(400).send(onFailure(400, err));
  }
};
