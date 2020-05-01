const { Model } = require("objection");


class Passengers extends Model { //DONE
    static get tableName() {
        return 'Passengers';
    }
    static get relationMappings() {
        return {
            passenger: {
                relation: Model.BelongsToOneRelation,
                modelClass: Passenger,
                join: {
                    from: 'Passengers.passengerId',
                    to: 'Passenger.id'  }

            },

            ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: 'Passengers.rideId',
                    to: 'Ride.id'  }
            }

        }

    }
}

module.exports = Passengers;