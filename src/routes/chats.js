const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Chat = require("../models/chat");

router.get("/", (req, res, next) => {
  Chat.find({})
    .exec()
    .then(response => {
      res.status(200).json({
        success: true,
        message: response
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
});

router.post("/user/create", (req, res, next) => {
  const { user_id, message } = req.body;
  const shop = new Chat({
    _id: new mongoose.Types.ObjectId(),
    user: user_id,
    messages: [
      {
        _id: new mongoose.Types.ObjectId(),
        message: message,
        message_by: "5d8142e47fad7c19ade40f2e" // TODO: Replace this id with admin ID
      }
    ]
  });
  shop.save().then(response => {
    res.status(200).json({
      success: true,
      message: "Create chat succesfully",
      chat: response
    });
  });
});

router.patch("/message/:chatID", (req, res, next) => {
  Chat.findById(req.params.chatID)
    .exec()
    .then(response => {
      if (response) {
        const chat = response;
        response.messages.push({
          _id: new mongoose.Types.ObjectId(),
          message: "Hi this is test message",
          message_by: "5d8142e47fad7c19ade40f2e"
        });
        chat
          .save()
          .then(response => {
            res.status(200).json({
              success: true,
              message: "Message Sent Successfully"
            });
          })
          .catch(error => {
            res.status(500).json({
              success: true,
              message: "Message was not sent"
            });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
});

router.get("/:user_id", (req, res, next) => {
  const id = req.params.user_id;
  Chat.find({ user: id })
    .exec()
    .then(response => {
      res.status(200).json({
        success: true,
        message: response
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
});

module.exports = router;
