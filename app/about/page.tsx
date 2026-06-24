import { Metadata } from "next";
import Headersection from "@/components/header-section";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
    title: "About ",
    description: "Who we are",
}

const Aboutpage = () => {
  return (
    <div>
        <Headersection title="About Us" subtitle="Learn more about our hotel and services" />
        <div className="max-w-7xl mx-auto py-20 px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <Image src="/loby.jpg" width={550} height={679} alt="about image" />
                <div >
                     <h1 className="text-5xl font-bold text-gray-900 mb-4">Who we Are</h1>
            <p className="text-gray-700 py-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, culpa autem ipsam ipsum qui id maxime velit alias quasi at! Animi quidem, error odio qui asperiores provident tenetur nulla non.</p>
            <ul className=" list-item space-y-6 pt-8">
                <li className="flex gap-5">
                    <div className="flex-none mt-1">
                        <IoEyeOutline className="size-7"/>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">Vission :</h4>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor distinctio repudiandae quaerat magnam porro itaque deserunt modi ea.</p>
                    </div>
                </li>
                <li className="flex gap-5">
                    <div className="flex-none mt-1">
                        <IoLocateOutline className="size-7"/>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor distinctio repudiandae quaerat magnam porro itaque deserunt modi ea.</p>
                    </div>
                </li>
            </ul>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default Aboutpage
