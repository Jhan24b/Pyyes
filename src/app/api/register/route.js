import { User } from "./../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();

    // Conecta a la base de datos antes de realizar operaciones
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a MongoDB");
    const pass = body.password;
    if (!pass?.length || pass?.length < 5) {
      new Error("password must be at least 5 characters");
      return false;
    }

    const nonHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(nonHashedPassword, salt);

    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    console.error("Error en la operación:", error.message);
    return Response.json({ error: "Error en la operación" });
  } finally {
    // Cierra la conexión después de realizar operaciones
    await mongoose.disconnect();
    console.log("Conexión cerrada");
  }
}
