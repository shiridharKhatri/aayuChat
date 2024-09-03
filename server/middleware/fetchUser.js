const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = async (req, res, next) => {
  try {
    let token = await req.header("auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Please enter correct token!" });
    } else {
      let data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
module.exports = fetchUser;