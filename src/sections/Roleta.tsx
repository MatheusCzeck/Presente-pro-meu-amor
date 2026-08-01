import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Coffee,
  Dices,
  Gamepad2,
  Mountain,
  Music,
  Palette,
  Route,
  Sparkles,
  Utensils,
  Clapperboard,
  Sandwich,
} from "lucide-react"
import { IDEIAS_DATE } from "@/data"
import { Botao, Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

const ICONES: Record<string, typeof Coffee> = {
  picnic: Sandwich,
  movie: Clapperboard,
  hike: Mountain,
  dinner: Utensils,
  stars: Sparkles,
  music: Music,
  game: Gamepad2,
  art: Palette,
  coffee: Coffee,
  road: Route,
}

export function Roleta() {
  const [indice, setIndice] = useState<number | null>(null)
  const [girando, setGirando] = useState(false)
  const timers = useRef<number[]>([])

  function girar() {
    if (girando) return
    setGirando(true)

    /* Embaralha visualmente por ~1,2s antes de parar no sorteado. */
    let passos = 0
    const embaralhar = window.setInterval(() => {
      setIndice(Math.floor(Math.random() * IDEIAS_DATE.length))
      passos += 1
      if (passos > 11) {
        window.clearInterval(embaralhar)
        setIndice(Math.floor(Math.random() * IDEIAS_DATE.length))
        setGirando(false)
      }
    }, 100)
    timers.current.push(embaralhar)
  }

  const sorteada = indice === null ? null : IDEIAS_DATE[indice]
  const Icone = sorteada ? (ICONES[sorteada.icone] ?? Sparkles) : Sparkles

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Roleta de encontros"
        titulo="Deixa a sorte escolher"
        descricao="Quando a gente não souber o que fazer, gira aqui. E aí não tem discussão: o que sair, a gente faz."
      />

      <Card className="flex flex-col items-center gap-7 p-7 text-center sm:p-12">
        <div className="flex min-h-56 w-full max-w-sm items-center justify-center">
          <AnimatePresence mode="wait">
            {sorteada ? (
              <motion.div
                key={`${indice}-${girando}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: girando ? 0.1 : 0.35 }}
                className="flex w-full flex-col items-center gap-4 rounded-card border border-border bg-muted px-6 py-9"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icone className="size-6" aria-hidden="true" />
                </span>
                <h2 className="font-serif text-2xl leading-tight text-pretty">
                  {sorteada.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {sorteada.descricao}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="vazio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-xs font-serif text-lg italic text-muted-foreground"
              >
                Aperte o botão e vamos descobrir o que a gente vai fazer.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Botao onClick={girar} disabled={girando} tamanho="lg">
          <Dices
            className={girando ? "size-5 animate-spin" : "size-5"}
            aria-hidden="true"
          />
          {girando ? "Girando..." : indice === null ? "Girar" : "Girar de novo"}
        </Botao>

        <p className="text-xs text-muted-foreground">
          {IDEIAS_DATE.length} ideias na roleta
        </p>
      </Card>
    </SecaoAnimada>
  )
}
