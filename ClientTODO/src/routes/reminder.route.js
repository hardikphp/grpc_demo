import express from "express";
import { INTERNAL_LINKS } from "../enum";
import { reminderController } from "../controllers";

export default express
  .Router()
  .post(INTERNAL_LINKS.REMINDER.ADD_REMINDER, reminderController.addReminder);
