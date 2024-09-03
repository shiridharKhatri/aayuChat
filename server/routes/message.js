const express = require("express");
const Message = require("../models/Message");
const fetchUser = require("../middleware/fetchUser");
const puppeteer = require("puppeteer");
const User = require("../models/User");
const router = express.Router();
router.post("/send", fetchUser, async (req, res) => {
  try {
    const { sender, receiver, messageData } = req.body;
    let message = await Message.findOne({
      $and: [
        { $or: [{ sender: sender }, { receiver: sender }] },
        { $or: [{ sender: receiver }, { receiver: receiver }] },
      ],
    });
    if (req.user.id !== sender) {
      res.status(401).json({ success: false, msg: "Unauthorized user!" });
    } else {
      if (!message) {
        message = new Message({
          sender,
          receiver,
          message: messageData,
        });
        await message.save();
        res.status(200).json({ success: true, message });
      } else {
        if (message.message[message.message.length - 1].sender === sender) {
          message.message[message.message.length - 1].data.push(
            messageData.data
          );
          await message.save();
          res.status(200).json({ success: true, message });
        } else {
          message.message.push(messageData);
          await message.save();
          res.status(200).json({ success: true, message });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

router.post("/get-private-message", fetchUser, async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    let message = await Message.findOne({
      $and: [
        { $or: [{ sender: sender }, { receiver: sender }] },
        { $or: [{ sender: receiver }, { receiver: receiver }] },
      ],
    });
    if (req.user.id !== sender) {
      res.status(401).json({ success: false, msg: "Unauthorized user!" });
    } else {
      if (!message || sender === receiver) {
        res
          .status(404)
          .json({ success: false, msg: "Message not found with a given user" });
      } else {
        res
          .status(200)
          .json({ success: true, length: message.message.length, message });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
router.get("/recent-message/:user", fetchUser, async (req, res) => {
  try {
    let recentMessage = [];
    let message = await Message.find({
      $or: [{ sender: req.params.user }, { receiver: req.params.user }],
    });
    if (req.user.id !== req.params.user) {
      res.status(401).json({ success: false, msg: "Unauthorized user!" });
    } else {
      if (!message) {
        res
          .status(404)
          .json({ success: false, msg: "Message not found with a given user" });
      } else {
        for (let m of message) {
          let user = await User.findById(
            req.params.user.toString() !== m.sender.toString()
              ? m.sender.toString()
              : m.receiver.toString()
          );
          if (!user) {
            console.log("No user found");
          } else {
            recentMessage.push({
              receiver: {
                id: user.id,
                image: user ? user.image : null,
                name: user ? user.name : null,
                gender: user ? user.gender : null,
              },
              lastMessage: {
                msg:
                  m.message[m.message.length - 1].sender === req.params.user
                    ? `You : ${
                        m.message[m.message.length - 1].data[
                          m.message[m.message.length - 1].data.length - 1
                        ].content
                      }`
                    : m.message[m.message.length - 1].data[
                        m.message[m.message.length - 1].data.length - 1
                      ].content,
                time: m.message[m.message.length - 1].data[
                  m.message[m.message.length - 1].data.length - 1
                ].date,
                isNew:
                  m.message[m.message.length - 1].sender === req.params.user
                    ? false
                    : true,
              },
            });
          }
        }
        res.status(200).json({ success: true, recentMessage });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// router.get('/screenshot', async (req, res) => {
//   const url = req.query.url;

//   if (!url) {
//     return res.status(400).send('Please provide a URL');
//   }

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     const screenshot = await page.screenshot({ fullPage: false });
//     await browser.close();
//     res.set('Content-Type', 'image/png');
//     res.send(screenshot);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('An error occurred');
//   }
// });

module.exports = router;
