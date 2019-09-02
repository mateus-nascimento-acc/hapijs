'use strict';
import mongoose from 'mongoose';
import User from '../models/user';



const getUser = async (req, reply) => {
    try {
        const user = await User.findById(req.params.id);
        user.password = undefined;
        return user;
    }
    catch (error) {
        throw error;
    }

};

const updateUser = async (req, reply) => {

    const { params: { id: _id }, payload } = req;

    const user = await User.findByIdAndUpdate({ _id }, payload)

    return {
        ...user._doc,
        ...payload
    };
};

const deleteUser = async (req, reply) => {
    return await User.findByIdAndDelete(req.params.id);
}

const getAllUsers = async (req, reply) => {
    const users = await User.find();
    users.password = 'batata';
    return users;

};

module.exports = { getAllUsers, getUser, updateUser, deleteUser }