const { Model } = require("objection");

class Drivers extends Model { //DONE
    static get tableName() {
        return 'drivers';
    }
    static get relationMappings() {
        return {
            driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/driver",
                join: {
                    from: 'drivers.driverId',
                    to: 'driver.id'  }

            },

            ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'drivers.rideId',
                    to: 'ride.id'  }
            }

        }

    }
}

module.exports = Drivers;
