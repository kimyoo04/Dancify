import * as React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function SideBarToggle({ toggle }: { toggle: () => void }) {
  return (
    <motion.button
      onClick={toggle}
      className="col-center mr-4 h-10 w-10 rounded-md transition-colors hover:bg-muted"
      whileTap={{ scale: 0.9 }}
    >
      <Menu />
    </motion.button>
  );
}
