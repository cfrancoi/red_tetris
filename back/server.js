const express = require('express');
const cors = require("cors");

const app = express()

var corsOptions ={
  origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
  res.json({message : "Hello adventurer welcome to project!"})
})

<<<<<<< HEAD
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


=======
>>>>>>> 9779145dd19b8d63994ebf03100c42f8414e48f5
//set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

const db = require("./models");
const Role = db.role;

<<<<<<< HEAD
const dbConfig = require("./config/db.config.js");

//TODO FIX passzord
db.mongoose
  .connect(`mongodb://root:example@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
=======
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
>>>>>>> 9779145dd19b8d63994ebf03100c42f8414e48f5
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
<<<<<<< HEAD

    const role = new Role({name: "user"}).save()
    // Role.estimatedDocumentCount((err, count) => {
    //   if (!err && count === 0) {
    //     new Role({
    //       name: "user"
    //     }).save(err => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'user' to roles collection");
    //     });
  
    //     new Role({
    //       name: "moderator"
    //     }).save(err => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'moderator' to roles collection");
    //     });
  
    //     new Role({
    //       name: "admin"
    //     }).save(err => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'admin' to roles collection");
    //     });
    //   }
    // });
=======
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
>>>>>>> 9779145dd19b8d63994ebf03100c42f8414e48f5
  }