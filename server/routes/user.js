const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const sendVerificationCode = require("../mail/signupverification");
const JWT_SECRET = process.env.JWT_SECRET;
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

router.post(
  "/signup",
  [
    body("name", "Name must be at least 3 characters long.").isLength({
      min: 3,
    }),
    body("username", "Username must be a minimum of 6 characters.").isLength({
      min: 6,
    }),
    body("email", "Enter a valid email address.").isEmail(),
    body(
      "password",
      "Password must be strong, containing at least one uppercase letter, one lowercase letter, one digit, and a special character."
    ).isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    try {
      const { name, username, email, password, number, gender } = req.body;
      let existingEmail = await User.findOne({ email: email });
      const existingUsername = await User.findOne({ username: username });
      if (existingEmail) {
        return res.status(401).json({
          success: false,
          path: "email",
          msg: "User registration failed, the provided email address already exists in our system.",
        });
      } else if (existingUsername) {
        return res.status(401).json({
          success: false,
          path: "username",
          msg: "User registration failed, Username is already registered. Please choose a different one.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      let randomCode = generateRandomCode();
      existingEmail = new User({
        name,
        username,
        email,
        password: securePassword,
        number,
        gender,
        crown: 10,
        code: randomCode,
      });
      await existingEmail.save();
      sendVerificationCode(email, "Verification code", name, randomCode);
      return res.status(200).json({
        success: true,
        id: existingEmail._id,
        gender: existingEmail.gender,
        msg: "Please check your email for verification code!",
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  }
);

router.post("/login", [body("password").exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        type: "email",
        msg: "User with the provided username or email doesn't exist.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        type: "password",
        msg: "Invalid password. Please enter the correct password!",
      });
    }

    const tokenData = { user: { id: user.id } };
    const token = jwt.sign(tokenData, JWT_SECRET);
    if (user.verified === false) {
      let randomCode = generateRandomCode();
      sendVerificationCode(
        user.email,
        "Verification code",
        user.name,
        randomCode
      );
      user.code = randomCode;
      await user.save();
      return res.status(401).json({
        success: true,
        status: 401,
        userId: user._id,
        msg: "Please verify your account first to use aayuChat",
      });
    } else {
      return res
        .status(200)
        .json({ success: true, status: 200, token, id: user._id });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
router.post("/email-verification/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let { code } = req.body;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "No user found in the server" });
    } else {
      if (user.code !== code) {
        return res
          .status(401)
          .json({ success: false, msg: "Please enter correct code" });
      } else {
        (user.verified = true), (user.code = null), await user.save();
        return res
          .status(200)
          .json({ success: true, msg: "Email verified successfully!" });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
router.delete("/account/delete/:id", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (req.user.id !== user.id) {
      return res.status(401).json({
        success: false,
        msg: "You are not allowed to delete this account.",
      });
    }
    const deletedAccount = await User.findByIdAndDelete(req.params.id);
    if (deletedAccount) {
      return res
        .status(200)
        .json({ success: true, msg: "Account deleted successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

router.get("/fetchbyid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "User not found or doesn't exist!" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

router.get("/fetch-user", async (req, res) => {
  try {
    const query = req.query.q;
    const user = await User.findOne({ $text: { $search: query } })
      .select("-password")
      .exec();

    if (!user || Object.keys(user).length === 0) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

router.put("/setAvatar/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    user.image = req.body.image;
    await user.save();

    return res
      .status(200)
      .json({ success: true, msg: "Avatar uploaded successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
router.post("/interest/:id", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    } else if (user._id.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, msg: "You're not allowed to do changes" });
    } else {
      user.interest = req.body.data;
      await user.save();
      console.log(user.interest.length);
      res
        .status(200)
        .json({ success: true, msg: "Successfully added interests!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
router.put("/editProfile/:id", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let { age, number, location } = req.body;
    if (user._id.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized user!" });
    } else {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User with given id not found!" });
      } else {
        await User.findByIdAndUpdate(
          req.params.id,
          { $set: { age, number, location } },
          { new: true }
        );
        res
          .status(200)
          .json({ success: true, msg: "Successfully updated profile", user });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
router.post("/block/:id", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let { userId } = req.body;
    let blockedUser = await User.findById(userId);
    if (user._id.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized user!" });
    } else {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User with given id not found!" });
      } else {
        let indexOfUser = user.blockedUsers.findIndex((id) => id === userId);
        if (indexOfUser === -1) {
          user.blockedUsers.push(req.body.userId);
          await user.save();
          res.status(200).json({
            success: true,
            msg: `You have blocked ${blockedUser.name}`,
          });
        } else {
          user.blockedUsers.splice(indexOfUser, 1);
          await user.save();
          res.status(200).json({
            success: true,
            msg: `You have unblocked ${blockedUser.name}`,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = router;
