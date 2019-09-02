import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/user';

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800,
    })
}

const createUser = async (req, reply) => {
    const { email } = req.payload;
    try {
        if (await User.findOne({ email }))
            return reply.status(400).send({ error: 'E-mail já cadastrado' })

        const user = new User(req.payload)

        await user.save();

        user.password = undefined;

        return ({ user, token: generateToken({ id: user.id }) })
    }
    catch (error) {
        return (error, 'Falha na criação do usuário');
    }
}

const authenticateUser = async (req, reply) => {
    console.log('Chamei autenticação');
    const { email, password } = req.payload;
    console.log(req.payload);

    const user = await User.findOne({ email }).select('+password');
    console.log('Usuário: ', user);
    if (!user)
        return ('Usuário e/ou senha inválidos 1!');

    if (!await bcrypt.compare(password, user.password))
        return ('Usuário e/ou senha inválidos 2!')

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 1800,
    });

    return ({
        user,
        token: generateToken({ id: user.id })
    });

}

module.exports = { createUser, authenticateUser }