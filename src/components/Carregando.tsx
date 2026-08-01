import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { CASAL } from "@/data"

const PAUSA_FINAL_MS = 700

export function Carregando({ onTerminar }: { onTerminar: () => void }) {
  const [textoVisivel, setTextoVisivel] = useState("")
  const frase = CASAL?.fraseAbertura || "Preparando um cantinho só nosso..."

  useEffect(() => {
    let posicao = 0

    const digitar = setInterval(() => {
      posicao += 1
      setTextoVisivel(frase.slice(0, posicao))

      if (posicao >= frase.length) {
        clearInterval(digitar)
        setTimeout(() => {
          onTerminar()
        }, PAUSA_FINAL_MS)
      }
    }, 38)

    return () => clearInterval(digitar)
  }, [frase, onTerminar])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Heart className="size-7 fill-current" aria-hidden="true" />
      </motion.span>

      <p className="min-h-14 max-w-xs font-serif text-lg italic leading-relaxed text-pretty text-muted-foreground">
        {textoVisivel}
        <span aria-hidden="true" className="animate-pulse">
          |
        </span>
      </p>
    </div>
  )
}