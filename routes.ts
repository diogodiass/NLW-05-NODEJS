import { Router } from "express";
import { SettingsControllers } from "./src/controllers/SettingsControllers";


const routes = Router();
const settingsControllers = new SettingsControllers();

routes.post("/settings",settingsControllers.create);

export{ routes };