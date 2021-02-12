import express from "express";
import { INTERNAL_LINKS } from "../enum";
import { todoController } from "../controllers";

export default express
  .Router()
  .post(INTERNAL_LINKS.TODO.ADD_TODO, todoController.addTodo)
  .put(INTERNAL_LINKS.TODO.UPDATE_TODO, todoController.updateTodo)
  .get(INTERNAL_LINKS.TODO.GET_TODO, todoController.getTodo);
