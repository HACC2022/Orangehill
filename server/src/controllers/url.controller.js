const db = require("../models/db")
const generator = require("../services/identifierGenerator")
const service = require("../services/url.services")
const config = require("../config/config")
const URL = db.URL
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
    // if no url was somehow provided, throw an error
    req.body = req.query
    if (!req.body.url) {
        return res.status(400).send({
            message: "URL can not be empty!"
        })
    }

    let shortID
    do {
        shortID = generator.generateIdentifier()
    } while (await URL.findOne({where: {short: shortID}}))

    // if no expiration date was provided, set it to null (interpreted as "no expiration")
    const expireDate = (!req.body.expire) ? null : new Date(Date.now() + req.body.expire * 1000).toISOString()

    const newURL = {
        url: req.body.url,
        times: req.body.times,
        expire: expireDate,
        short: shortID
    }

    URL.create(newURL).then(data => {
        res.set('Cache-Control', 'no-cache, no-store')
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: `Something went wrong while creating compressed URL: ${err.message}`
        })
    })
}

exports.findOne = (req, res) => {
    const short = req.params.short

    URL.findOne({where: {short: short}}).then(data => {
       if(data) {
           // if there is a limited amount of uses, diminish by one
           if (data.times !== null) service.updateTimes(data.id, data.times -1)
           res.redirect(data.url)
       }
       else {
           // if url not found, return to homepage and display error
           res.redirect(`/?e=404`)
       }
    }).catch(err => {
        res.status(500).send({
            message: `An error occurred retrieving the shortened URL for ${short}`
        })
    })
}

