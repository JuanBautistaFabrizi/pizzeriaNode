const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const verifyJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: 'No se encontro ningun token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no encontrado en base de datos'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'Token no valido'
            });
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    verifyJWT
}