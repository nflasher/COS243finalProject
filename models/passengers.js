const { Model } = require("objection");


class Passengers extends Model { //DONE
    static get tableName() {
        return 'passengers';
    }
    static get relationMappings() {
        return {
            passenger: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/passenger",
                join: {
                    from: 'passengers.passengerId',
                    to: 'passenger.id'  }

            },

            ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'passengers.rideId',
                    to: 'ride.id'  }
            }

        }

    }
}

module.exports = Passengers;