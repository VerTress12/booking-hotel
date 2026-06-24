import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { Room } from "@/app/generated/prisma/client";
import { formatCurrency } from "@/lib/utils";

const Card = ({room} : {room: Room}) => {
    return (
        <div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm">
            <div className="h-[260px] w-auto rounded-t-sm relative">
                <Image src={room.image} width={384} height={256} alt="room image" className="object-cover rounded-t-sm w-full h-full" />
            </div>
            <div className="p-8">
                <h4 className="text-2xl font-medium">
                    <Link href={`/room/${room.id}`} className="hover:text-gray-800 transition duration-150">
                        {room.name}</Link>
                </h4>
                <h4 className="text-2xl mb-7">
                    <span className="font-semibold text-gray-600">{formatCurrency(room.price)}</span>
                    <span className="text-gray-400 text-sm">/Night</span>
                </h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <IoPeopleOutline />
                        <span>
                           {room.capacity} {room.capacity === 1 ? "person" : "people"}
                        </span>
                    </div>
                    <Link href={`/room/${room.id}`} className="p-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-blue-500 
                    rounded-sm hover:bg-blue-600 transition duration-150">
                        Book Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Card