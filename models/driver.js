const { Model } = require("objection");

class Driver extends Model {  //DONE
    static get tableName() {
        return 'driver';
    }
    static get relationMappings(){
        return {
            authorization: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/authorization",
                join: {
                    from: 'driver.id',
                    to: 'authorization.driverId' }
            },

            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/drivers",
                join: {
                    from: 'driver.id',
                    to: 'drivers.driverId'}
            }
        }

    }

}

module.exports = Driver;
