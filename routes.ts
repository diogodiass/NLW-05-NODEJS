import { Router } from "express";
import { MessagesControllers } from "./src/controllers/MessagesControllers";
import { SettingsControllers } from "./src/controllers/SettingsControllers";
import { UsersControllers } from "./src/controllers/UsersControllers";


const routes = Router();
const settingsControllers = new SettingsControllers();
const userscontrollers    = new UsersControllers();
const messagesControllers  = new MessagesControllers();

routes.post("/settings",settingsControllers.create);
routes.post("/users",   userscontrollers.create);
routes.post("/messages",messagesControllers.create);
routes.get("/messages/:id",messagesControllers.showByUser);

export{ routes };