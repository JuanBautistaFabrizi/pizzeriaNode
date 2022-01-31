const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'No se puede verificar el role sin antes validar el token'
        });
    }

    const { role, name } = req.user;
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no tiene permiso de Administrador`
        });
    }
    next();
} 

module.exports = {
    isAdmin
}