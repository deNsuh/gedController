var mongoose = require('mongoose');

var PunchSchema = new mongoose.Schema({
        fighter1: Number,
        fighter2: Number
    },
    {
        timestamps: true
    }
);

const Punch = mongoose.model('Punch', PunchSchema);

Punch.find({}, function(err, results) {
    if (err) {
        console.error(err);
    }
    else if (!results.length) {
        console.log("Punch mongo DB to be initiated.");

        var newPunch = new Punch({
            fighter1: 0,
            fighter2: 0
        });
        newPunch.save(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
});

module.exports = Punch;
