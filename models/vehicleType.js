const { Model } = require("objection");

class VehicleType extends Model { //DONE
    static get tableName() {
        return 'vehicleType';
    }
    static get relationMappings() {
        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/vehicle",
                join: {
                    from: 'vehicleType.id',
                    to: 'vehicle.vehicleTypeId'
                }
            }

        }


    }
}

module.exports = VehicleType;