const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);
/*
/*
var corsOptions ={
  origin:"http://localhost:8081"
};*/




//app.use(cors(corsOptions));


app.use(morgan('dev'))

// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , 'index.html'));
  //res.json({message : "Hello adventurer welcome to project!"})
})




// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


//set port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

require('./socket/socket')(server);

const db = require("./models");
const Role = db.role;

const dbConfig = require("./config/db.config.js");

//TODO FIX passzord
db.mongoose
  .connect(`mongodb://root:example@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?authSource=admin`, {
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
    Role.estimatedDocumentCount()
      .then(count => {
        
      
        if (count === 0) {
          new Role({
            name: "user"
          }).save()
            .then(() => console.log("added 'moderator' to roles collection"))
            .catch(err => {
                console.log("error", err);
            });
    
          new Role({
            name: "moderator"
          }).save()
            .then(() => console.log("added 'moderator' to roles collection"))
            .catch(err => {
                console.log("error", err);
            });
    
    
          new Role({
            name: "admin"
          }).save()
            .then(() => console.log("added 'admin' to roles collection"))
            .catch(err => {
                console.log("error", err);
            });
    
        }
      })
  }

  module.exports = app;