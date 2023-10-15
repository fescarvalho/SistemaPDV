const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token é Obrigatório' });
  }

  jwt.verify(token, process.env.PASSWORD_HASH, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
