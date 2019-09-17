const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling incoming GET requests"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling incoming POST requests"
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling incoming GET request for a single id"
  });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling patch request"
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling delete request on a single id"
  });
});

module.exports = router;
