const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é Obrigatório' });
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.PASSWORD_HASH, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
