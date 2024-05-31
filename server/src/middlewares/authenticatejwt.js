const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
//console.log('jwt secret:',JWT_SECRET);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("authHeader:", authHeader)
  //console.log("token:", token)

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    //console.log('user:',user)
    next();
  });
};

module.exports = authenticateToken;
