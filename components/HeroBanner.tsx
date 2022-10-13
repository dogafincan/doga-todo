import Image from "next/future/image";
import { m } from "framer-motion";
import LoginButton from "@components/LoginButton";
import Memoji from "@public/memoji.png";
import { memo } from "react";

const HeroBanner = memo(function HeroBanner({ isLocal }: { isLocal: boolean }) {
  return (
    <div className="flex h-auto flex-col rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 pt-8 shadow dark:shadow-none">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center space-y-4"
      >
        <h1 className="text-6xl font-bold tracking-tight text-white duration-200 ease-linear will-change-auto motion-reduce:transition-transform sm:mb-1 sm:text-[80px]">
          Doga Todo
        </h1>
        <h2 className="font-medium italic tracking-tight text-slate-50 ease-linear motion-reduce:transition-transform dark:text-slate-50">
          A fun way to get things done.
        </h2>
        <LoginButton isLocal={isLocal} />
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-end"
      >
        <Image
          priority
          src={Memoji}
          placeholder="blur"
          alt="Memoji of Doga Fincan"
          height={200}
          width={200}
        />
      </m.div>
    </div>
  );
});

export default HeroBanner;
