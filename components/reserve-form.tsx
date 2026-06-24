"use client";
import { useState, useActionState } from "react";
import { addDays, endOfToday } from "date-fns";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createReserve } from "@/lib/actions";
import { RoomDetailProps } from "@/types/room";
import clsx from "clsx";

const ReserveForm = ({room}: {room:RoomDetailProps}) => {
    const StarDate = new Date();
    const EndDate = addDays(StarDate,1);

    const [starDate, setStarDate] = useState(StarDate);
    const [endDate, setEndDate] = useState(EndDate);

    const handleDateChange = (dates: any) => {
        const [start, end] = dates;
        setStarDate(start)
        setEndDate(end);
    }

    const [state,formAction, isPanding] = useActionState(createReserve.bind(null,room.id, room.price,
        starDate, endDate ), null)



  return (
    <div className="">
        <form action={formAction}>
            <div className="mb-4">
                <label className="block mb2 text-sm font-medium text-shadow-gray-900 ">
                Arrival - Departure</label>
                <DatePicker 
                    selected={starDate}
                    startDate={starDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange={true}
                    onChange={handleDateChange}
                    dateFormat={"dd-MM-yyy"}
                    wrapperClassName="w-full"
                    className="py-2 px-4 rounded-md border border-gray-300 w-full"
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb2 text-sm font-medium text-shadow-gray-900 ">Your name</label>
                <input type="text" name="name"  placeholder="Full Name.."
                className="py-2 px-4 rounded-md border border-gray-300 w-full" />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb2 text-sm font-medium text-shadow-gray-900 ">Phone Number</label>
                <input type="text" name="phone"  placeholder="Phone Number.."
                className="py-2 px-4 rounded-md border border-gray-300 w-full" />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
                </div>
            </div>
            <button type="submit" className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-blue-400 rounded-sm cursor-pointer hover:bg-blue-500", {
                "opacity-50 cursor-progress" : isPanding
            })} disabled={isPanding} >{isPanding ? "Loading.." : "Reserve"}</button>
        </form>
    </div>
  )
}

export default ReserveForm