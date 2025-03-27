import { SessionsController } from "@/controllers/sessions-controller";
import { Router } from "express";


export const sessionsRoutes = Router()
const controller = new SessionsController()


sessionsRoutes.post('/', controller.create)



