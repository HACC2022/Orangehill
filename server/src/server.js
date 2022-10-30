const express = require("express");
const cors = require("cors");
const config = require("./config/config")

const app = express();

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

require("./routes/url.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
