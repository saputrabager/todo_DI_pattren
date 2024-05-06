const models = require('../../database/models');
const User = models.user

class UserRepository {
    async findOrCreate (data) {
        return await User.findOrCreate(data)
    }

    async update (data, where) {
        return await User.update(data, {where})
    }

    async findOne (where, login = false) {
        if (login) {
            return await User.findOne({where})
        } else {
            return await User.findOne({where, attributes: ['user_id', 'name', , 'email']})
        }
    }
}

module.exports = UserRepository