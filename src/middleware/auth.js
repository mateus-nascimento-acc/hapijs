import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

const authMiddleware = () => (req, reply, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return reply.status(401).send('Token não informado');

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
        return reply.status(401).send('Token inválido');

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return reply.status(401).send('Token inválido');
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return reply.status(401).send('Token inválido');

        req.userId = decoded.id;
        return next();
    });
};

module.exports = { authMiddleware }