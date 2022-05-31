const jwt = require("jsonwebtoken");
const User = require("../controllers/userController");
require("dotenv").config();

const authenticateMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authentication Failed!" });
  }

  const token = authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET, async (error, data) => {
      if (data) {
        let response = await User.userFindById(data._id);
        if (error || response.token !== token) {
          return res.status(401).json({ error: "Authentication Failed!" });
        }
        next();
      } else {
        return res.status(401).json({ message: "Authentication Failed!" });
      }
    });
  } else {
    return res.status(401).json({ message: "Authentication Failed!" });
  }
};

module.exports = authenticateMiddleware;
