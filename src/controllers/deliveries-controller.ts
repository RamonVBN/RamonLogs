import { Request, Response, NextFunction } from "express";
import {prisma} from '@/database/prisma'
import {z} from 'zod'

export class DeliveriesController {
    
    async index(request:Request, response:Response, next:NextFunction){
        
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: {name: true, email: true}}
            }
        })

        return response.status(200).json(deliveries)
    }

    async create(request:Request, response:Response, next:NextFunction){

        const bodySchema = z.object({
            user_id: z.string().uuid().trim().min(1),
            description: z.string().trim().min(1),

        })

        const {user_id, description} = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description

            }
        })

        return response.status(201).json()
    }

    async update(request:Request, response:Response, next:NextFunction){

        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"]),
        })

        const { id } = paramsSchema.parse(request.params)

        const { status } = bodySchema.parse(request.body)

        await prisma.delivery.update({data: {status}, where: {id}})

        await prisma.deliveryLog.create({data: {deliveryId: id, description: `The order was ${status}` }})

        return response.status(200).json()

    }
    
}