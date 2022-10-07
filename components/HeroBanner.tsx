import Image from "next/future/image";
import { motion } from "framer-motion";
import LoginButton from "@components/LoginButton";
import Memoji from "@public/memoji.png";

const HeroBanner = () => (
  <div className="flex h-auto flex-col rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 px-8 pt-8 shadow dark:shadow-none">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center space-y-4"
    >
      <h1 className="mb-3 font-['Pacifico'] text-5xl text-white duration-200 ease-linear will-change-auto motion-reduce:transition-transform sm:mb-6 sm:text-7xl">
        Doga Todo
      </h1>
      <h2 className="text-slate-50 ease-linear motion-reduce:transition-transform dark:text-slate-50">
        A fun way to get things done.
      </h2>
      <div>
        <LoginButton />
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-end"
    >
      <Image
        priority
        src={Memoji}
        alt="Memoji of Doga Fincan"
        className="w-[200px]"
      />
    </motion.div>
  </div>
);

export default HeroBanner;
