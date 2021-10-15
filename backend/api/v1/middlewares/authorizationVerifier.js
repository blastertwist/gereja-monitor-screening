const db = require('../db/db');


const authorize = async (req, res, next) => {
    try {
        const result = await db.from('routes_authorizations').where({ path: req.baseUrl + req.path })
        const user = await db.from('user_roles').where({ user_id: res.locals.id });
        const authorized_ids = JSON.parse(result[0].authorized_ids)
        const authorized = authorized_ids.includes(user[0].type_id)

        if (authorized) {
            next()
        } else {
            res.status(401).send({
                'code': 'UNAUTHORIZED_ENDPOINT',
                'msg': 'You are not allowed to access this endpoint.'
            })
        }
    } catch (err) {
        throw err;
    }
}

module.exports = authorize;