import { memo } from "react";
import Image from "next/future/image";
import { m } from "framer-motion";
import LoginButton from "@components/LoginButton";
import Memoji from "@public/memoji.png";

const HeroBanner = memo(function HeroBanner({
  initialVisit,
}: {
  initialVisit: boolean;
}) {
  return (
    <section className="flex h-auto shrink-0 flex-col overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 pt-8 shadow dark:shadow-none">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-slate-50 duration-200 ease-linear motion-reduce:transition-opacity sm:mb-1 sm:text-[80px]">
          Doga Todo
        </h1>
        <h2 className="font-medium italic tracking-tight text-slate-50 duration-200 ease-linear motion-reduce:transition-opacity">
          A fun way to get things done.
        </h2>
        <LoginButton initialVisit={initialVisit} />
      </div>
      <m.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-end"
      >
        <Image
          src={Memoji}
          placeholder="blur"
          alt="Memoji of Doga Fincan"
          height={200}
          width={200}
        />
      </m.div>
    </section>
  );
});

export default HeroBanner;
