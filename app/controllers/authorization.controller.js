const db = require("../models");
const serves = require("../services/serversUser");
const User = db.user;

exports.findUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email });
      const match = await serves.checkUser(req.body.password, user.password);
      if (!user) {
         res.status(404).send("Invalid email ");
      }
      if (!match) {
         res.status(404).send("invalid passwor");
      }
      const token = user.token();
      const newToken = (user.auth = token);
      user.save(newToken);
      // res.header("Authorization", newToken);
      res.send(token);
   } catch (error) {
      res.status(404).send("user not found");
      console.log("user not found");
   }
};

exports.getUser = async (req, res) => {
   const token = await req.header("Authorization");
   try {
      var selectedData = {
         __v: false,
         _id: false,
         auth: false,
      };
      await User.findOne({ auth: token }, selectedData)
         .then((data) => {
            res.send(data);
         })
         .catch((err) => {
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving calenders.",
            });
         });
   } catch (error) {
      console.log(error);
   }
};
