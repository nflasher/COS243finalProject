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

            /*drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/drivers",
                join: {
                    from: 'driver.id',
                    to: 'drivers.driverId'}
            } */

            ride: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'drivers.driverId',
                        to: 'drivers.rideId',
                    },
                    to: 'ride.id'
                }
            }
        }

    }

}

module.exports = Driver;
