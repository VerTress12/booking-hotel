import Image from "next/image"
import { getReservationByUserId } from "@/lib/data"
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link"; 

const MyReserveList = async () => {
    const reservation = await getReservationByUserId();
    if (!reservation) return notFound();

    return (
        <div className="space-y-4">
            {reservation.map((item) => (
                <div className="bg-white shadow rounded-sm overflow-hidden" key={item.id}>
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                        <h1 className="text-sm font-medium text-gray-900 truncate">
                            Reservation ID: #{item.id}
                        </h1>
                        <div className="flex gap-1 text-sm">
                            <span>Status:</span>
                            <span className="font-bold uppercase">{item.Payment?.status ?? "unpaid"}</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-48 h-36 shrink-0">
                            <Image
                                src={item.Room.image}
                                fill
                                sizes="200px"
                                className="object-cover"
                                alt="room image"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-between p-4 w-full">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Price</span>
                                    <span className="font-medium">{formatCurrency(item.price)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Arrival</span>
                                    <span className="font-medium">{formatDate(item.startDate.toDateString())}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Departure</span>
                                    <span className="font-medium">{formatDate(item.endDate.toDateString())}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Duration</span>
                                    <span className="font-medium">
                                        {differenceInCalendarDays(item.endDate, item.startDate)} Night
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Sub total</span>
                                    <span className="font-medium">
                                        {item.Payment ? formatCurrency(item.Payment.amount) : "-"}
                                    </span>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="flex justify-end mt-3">
                                {item.Payment?.status === "unpaid" ? (
                                    <Link href={`/checkout/${item.id}`}
                                        className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600">
                                        Pay Now
                                    </Link>
                                ) : (
                                    <Link href={`/myreservation/${item.id}`}
                                        className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600">
                                        View Detail
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyReserveList