const { Model } = require("objection");

class Ride extends Model { //DONE
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {/*
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/drivers",
                join: {
                    from: 'ride.id',
                    to: 'drivers.rideId'
                }
            }, */

            driver: {
                relation: Model.ManyToManyRelation,

                modelClass: __dirname + "/driver",
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideId',
                        to: 'drivers.driverId',
                    },
                    to: 'driver.id'
                }
            },

          passenger: {
            relation: Model.ManyToManyRelation,

            modelClass: __dirname + '/passenger',
              join: {
                from: 'ride.id',
                through: {
                    from: 'passengers.rideId',
                    to: 'passengers.passengerId'
                  },
                  to: 'passenger.id'
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