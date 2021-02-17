const { onFailure } = require("../utils/responseDataStructure");
module.exports = (req, res, next) => {
  try {
    const sortQuery = Object.values(req.query)
      .map((queryItem) => JSON.parse(queryItem))
      .find((item) => item.action === "sort");
    const searchQuery = Object.values(req.query)
      .map((queryItem) => JSON.parse(queryItem))
      .find((item) => item.action === "search");

    if (searchQuery) {
      for (const key in searchQuery.searchBy) {
        if (searchQuery.searchBy[key] !== undefined) {
          req.searchBy = {
            ...req.searchBy,
            [key]:
              typeof searchQuery.searchBy[key] !== "boolean" && key !== "_id"
                ? new RegExp(
                    [
                      "([^\\b]",
                      searchQuery.searchBy[key],
                      "[^\\b])|",
                      "(\\b",
                      searchQuery.searchBy[key],
                      ")",
                    ].join(""),
                    "i"
                  )
                : searchQuery.searchBy[key],
          };
        }
      }
    }
    if (sortQuery) {
      req.sortBy = {
        [sortQuery.parameter]: sortQuery.value,
      };
    } else {
      req.sortBy = {
        createdAt: -1,
      };
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(onFailure(400, "Could not fetch brand here"));
  }
};
