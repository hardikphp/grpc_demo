import express from "express";
import { INTERNAL_LINKS } from "../enum";
import { regionController } from "../controllers";

export default express
  .Router()
  .post(INTERNAL_LINKS.REGION.ADD_REGION, regionController.addRegion)
  .get(INTERNAL_LINKS.REGION.GET_REGION, regionController.getRegion);
