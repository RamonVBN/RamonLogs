import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyAuthorization } from "@/middlewares/verifyAuthorization";
import { Router } from "express";


export const deliveriesRoutes = Router()
const controller = new DeliveriesController()

deliveriesRoutes.use(ensureAuthenticated)
deliveriesRoutes.use(verifyAuthorization(['sale']))

deliveriesRoutes.post('/', controller.create)

deliveriesRoutes.get('/', controller.index)

deliveriesRoutes.patch('/:id', controller.update)