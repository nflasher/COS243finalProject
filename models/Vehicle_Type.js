const { Model } = require("objection");

class Vehicle_Type extends Model { //DONE
    static get tableName() {
        return 'Vehicle Type';
    }
    static get relationMappings() {
        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Vehicle Type.id',
                    to: 'Vehicle.vehicleTypeId'
                }
            }

        }


    }
}

module.exports = Vehicle_Type;