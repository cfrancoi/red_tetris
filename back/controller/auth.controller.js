const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save()
    .then((user) => {
      if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles } })
          .then((role) => {

            user.roles = roles.map(role => role._id);
            user.save()
              .then(_ => {
                res.send({ message: "User was registered successfully!" });
              })
              .catch(err => {
                res.status(500).send({ message: err });
              })
          })
          .catch((err) => {
            res.status(500).send({ message: '3' + err });
          });
      } else {
        Role.findOne({ name: "user" })
          .then((role) => {

            user.roles = [role._id];
            user.save()
              .then((user) => {
                res.send({ message: "User was registered successfully!" });
              })
              .catch(err => {
                res.status(500).send({ message: '4' + err });
              })

          })
          .catch((err) => {
            res.status(500).send({ message: '3' + err });
          });
      }
    })
    .catch(err => {
      if (err) {
        res.status(500).send({ message: '1' + err });
      }
    })
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let authorities = [];

      for (const element of user.roles) {
        authorities.push("ROLE_" + element.name.toUpperCase());
      }

      const token = jwt.sign({
        id: user.id,
        username: user.username,
        roles: authorities
      },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });


      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: '1' + err });
    })
};
