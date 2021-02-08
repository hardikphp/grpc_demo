import express from "express";
import { INTERNAL_LINKS } from "../enum";
import { userController } from "../controllers";

export default express
  .Router()
  .post(INTERNAL_LINKS.USER.ADD_USER, userController.addUser)
  .put(INTERNAL_LINKS.USER.UPDATE_USER, userController.updateUser)
  .get(INTERNAL_LINKS.USER.GET_USER, userController.getUser)
  .delete(INTERNAL_LINKS.USER.REMOVE_USER, userController.removeUser);
