"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/app/lib/cn";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

const visible = { opacity: 1, x: 0, y: 0 };

/**
 * Revela o conteúdo ao entrar na viewport: fade + deslize.
 *
 * Movimento reduzido: o elemento é SEMPRE o mesmo motion.div, com o mesmo
 * `initial` no servidor e no navegador. Quem prefere menos movimento recebe
 * `animate` com duração zero (aparece na hora). Trocar por um <div> simples
 * nesse caso quebrava a hidratação: o HTML do servidor vinha com opacity:0,
 * o React não corrige atributo na hidratação e a seção ficava invisível.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div className={cn(className)} initial={{ opacity: 0, ...offset[direction] }} animate={visible} transition={{ duration: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={visible}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
