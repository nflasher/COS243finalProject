const { Model } = require("objection");

class Ride extends Model { //DONE
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'Ride.id',
                    to: 'Drivers.rideId'
                }
            },
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: Passengers,
                join: {
                    from: 'Ride.id',
                    to: 'Passengers.rideId'
                }
            },

            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Ride.vehicleId',
                    to: 'Vehicle.id'
                }
            },

            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.fromLocationId',
                    to: 'Location.id'
                }
            },

            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.toLocationId',
                    to: 'Location.id'
                }
            }
        }
    }
}

module.exports = Ride;