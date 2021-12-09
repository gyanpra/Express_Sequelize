const expressJwt = require('express-jwt');

function jwt() {
    const secret = 'secret';
    return expressJwt({ secret, algorithms: ['HS256']}).unless({
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/register',
            '/reset/sendmail',
            '/reset/verify',
        ]
    });
}

module.exports = jwt;











            // // { url: /\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/products(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE'] },
            // { url: /\/order(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE'] },
