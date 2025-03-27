

export class AppError {

    constructor(message:string, statusCode:number = 400){

        this.message = message
        this.statusCode = statusCode
    }

    statusCode:number
    message: string
}