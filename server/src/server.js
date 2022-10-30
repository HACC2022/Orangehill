const express = require("express");
const cors = require("cors");
const config = require("./config/config")

const path = __dirname + "/views/"
const app = express();

app.use(express.static(path))

const db = require("./models/db");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log(`Failed to sync db: ${err.message}`);
    });

const URLService = require('../src/services/url.services')
const cron = require('node-cron')
cron.schedule('* * * * *', () => {
    URLService.removeExpired()
})
console.log("Started cron cleanup demon.")

let corsOptions = {
    origin: config.clientURL
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req,res) {
    res.sendFile(path + "index.html")
});

require("./routes/url.routes.js")(app);

// set port, listen for requests
const PORT = 20069;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
