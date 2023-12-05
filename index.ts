import fastify from "fastify";
import fastifySwagger from "fastify-swagger";

import { createUser } from "./src/routes/user/create";
import { createComment } from "./src/routes/comment/create";
import { createOrder } from "./src/routes/order/create";
import { createPost } from "./src/routes/post/create";
import { createProject } from "./src/routes/project/create";
import { createTask } from "./src/routes/task/create";

import { deleteUser } from "./src/routes/user/delete";
import { deleteComment } from "./src/routes/comment/delete";
import { deleteOrder } from "./src/routes/order/delete";
import { deletePost } from "./src/routes/post/delete";
import { deleteTask } from "./src/routes/task/delete";
import { deleteProject } from "./src/routes/project/delete";


import { getComment } from "./src/routes/comment/get";
import { getTask } from "./src/routes/task/get";
import { getProject } from "./src/routes/project/get";
import { getOrder } from "./src/routes/order/get";
import { getPost } from "./src/routes/post/get";
import { getUser } from "./src/routes/user/get";

import { updateUser } from "./src/routes/user/update";
import { updateOrder } from "./src/routes/order/update";
import { updateComment } from "./src/routes/comment/update";
import { updateTask } from "./src/routes/task/update";
import { updateProject } from "./src/routes/project/update";
import { updatePost } from "./src/routes/post/update";

const app = fastify();

// Configuração do Swagger
app.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' }
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: {type: 'string', format: 'email' }
          }
        }
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  })
  
  app.put('/some-route/:id', {
    schema: {
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          obj: {
            type: 'object',
            properties: {
              some: { type: 'string' }
            }
          }
        }
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            foo: { type: 'string' }
          }
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
    }
  }, (req, reply) => {})
app.swagger()

// Array de rotas
const routes = [
  createUser, createComment, createOrder, createPost, createTask, createProject,
  deleteUser, deleteComment, deleteOrder, deletePost, deleteTask, deleteProject,
  getUser, getComment, getOrder, getPost,getTask, getProject,
  updateUser, updateComment, updateOrder, updatePost, updateTask, updateProject
];

// Registro de rotas
routes.forEach((route) => app.register(route));

// Iniciar o servidor
app.listen({
  host: "0.0.0.0",
  port: 3000,
}).then(() => {
  console.log("Server listening on http://localhost:3000/");
});



app.listen({
    host: "0.0.0.0",
    port: 3000,
}).then(() => {
    console.log("http://localhost:3000/")
})