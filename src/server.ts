import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "OK";
});

app.register(getRoomsRoute);

app.listen({ port: env.PORT });
// app.listen({ port: env.PORT }).then(() => {
//   // biome-ignore lint/suspicious/noConsole: only used in dev
//   console.log(`Port: ${process.env.PORT}`);
//   // biome-ignore lint/suspicious/noConsole: only used in dev
//   console.log("Server running on http://localhost:3333");
// });
