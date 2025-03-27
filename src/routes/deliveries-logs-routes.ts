import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyAuthorization } from "@/middlewares/verifyAuthorization";
import { Router } from "express";


export const deliveriesLogsRoutes = Router()
const controller = new DeliveriesLogsController()


deliveriesLogsRoutes.post('/', ensureAuthenticated, verifyAuthorization(['sale'])  ,  controller.create)

deliveriesLogsRoutes.get('/:delivery_id/show', ensureAuthenticated , verifyAuthorization(['sale', 'customer']), controller.show)


