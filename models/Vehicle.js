const { Model } = require("objection");

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
    static get relationMappings() {
        return {
            authorization: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/Authorization",
                join: {
                    from: 'Vehicle.id',
                    to: 'Authorization.vehicleId'
                }
            },
            ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/Ride",
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicleId'}
            },

            vehicle_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/Vehicle_Type",
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: ' Vehicle Type.id'}
            },
        }
    }
}

module.exports = Vehicle;

