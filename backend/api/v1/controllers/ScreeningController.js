const ScreeningService = require('../services/ScreeningService');

class ScreeningController {
    async createScreeningFormat(req, res, next) {
        try {

        } catch (err) {
            res.status(500).send({
                'code': 'CREATE_SCREEN_FORMAT_ERROR_SVR',
                'msg': 'Failed to create screening format, internal server error.',
                'err': err
            })
        }
    }
    async editScreeningFormat(req, res, next) {
        try {

        } catch (err) {

        }
    }
    async deleteScreeningFormat(req, res, next) {
        try {

        } catch (err) {

        }
    }
    async newScreening(req, res, next) {
        try {

        } catch (err) {

        }
    }
    async fetchAllScreenData(req, res, next) {
        try {

        } catch (err) {

        }
    }
};

module.exports = new ScreeningController();