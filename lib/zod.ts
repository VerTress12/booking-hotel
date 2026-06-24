import {  object, string, coerce, array } from "zod";

export const RoomSchema = object ({
    name: string().min(1),
    description: string().min(50),
    capacity: coerce.number().gt(0),
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty(),
})

export const ReserveSchema = object ({
    name: string().min(1),
    phone: string().min(10),
})



export const contactSchema = object({
    name: string().min(6, "Name must be at least 6 characters"),
    email: string().min(6, "Email must be at least 6 characters").email("Invalid email address"),
    subject: string().min(6, "Subject must be at least 6 characters"),
    message: string().min(50, "Message must be at least 50 characters").max(200, "Message Maximum 200 characters"),
})