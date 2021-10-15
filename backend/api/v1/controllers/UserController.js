const UserService = require('../services/UserService');

class UserController {
    //  Controller for user to register
    async userRegister(req, res, next) {
        try {
            const result = await UserService.userRegister(req.body);
            if (result == "REGISTER_SUCCESS") {
                res.status(200).send({
                    'code': 'REGISTER_SUCCESS',
                    'msg': 'Successfully register a new user.'
                })
            }
        } catch (err) {
            res.status(500).send({
                'code': 'REGISTER_ERR_SRV',
                'msg': 'Failed to register due to server error, please contact server owner',
                'err': err
            })
        }
    }

    //  Controller for user login
    async userLogin(req, res, next) {
        try {
            const result = await UserService.userLogin(req.body);
            if (result == "USER_NOT_EXISTS") {
                res.status(401).send({
                    'code': 'LOGIN_FAILED_NOT_FOUND',
                    'msg': 'Failed to login, user not found',
                })
            } else if (result == "PASSWORD_INCORRECT") {
                res.status(401).send({
                    'code': 'LOGIN_FAILED_INCORRECT_PASS',
                    'msg': 'Failed to login, password is incorrect',
                })
            }
            else {
                res.status(200).send({
                    'code': 'LOGIN_SUCCESS',
                    'msg': 'Successfully login.',
                    'token': result
                })
            }
        } catch (err) {
            res.status(500).send({
                'code': 'LOGIN_ERR_SRV',
                'msg': 'Failed to login due to server error, please contact server owner',
                'err': err
            })
        }
    }

    //  Controller for get user data
    async getUserData(req, res, next) {
        try {
            const result = await UserService.getUserData(res.locals.id);

            if (result == "USER_NOT_EXISTS") {
                res.status(404).send({
                    'code': 'USER_NOT_FOUND',
                    'msg': 'Failed to fetch user data, user not found!'
                })
            } else {
                res.status(200).send({
                    'code': 'FETCH_USER_SUCCESS',
                    'msg': 'Sucessfuly to fetch user data, user data found!',
                    'data': result
                })
            }
        } catch (err) {
            res.status(500).send({
                'code': 'FETCH_USER_DATA_ERR_SRV',
                'msg': 'Failed to fetch user data due to server error, please contact server owner',
                'err': err
            })
        }
    }

    //  Controller for user edit own data
    async editUserData(req, res, next) {
        try {
            const result = await UserService.editUserData(res.locals.id, req.body)
            if (result == "EDIT_SUCCESS") {
                res.status(200).send({
                    'code': 'EDIT_PROFILE_SUCCESS',
                    'msg': 'Successfully edit user profile.'
                })
            }
        } catch (err) {
            res.status(500).send({
                'code': 'EDIT_PROFILE_ERR_SRV',
                'msg': 'Failed to edit profile due to server error, please contact server owner',
                'err': err
            })
        }
    }
}

module.exports = new UserController();