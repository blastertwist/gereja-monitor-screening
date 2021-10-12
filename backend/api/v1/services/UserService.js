const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class UserService {

    //  Service for user to register
    async userRegister(userData) {
        try {
            const { email, password, firstName, lastName, phoneNum } = userData;

            const hash = await bcrypt.hash(password, 10); // Hash the password
            await db.transaction(async (t) => {
                const newId = uuidv4();
                await t('users').insert({
                    id: newId,
                    email: email,
                    password: hash
                }).transacting(t);
                await t('user_profiles').insert({
                    user_id: newId,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNum,
                    address: address
                }).transacting(t)
                await t('user_roles').insert({
                    user_id: newId,
                    type_id: 1
                })
            });
            return "REGISTER_SUCCESS"
        } catch (err) {
            throw (err);
        }
    }

    //  Service for user login
    async userLogin(userData) {
        try {
            const user = await db('users').where({
                email: email
            }).select(['id', 'password']);

            if (user[0] == null) {
                return "USER_NOT_EXISTS";
            } else {
                const isSame = await bcrypt.compare(password, user[0].password)
                if (isSame) {
                    const token = await jwt.sign({
                        id: user[0].id
                    }, config.JWT_PRIVATE_KEY, { expiresIn: '30d' })
                    return token;
                } else {
                    return "PASSWORD_INCORRECT";
                }
            }
        } catch (err) {
            throw err;
        }
    }

    //  Service for get user data
    async getUserData(id) {
        try {
            const userData = await db.select(['user_profiles.user_id as id', 'user_profiles.first_name as firstName', 'user_profiles.last_name as lastName', 'level', 'description'])
                .from('user_profiles')
                .where({ 'user_profiles.user_id': id })
                .join('user_roles as user_role', 'user_profiles.user_id', 'user_role.user_id')
                .join('role_types', 'user_role.type_id', 'role_types.id');
            console.log(userData);
            if (userData[0] == null) {
                return "USER_NOT_EXISTS";
            } else {
                return userData[0];
            }
        } catch (err) {
            throw err;
        }
    }

    //  Service for user edit own data
    async editUserData(id, editedData) {
        try {
            const result = await db('user_profiles').where({ user_id: id }).update({ ...editedData });
            if (result == 1) {
                return "EDIT_SUCCESS"
            }
        } catch (err) {
            throw err;
        }
    }
};

module.exports = new UserService();