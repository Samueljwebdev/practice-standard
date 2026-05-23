"use client"
import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function AnimateIn({ children, className, delay = 0, direction = "up" }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 28 : 0,
        x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
