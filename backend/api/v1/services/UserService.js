const dotenv = require('dotenv')
dotenv.config();
const db = require('../db/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class UserService {

    //  Service for user to register
    async userRegister(userData) {
        try {
            const { email, password, fName, lName, phoneNum, address, birthday } = userData;

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
                    first_name: fName,
                    last_name: lName,
                    phone_number: phoneNum,
                    address: address,
                    birth_date: new Date(birthday)
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

            const { email, password } = userData;

            const user = await db('users').where({
                email: email
            }).select(['id', 'password']);

            if (user[0] == null) {
                return "USER_NOT_EXISTS";
            } else {
                const isSame = await bcrypt.compare(password, user[0].password)
                if (isSame) {
                    const token = jwt.sign({
                        id: user[0].id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
                    return token;
                } else {
                    return "PASSWORD_INCORRECT";
                }
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    //  Service for get user data
    async getUserData(id) {
        try {
            const userData = await db.select(['user_profiles.user_id as id', 'user_profiles.first_name as fName', 'user_profiles.last_name as lName', 'user_profiles.address as address', 'user_profiles.phone_number as phoneNum', 'level', 'name as role'])
                .from('user_profiles')
                .where({ 'user_profiles.user_id': id })
                .join('user_roles as user_role', 'user_profiles.user_id', 'user_role.user_id')
                .join('role_types', 'user_role.type_id', 'role_types.id');
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