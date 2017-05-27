/**
 * Created by shimon on 24/05/2017.
 */

/**
 * Если юзер не подключен или у него нет должной роли - выдаст ему ошибку и вернет false
 *
 * @param req
 * @param res
 * @param minRole {int} Минимальное значение роли
 * @param routeName {string} Куда он хотел зайти
 * @returns {boolean} Если true то можно делать next()
 */
function accessOnlyForRole(req, res, minRole, routeName) {
    routeName = routeName || '';
    if(!req.isAuthenticated()){
        res.status(401).json({errMessage:'Please, log in!'});
        console.log('Not logged user tried to access to %s, at %s',
            routeName, (new Date()).toString());
        return false;
    }

    if( !req.user || req.user.role < minRole ){
        res.status(401).json({errMessage:'You have no permissions for this action '});
        console.log('User with low role tried to access to %s, at %s',
            routeName, (new Date()).toString());
        return false;
    }

    if (req.user.role >= minRole){
        return true;
    }
}

module.exports.accessOnlyForRole = accessOnlyForRole;