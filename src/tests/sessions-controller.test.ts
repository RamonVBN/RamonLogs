import request from 'supertest'
import {app} from '@/app'
import { prisma} from '@/database/prisma'



describe('Sessions Controller', () => {

    let user_id: string

     afterAll(async () =>{
            await prisma.user.delete({where: {id: user_id}})
        })

    it('Should authenticate and get access token', async () =>{

        const userResponse = await request(app).post('/users').send({
        name: 'Test User',
        email: 'testuser@email.com',
        password: 'password123'
        })

        user_id = userResponse.body.id

        const sessionResponse = await request(app).post('/sessions').send({
            email: 'testuser@email.com',
            password: 'password123'
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
        
    })


})