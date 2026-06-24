import { Metadata } from "next"
import { Suspense } from "react"
import RoomDetail from "@/components/room-detail"


export const metadata: Metadata = {
    title: "Room Detail"
}

const RoomDetailPage = async ({
    params
}:{
    params: Promise<{roomId: string}>
}) => {
    const roomId = (await params).roomId;

    return (
        <div className="">
            <Suspense fallback >
                <RoomDetail roomId={roomId} />
            </Suspense>

        </div>
    )
}

export default RoomDetailPage