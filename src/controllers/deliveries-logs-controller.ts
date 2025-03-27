import { Request, Response, NextFunction } from "express";
import {z} from 'zod'
import {prisma} from '@/database/prisma'
import { AppError } from "@/utils/AppError";


export class DeliveriesLogsController {

    async create(request:Request, response:Response, next:NextFunction){

        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const {delivery_id, description} = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({where: {id: delivery_id}})

        if (!delivery) {
            
            throw new AppError('Delivery not found', 404)
        }

        if (delivery.status === 'processing') {
            
            throw new AppError('change status to shipped', 400)
        }

        if (delivery.status === 'delivered') {

            throw new AppError('This order has already been delivered.', 401)
        }

        await prisma.deliveryLog.create({data: {deliveryId: delivery_id, description }})

        return response.status(201).json()
    }

    async show(request:Request, response:Response, next:NextFunction){

        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
      })

      const {delivery_id} = paramsSchema.parse(request.params)
      
      
      const delivery = await prisma.delivery.findUnique(
        {
        include: {
            logs: {select: {description: true}}
        },
        where: {id: delivery_id}
        })
      
      if (request.user?.role === 'customer' && delivery?.userId !== request.user.id) {
        throw new AppError('You can only get your own deliveries!')
      }

      return response.status(200).json(delivery)
    }

}