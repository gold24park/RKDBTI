import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Animations } from "@services/animations";

const PageTransition = ({ children }: { children: ReactNode }): JSX.Element => (
  <AnimatePresence>
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={Animations.pop.variants}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
