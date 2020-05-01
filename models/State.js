const { Model } = require("objection");

class State extends Model { //DONE
    static get tableName() {
        return 'State';
    }
    static get relationMappings() {
        return {
            location: {
                relation: Model.HasManyRelation,
                modelClass: Location,
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            }

        }


    }
}

module.exports = State;