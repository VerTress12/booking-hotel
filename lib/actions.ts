"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, RoomSchema, ReserveSchema } from "@/lib/zod";
import { error, log } from "node:console";
import { redirect } from "next/navigation";
import { id } from "zod/locales";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

export const saveRoom = async (prevState: unknown, formData: FormData) => {
    const image = formData.get("image") as string;

    console.log("image:", image);
    console.log("rawData:", Object.fromEntries(formData.entries()));

    if (!image) return { message: "Image is Required" }

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    };


    console.log("amenities:", formData.getAll("amenities"));
    const validatedFields = RoomSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { name, description, capacity, amenities } = validatedFields.data;
    const price = Number(formData.get("price"));

    try {
        // 1. Buat room dulu
        const room = await prisma.room.create({
            data: {
                name,
                description,
                image,
                price: Number(price),
                capacity: Number(capacity),
            }
        });
        console.log("Room created:", room.id);

        // 2. Buat RoomAmenities terpisah
        const amenitiesList = formData.getAll("amenities") as string[]; // ✅ ambil langsung
        console.log("amenitiesList:", amenitiesList);

        const roomAmenities = await prisma.roomAmenities.createMany({
            data: amenitiesList.map((item) => ({
                roomId: room.id,
                amenitiesId: item
            }))
        });
        console.log("RoomAmenities created:", roomAmenities);

    } catch (error) {
        console.log("DB Error:", error);
        return { message: "Failed to save room" }
    }
    redirect("/admin/room");
}


export const ContactMassage = async (prevState: unknown, formData: FormData) => {
    const validateFields = contactSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateFields.success) {
        return { error: validateFields.error.flatten().fieldErrors }
    }
    const { name, email, subject, message } = validateFields.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });
        return { massage: "Terima kasih telah menghubungi kami. Pesan Anda telah diterima." }
    } catch (error) {
        console.log(error);
    }
};

//Delate room

export const deleteRoom = async (id: string, image: string) => {
    try {
        await del(image);
        await prisma.room.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/room");
}
// =================== UPDATE ROOM ===================
export const updateRoom = async (id: string, prevState: unknown, formData: FormData) => {
    const image = formData.get("image") as string;

    if (!image) return { message: "Image is Required" }

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    };

    const validatedFields = RoomSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, description, capacity } = validatedFields.data;
    const price = Number(formData.get("price"));
    const amenitiesList = formData.getAll("amenities") as string[];

    try {
        await prisma.room.update({
            where: { id },
            data: {
                name,
                description,
                image,
                price,
                capacity: Number(capacity),
            }
        });

        await prisma.roomAmenities.deleteMany({ where: { roomId: id } });

        await prisma.roomAmenities.createMany({
            data: amenitiesList.map((item) => ({
                roomId: id,
                amenitiesId: item
            }))
        });

        console.log("Room updated successfully");
    } catch (error) {
        console.log("DB Error:", error);
        return { message: "Failed to update room" }
    }

    revalidatePath("/admin/room");
    redirect("/admin/room");
}

export const createReserve = async (
    roomId: string,
    price: number,
    starDate: Date,
    endDate: Date,
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=room/${roomId}`)

    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone")
    }

    const validatedFields = ReserveSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    const { name, phone } = validatedFields.data
    const night = differenceInCalendarDays(endDate, starDate)

    if (night <= 0) return { messageDate: "Date must be at least 1 night" }
    const total = night * price;


    let reservationId;
    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                data: {
                    name,
                    phone
                },
                where:  {id: session.user.id}
            });
            const reservation = await tx.reservation.create({
                data:{
                    startDate: starDate,
                    endDate: endDate,
                    price: price,
                    roomId: roomId,
                    userId: session.user.id as string,
                    Payment:{
                        create:{
                            amount: total
                        }
                    }
                }
            })
            reservationId = reservation.id
        })
    } catch (error) {
        console.log(error)
    }
    redirect(`/checkout/${reservationId}`);
}