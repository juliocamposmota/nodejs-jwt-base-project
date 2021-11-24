const jwt = require('jsonwebtoken');
const model = require('../../models/user');

const secret = 'segredoDeToken';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ou não informado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await model.findUser(decoded.data.username);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
    }

    req.user = user;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
