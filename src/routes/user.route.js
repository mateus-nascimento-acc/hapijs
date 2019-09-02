import Joi from '@hapi/joi';

import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller';

const main = {
    path: '/api/v1/',
    method: 'GET',
    config: {
        description: 'Main Route',
        tags: ['api', 'users', 'hapiJs']
    },
    handler: async (req, reply) => {

        return await 'Hello World';

    }
};
const getAllUsers = {
    path: '/api/v1/users',
    method: 'GET',
    config: {
        description: 'Getting all users',
        tags: ['api', 'users', 'hapiJs']

    },

    handler: userController.getAllUsers
};
const getUser = {
    path: '/api/v1/users/{id}',
    method: 'GET',
    config: {
        description: 'Getting user by _id',
        tags: ['api', 'single user'],
        validate: {
            params: {
                id: Joi.required().description('Id of each user')
            }
        }
    },
    handler: userController.getUser,
};
const updateUser = {
    path: '/api/v1/users/{id}',
    method: 'PUT',
    config: {
        description: 'Updating a existing user by _id',
        tags: ['api', 'single user'],
        validate: {
            params: {
                id: Joi.required().example('5d6809492494261878703c3f')
            }
        }
    },

    handler: userController.updateUser
};
const deleteUser = {
    path: '/api/v1/users/{id}',
    method: 'DELETE',
    config: {
        description: 'Deleting user by _id',
        tags: ['api', 'single user'],
        validate: {
            params: {
                id: Joi.required()
            }
        }
    },
    handler: userController.deleteUser
};
const createUser = {
    path: '/api/v1/users',
    method: 'POST',
    config: {
        description: 'Create a new user',
        tags: ['api', 'single user'],
        validate: {
            payload: {
                name: Joi.string().required().label('Username'),
                email: Joi.string().required(),
                password: Joi.string().required()
            }
        },
        handler: authController.createUser
    }
};
const authenticateUser = {
    path: '/api/v1/auth',
    method: 'POST',
    config: {
        description: 'Authenticating user',
        tags: ['api', 'single user'],
        validate: {
            payload: {
                email: Joi.string().required(),
                password: Joi.string().required()
            }
        },
        handler: authController.authenticateUser
    }
};

module.exports = [main, createUser, getAllUsers, getUser, updateUser, deleteUser, authenticateUser]