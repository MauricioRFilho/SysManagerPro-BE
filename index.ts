import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";

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

app.register(fastifySwagger);

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