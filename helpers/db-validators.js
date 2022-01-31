const Category = require('../models/Category');
const Role = require('../models/Role');
const User = require('../models/user');

const email = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const role = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no es un rol valido`);
    }
}

const categoryId = async (id = '') => {
    const existsCategoryId = await Category.findById(id);
    if (!existsCategoryId) {
        throw new Error(`El ID ${id} no existe`);
    }
}

module.exports = {
    email,
    role,
    categoryId
}