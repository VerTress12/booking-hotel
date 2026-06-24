"use client";

import { useActionState } from "react";
import { ContactMassage } from "@/lib/actions";
import clsx from "clsx";

const ContactForm = () => { 
        const [state, formAction, isPending] = useActionState(ContactMassage, null)
    return (
        <div className="bg-white p-8 rounded-sm shadow-sm">
            {state?.massage ? (
                <div className="p-4 text-sm text-gray-800 rounded-lg bg-green-50" role="alert">
                    <div className="font-medium">
                        {state.massage}
                    </div>
                  
                </div>
            ): null}
            <form action={formAction}>
                <div className="grid md:grid-cols-2 mt-6 gap-7">
                   <div className="">
                        <input type="text" name="name" className=" bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light" placeholder="Your Name*" />
                        <div aria-live="polite" aria-atomic="true" >
                            <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
                        </div>
                    </div>
                    <div className="">
                        <input type="email" name="email" className=" bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light" placeholder="asethimsi@gmail.com*" />
                        <div aria-live="polite" aria-atomic="true" >
                            <p className="text-sm text-red-500 mt-2">{state?.error?.email}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <input type="text" name="subject" className=" bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light" placeholder="Subject*" />
                        <div aria-live="polite" aria-atomic="true" >
                            <p className="text-sm text-red-500 mt-2">{state?.error?.subject}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <textarea name="message" rows={4} className=" bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light" placeholder="YourMessage*" >

                        </textarea>
                        <div aria-live="polite" aria-atomic="true" >
                            <p className="text-sm text-red-500 mt-2">{state?.error?.message}</p>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={clsx(
                        "px-10 py-4 text-center font-semibold text-white w-full bg-blue-400 rounded-sm hover:bg-blue-500 cursor-pointer",
                        { "opacity-50 cursor-progress animate-pulse": isPending }
                    )}
                    disabled={isPending}
                >
                    {isPending ? "loading..." : "Send Message"}
                </button>
            </form>
        </div>
  )
}

export default ContactForm