import { motion } from "framer-motion"
import { Heart, MoonStar, Sun } from "lucide-react"
import { CASAL } from "@/data"
import { Botao } from "@/components/ui"

export function Abertura({
  onComecar,
  tema,
  onAlternarTema,
}: {
  onComecar: () => void
  tema: "claro" | "escuro"
  onAlternarTema: () => void
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Alternador de tema */}
      <button
        type="button"
        onClick={onAlternarTema}
        aria-label={
          tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"
        }
        className="absolute right-5 top-5 rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {tema === "escuro" ? (
          <Sun className="size-4" />
        ) : (
          <MoonStar className="size-4" />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-lg flex-col items-center gap-7"
      >
        {/* Coração pulsando de leve */}
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Heart className="size-7 fill-current" aria-hidden="true" />
        </motion.span>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Para {CASAL.nomeDela}
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] text-balance sm:text-6xl">
            Nosso Lugar
          </h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {CASAL.fraseAbertura}
          </p>
        </div>

        <Botao onClick={onComecar} tamanho="lg">
          Começar
        </Botao>

        <p className="text-xs text-muted-foreground">
          Feito com calma, do começo ao fim.
        </p>
      </motion.div>
    </div>
  )
}
