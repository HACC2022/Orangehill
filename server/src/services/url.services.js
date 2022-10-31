const db = require("../models/db")
const URL = db.URL
const Op = db.Sequelize.Op

exports.updateTimes = function (id, newTimes) {
    // remove if all uses have been used up
    if(newTimes <= 0) this.removeSpecific(id)
    // otherwise just update and write that into the logs
    else URL.update({times: newTimes}, {where: {id: id}}).then(num => {
        if(num === [1]) console.log(`Successfully updated times for ${id}`)
        else console.error(`Unable to update times for ${id}`)
    }).catch(err => {
        console.error(`Unable to update times for ${id}: ${err}`)
    })
}

exports.removeSpecific = function (id) {
    URL.destroy(
        {where: {
                id: id
            }
        }).then(num => {
            if (num === 1) console.log(`Successfully deleted link ${id}`)
            else console.error(`Unable to delete link ${id}`)
    }).catch(err => {
        console.error(`Unable to delete expired link ${id}: ${err}`)
    })
}

exports.removeExpired = function () {
    URL.destroy(
        {where: {
            [Op.or]: [
                // remove if expired
                {expire: {[Op.lt]: new Date(Date.now()).toISOString()}},
                // remove if no uses left
                {times: {[Op.lte]: 0}}
            ]
            }
        }).then(nums => {
            console.log(`Successfully deleted ${nums} expired links.`)
    }).catch(err => {
        console.error(`Unable to delete expired links: ${err}`)
    })
}