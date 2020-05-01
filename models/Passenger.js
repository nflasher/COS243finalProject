const { Model } = require("objection");

class Passenger extends Model { //DONE
    static get tableName() {
        return 'Passenger';
    }
    static get relationMappings() {
        return {
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: Passengers,
                join: {
                    from: 'Passenger.id',
                    to: 'Passengers.passengerId'  }
            }

        }

    }
}

module.exports = Passenger;