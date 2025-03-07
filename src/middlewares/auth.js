const auth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("pehle authorisation krke ao firse dekhna photo");
  } else {
    next();
  }
};

module.exports = {auth}

