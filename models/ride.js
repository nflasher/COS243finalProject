const { Model } = require("objection");

class Ride extends Model { //DONE
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/drivers",
                join: {
                    from: 'ride.id',
                    to: 'drivers.rideId'
                }
            },
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/passengers",
                join: {
                    from: 'ride.id',
                    to: 'passengers.rideId'
                }
            },

            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/vehicle",
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                }
            },

            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/location",
                join: {
                    from: 'ride.fromLocationId',
                    to: 'location.id'
                }
            },

            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/location",
                join: {
                    from: 'ride.toLocationId',
                    to: 'location.id'
                }
            }
        }
    }
}

module.exports = Ride;