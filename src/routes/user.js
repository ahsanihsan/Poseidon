const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res, next) => {
  User.find({})
    .exec()
    .then(response => {
      res.status(200).json({
        success: true,
        message: response
      });
    })
    .catch(error => {
      res.status(500).json({
        success: true,
        message: error.message
      });
    });
});

router.post("/", (req, res, next) => {
  const { full_name, phone_number, CNIC, role, address } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    full_name,
    phone_number,
    CNIC,
    role,
    address
  });
  user
    .save()
    .then(response => {
      res.status(200).json({
        success: true,
        message: "User created successfuly",
        user: response
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
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

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOperation = {};
  for (const userOps of req.body) {
    updateOperation[userOps.propName] = userOps.value;
  }
  User.update({ _id: id }, { $set: updateOperation })
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

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.remove({ _id: id })
    .exec()
    .then(response => {
      res.status(200).json({
        success: true,
        message: "Successfully deleted a user"
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
