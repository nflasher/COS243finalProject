const { Model } = require("objection");

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
    static get relationMappings() {
        return {
            authorization: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'Vehicle.id',
                    to: 'Authorization.vehicleId'
                }
            },
            ride: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicleId'}
            },

            vehicle_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle_Type,
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: ' Vehicle Type.id'}
            },
        }
    }
}

module.exports = Vehicle;

