const { Model } = require("objection");

class Driver extends Model {  //DONE
    static get tableName() {
        return 'Driver';
    }
    static get relationMappings(){
        return {
            authorization: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'Driver.id',
                    to: 'Authorization.driverId' }
            },

            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'Driver.id',
                    to: 'Drivers.driverId'}
            }
        }

    }

}

module.exports = Driver;
