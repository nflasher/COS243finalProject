const { Model } = require("objection");

class Authorization extends Model {   //DONE
    static get tableName() {
        return 'authorization';
    }
    static get relationMappings() {
        return {
            driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/driver",
                join: {
                    from: 'authorization.driverId',
                    to: 'driver.id'  }

            },

            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/vehicle",
                join: {
                    from: 'authorization.vehicleId',
                    to: 'vehicle.id'  }
            }

        }

    }
}

module.exports = Authorization;