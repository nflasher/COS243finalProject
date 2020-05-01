const { Model } = require("objection");

class Drivers extends Model { //DONE
    static get tableName() {
        return 'Drivers';
    }
    static get relationMappings() {
        return {
            driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Driver,
                join: {
                    from: 'Drivers.driverId',
                    to: 'Driver.id'  }

            },

            ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: 'Drivers.rideId',
                    to: 'Ride.id'  }
            }

        }

    }
}

module.exports = Drivers;
