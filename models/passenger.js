const { Model } = require("objection");

class Passenger extends Model { //DONE
    static get tableName() {
        return 'passenger';
    }
    static get relationMappings() {
        return {
           /* passengers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/passengers",
                join: {
                    from: 'passenger.id',
                    to: 'passengers.passengerId'  }
            }

        } */

           ride: {
               relation: Model.ManyToManyRelation,

               modelClass: __dirname + '/ride',
               join: {
                   from: 'passenger.id',
                   through: {
                       from: 'passengers.passengerId',
                       to: 'passengers.rideId'
                   },
                   to: 'ride.id'
               }
           }
        }
    }
}

module.exports = Passenger;