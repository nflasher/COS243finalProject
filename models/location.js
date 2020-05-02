const { Model } = require("objection");

class Location extends Model { //DONE
    static get tableName() {
        return 'location';
    }
    static get relationMapping(){
        return {
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/state",
                join: {
                    from: 'location.state',
                    to: 'state.abbreviation'}
            },

            toRide: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'location.id',
                    to: 'ride.toLocationId'}
            },

            fromRide: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/ride",
                join: {
                    from: 'location.id',
                    to: 'ride.fromLocationId'}
            },

        }
    }
}

module.exports = Location;
