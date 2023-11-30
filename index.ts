import fastify from "fastify";

import { createUser } from "./src/routes/user/create";
import { getUser } from "./src/routes/user/get";
import { updateUser } from "./src/routes/user/update";
import { deleteUser } from "./src/routes/user/delete";
const app = fastify()

app.register(createUser)
app.register(getUser)
app.register(updateUser)
app.register(deleteUser)


app.listen({
    host: "0.0.0.0",
    port: 3000,
}).then(() => {
    console.log("teste!")
})