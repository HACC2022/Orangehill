const db = require("../models/db")
const URL = db.URL
const Op = db.Sequelize.Op

exports.updateTimes = function (id, newTimes) {
    if(newTimes <= 0) this.removeSpecific(id)
    else URL.update({times: newTimes}, {where: {id: id}}).then(num => {
        console.log(num)
        if(num === [1]) console.log(`Successfully updated times for ${id}`)
        else console.error(`Unable to update times for ${id}`)
    }).catch(err => {
        console.error(`Unable to update times for ${id}: ${err}`)
    });
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
    });
}

exports.removeExpired = function () {
    URL.destroy(
        {where: {
            [Op.or]: [
                {expire: {[Op.lt]: new Date(Date.now()).toISOString()}},
                {times: {[Op.lte]: 0}}
            ]
            }
        }).then(nums => {
            console.log(`Successfully deleted ${nums} expired links.`)
    }).catch(err => {
        console.error(`Unable to delete expired links: ${err}`)
    });
}