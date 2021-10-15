const db = require('../db/db');
const listEndpoints = require('express-list-endpoints')
const { uuid } = require('uuidv4');

const initializeRouteAuth = async (app) => {
    verifyNonRouteAuths(app)
    verifyRouteAuths(app)
}

const generateRoutesAuth = async (path) => {
    await db('routes_authorizations').insert({
        id: uuid(),
        path: path,
        authorized_ids: JSON.stringify([1])
    })
}

const verifyNonRouteAuths = async (app) => {
    const paths = getAllRouters(app).map(route => route.path);
    const result = await db('routes_authorizations')
    const toBeAdd = paths.filter(path => {
        return !result.some(endpoint => endpoint.path == path)
    })
    toBeAdd.map(path => generateRoutesAuth(path))
}

const verifyRouteAuths = async (app) => {
    const paths = getAllRouters(app).map(route => route.path);
    const result = await db('routes_authorizations');
    const toBeDelete = result.filter(route => {
        return !paths.some(path => path == route.path)
    })
    toBeDelete.map(route => deleteRouteAuth(route.id))
}

const deleteRouteAuth = async (id) => {
    await db('routes_authorizations').where({ id: id }).del();
}

const getAllRouters = (app) => {
    return listEndpoints(app)
}

module.exports = {
    initializeRouteAuth
}