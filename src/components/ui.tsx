import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ---------- Botão ---------- */
type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "solido" | "contorno" | "fantasma"
  tamanho?: "md" | "lg"
}

export function Botao({
  variante = "solido",
  tamanho = "md",
  className,
  ...props
}: BotaoProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        tamanho === "md" && "px-5 py-2.5 text-sm",
        tamanho === "lg" && "px-7 py-3.5 text-base",
        variante === "solido" &&
          "bg-primary text-primary-foreground hover:opacity-90",
        variante === "contorno" &&
          "border border-border bg-transparent text-foreground hover:bg-muted",
        variante === "fantasma" && "text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

/* ---------- Card ---------- */
export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card text-card-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ---------- Cabeçalho de seção ---------- */
export function CabecalhoSecao({
  sobretitulo,
  titulo,
  descricao,
}: {
  sobretitulo: string
  titulo: string
  descricao?: string
}) {
  return (
    <header className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {sobretitulo}
      </span>
      <h1 className="font-serif text-3xl leading-tight text-balance sm:text-4xl">
        {titulo}
      </h1>
      {descricao ? (
        <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
          {descricao}
        </p>
      ) : null}
    </header>
  )
}

/* ---------- Invólucro animado de seção ---------- */
export function SecaoAnimada({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8"
    >
      {children}
    </motion.div>
  )
}
