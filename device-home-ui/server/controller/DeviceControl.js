var express = require("express");
var axios = require("axios");

var router = express.Router();

router.get("/all", (req, res) => {
  axios
    .get(process.env.DEVICE_CONTROLLER + "/device/all")
    .then((result) => {
      if (result.data) {
        res.send(result.data);
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
});

router.post("/persist", function (req, res) {
  if (req.body.params) {
    axios
      .post(
        process.env.DEVICE_CONTROLLER + "/device/persist",
        req.body.params,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.status === 200) {
          console.log("successfully updated the switch status");
          res.send(resp.status);
        }
      })
      .catch((err) => {
        alert("Error while updating switch status");
        res.send(err.status);
      });
  }
});

module.exports = router;
