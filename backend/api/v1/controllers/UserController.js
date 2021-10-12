const UserService = require('../services/UserService');

class UserController {
    //  Controller for user to register
    async userRegister(req, res, next) {
        try {
            const response = UserService.userRegister(req.body.data);
            if (response == "REGISTER_SUCCESS") {
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