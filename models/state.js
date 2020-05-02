const { Model } = require("objection");

class State extends Model { //DONE
    static get tableName() {
        return 'state';
    }
    static get relationMappings() {
        return {
            location: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/location",
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            }

        }


    }
}

module.exports = State;