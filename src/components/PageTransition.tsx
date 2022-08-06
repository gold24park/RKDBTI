import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
const fadeBack = {
    name: "Fade Back",
    variants: {
      initial: {
        opacity: 1,
        scale: 0.92,
        width: "100%",
        height: "100%"
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      exit: {
        opacity: 0,
      }
    },
    transition: {
      duration: 0.3
    }
  };
const PageTransition = ({ children }: { children: ReactNode }): JSX.Element => (
  <AnimatePresence>
    <motion.div initial="initial" animate="animate" exit="exit" variants={fadeBack.variants}>
      {children}
    </motion.div>
  </AnimatePresence>
)

export default PageTransition