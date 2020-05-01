const { Model } = require("objection");

class Location extends Model { //DONE
    static get tableName() {
        return 'Location';
    }
    static get relationMapping(){
        return {
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'}
            },

            toRide: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationId'}
            },

            fromRide: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationId'}
            },

        }
    }
}

module.exports = Location;
