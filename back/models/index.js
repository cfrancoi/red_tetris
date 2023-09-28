const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db={};

db.mongoose = mongoose;

db.user = require("./user.model");
<<<<<<< HEAD
db.role = require("./role.model");
=======
db.role = require(".role.model");
>>>>>>> 9779145dd19b8d63994ebf03100c42f8414e48f5

db.ROLES = ["user","admin","moderator"];

module.exports = db;
