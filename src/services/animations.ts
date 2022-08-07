export const Animations = {
  pop: {
    variants: {
      initial: {
        opacity: 1,
        scale: 0.92,
        width: "100%",
        height: "100%",
      },
      animate: {
        opacity: 1,
        scale: 1,
      },
      exit: {
        opacity: 0,
      },
    },
    transition: {
      duration: 0.3,
    },
  },
  list: {
    variants: {
      hidden: {
        opacity: 0,
        transition: {
          when: "afterChildren",
        },
      },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.08,
        },
      },
    },
  },
  listItem: {
    variants: {
      hidden: {
        opacity: 0,
        y: "55%",
      },
      visible: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: "15%",
      },
    },
  },
  slide: {
    variants: {
      initial: {
        opacity: 0,
        x: "100%",
      },
      animate: {
        opacity: 1,
        x: 0,
      },
      exit: {
        opacity: 0,
        x: "-100%",
      },
    },
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
  fade: {
    variants: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
    },
    transition: {
      ease: "easeOut",
      duration: 1.2,
      delay: 0.6
    },
  },
};
