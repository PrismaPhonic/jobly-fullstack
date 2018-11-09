/** Convenience middleware to handle common auth cases in routes. */


const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");


/** Middleware to use when they must provide a valid token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function authRequired(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    console.log("tokenSt", tokenStr);
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    return next();
  }

  catch (err) {
    let unauthorized = new Error("You must authenticate first.");
    unauthorized.status = 401;  // 401 Unauthorized
    return next(unauthorized);
  }
}


/** Middleware to use when they must provide a valid token that is an admin token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function adminRequired(req, res, next) {
  try {
    const tokenStr = req.body._token;

    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;

    if (token.is_admin) {
      return next();
    }

    // throw an error, so we catch it in our catch, below
    throw new Error();
  }

  catch (err) {
    const unauthorized = new Error("You must be an admin to access.");
    unauthorized.status = 401;

    return next(unauthorized);
  }
}


/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

async function ensureCorrectUser(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;

    console.log('tokenstr:', tokenStr);

    let token = jwt.verify(tokenStr, SECRET);

    const job_id = req.params.id;

    req.username = token.username;
    // if job id in params, then check if the username
    // matches the user who submitted the application
    // if there's a match, move on, otherwise error
    if (job_id) {
      let res = await db.query(`
        SELECT username 
            FROM applications 
            WHERE job_id = $1
            and username=$2`,
        [job_id, token.username]);

      const username = res.rows[0];
      if (token.username === username) {
        return next();
      }

      throw new Error()
    }

    if (token.username === req.params.username) {
      return next();
    }

    // throw an error, so we catch it in our catch, below
    throw new Error();
  }

  catch (e) {
    const unauthorized = new Error("You are not authorized.");
    unauthorized.status = 401;

    return next(unauthorized);
  }
}


module.exports = {
  authRequired,
  adminRequired,
  ensureCorrectUser,
};
