const { Model } = require("objection");

class Vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings() {
        return {
          /*  authorization: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/authorization",
                join: {
                    from: 'vehicle.id',
                    to: 'authorization.vehicleId'
                }
            }, */
            driver: {
                relation: Model.ManyToManyRelation,

                modelClass: __dirname + '/driver',
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorization.vehicleId',
                        to: 'authorization.driverId'
                    },
                    to: 'driver.id'
                }
            },

            ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'}
            },

            vehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/vehicleType",
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: ' vehicleType.id'}
            },
        }
    }
}

module.exports = Vehicle;

