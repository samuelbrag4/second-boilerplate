import { Router } from "express";
import UsersRepository from "../models/users/UsersRepository.js";

const usuariosRoutes = Router();

const usersRepository = new UsersRepository();

usuariosRoutes.get("/", (req, res) => {
  const usuarios = usersRepository.getAllUsers();
  return res.status(200).json({
    message:
      usuarios.length == 0
        ? "Nenhum usuário cadastrado"
        : `Total de usuários: ${usuarios.length}`,
    usuarios,
  });
});

usuariosRoutes.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = usersRepository.addUser(name, email, password);
  return res.status(201).json({
    message: "Usuário cadastrado com sucesso!",
    user: newUser,
  });
});

usuariosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = usersRepository.getUserById(id);
  if (!user) {
    return res
      .status(404)
      .json({ message: `O usuário com o id ${id} não foi encontrado :(` });
  }
  return res.status(200).json({ message: `O Usuário com o id ${id} foi encontrado :)`, user });
});

usuariosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = usersRepository.updateUser(id, name, email, password);

  if (!user) {
    return res
      .status(404)
      .json({ message: `O usuário com o id ${id} não foi encontrado :(` });
  }

  return res.status(200).json({
    message: `O usuário com o id ${id} foi atualizado com sucesso!`,
    user: user,
  });
});

usuariosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = usersRepository.deleteUser(id);

  if (!user) {
    return res
      .status(404)
      .json({ message: `O usuário com o id ${id} não foi encontrado. Não será possível deletá-lo` });
  }

  return res.status(200).json({
    message: `O usuário com o id ${id} foi deletado com sucesso!`,
    user: user,
  })
});

export default usuariosRoutes;
