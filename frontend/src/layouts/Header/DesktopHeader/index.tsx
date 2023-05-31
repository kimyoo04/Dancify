import Logo from "@components/Logo";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DesktopHeader() {
  return (
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="row-center gap-5">
        <Logo />
        <NavLinks />
      </div>

      <motion.div
        whileTap={{ scale: 0.9, transition: { duration: 0.05 } }}
        whileHover={{ scale: 1.1, transition: { duration: 0.05 } }}
      >
        <Link
          href={"/signin"}
          className="col-center rounded-full bg-main_color px-4 py-1 text-font_white"
        >
          <button>로그인</button>
        </Link>
      </motion.div>
    </div>
  );
}
