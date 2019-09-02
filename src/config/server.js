import hapi from '@hapi/hapi';
import Inert from 'inert';
import HapiSwagger from 'hapi-swagger';
import Vision from 'vision';
import jwt from 'jsonwebtoken';

import db from './database';
import routes from '../routes/user.route';
import authConfig from '../config/auth';

const server = hapi.Server({
    port: 3001,
    host: 'localhost'
});

const init = async () => {
    await server.register([
        {
            plugin: Inert,
        },
        {
            plugin: Vision
        },
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'User API',
                    description: 'User API with NodeJS, Hapi and MongoDB',
                    version: '1.0.0'
                }
            }
        }
    ]);


    await server.start();
    console.log(`Server running on: ${server.info.uri}`);
};

server.route(routes);


init();

module.exports = init;