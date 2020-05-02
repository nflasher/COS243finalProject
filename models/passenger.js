const { Model } = require("objection");

class Passenger extends Model { //DONE
    static get tableName() {
        return 'passenger';
    }
    static get relationMappings() {
        return {
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/passengers",
                join: {
                    from: 'passenger.id',
                    to: 'passengers.passengerId'  }
            }

        }

    }
}

module.exports = Passenger;