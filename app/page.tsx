import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    <div >
      <Hero/>
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3">Semoga pengalaman berlibur anda semakin nyaman dan menyenangkan selama di hotel kami</p>
        </div>
        <Main/>
      </div>
    </div>
  );
}
