import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, RefreshCw } from "lucide-react"
import { MOTIVOS } from "@/data"
import { Botao, Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

export function Motivos() {
  const [motivo, setMotivo] = useState<string | null>(null)
  const [vistos, setVistos] = useState<string[]>([])
  const [chave, setChave] = useState(0)

  function sortear() {
    /* Evita repetir enquanto houver motivos não vistos. */
    const restantes = MOTIVOS.filter((m) => !vistos.includes(m))
    const fonte = restantes.length > 0 ? restantes : MOTIVOS
    const escolhido = fonte[Math.floor(Math.random() * fonte.length)]

    setMotivo(escolhido)
    setChave((k) => k + 1)
    setVistos((anteriores) =>
      restantes.length > 0 ? [...anteriores, escolhido] : [escolhido],
    )
  }

  const total = MOTIVOS.length
  const contagem = Math.min(vistos.length, total)

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Livro de motivos"
        titulo="Sempre tem mais um"
        descricao="Se um dia você duvidar, aperte o botão. Tem motivo guardado pra sobrar."
      />

      <Card className="flex flex-col items-center gap-8 p-7 text-center sm:p-12">
        <div className="flex min-h-40 w-full max-w-md items-center justify-center">
          <AnimatePresence mode="wait">
            {motivo ? (
              <motion.blockquote
                key={chave}
                initial={{ opacity: 0, rotateX: -35, y: 14 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 25, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-xl leading-relaxed text-pretty sm:text-2xl"
              >
                {motivo}
              </motion.blockquote>
            ) : (
              <motion.p
                key="inicial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-sm font-serif text-lg italic text-muted-foreground"
              >
                Toque no botão para descobrir o primeiro.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Botao onClick={sortear} tamanho="lg">
          {motivo ? (
            <RefreshCw className="size-5" aria-hidden="true" />
          ) : (
            <Heart className="size-5" aria-hidden="true" />
          )}
          Mais um motivo
        </Botao>

        {/* Contador de motivos vistos */}
        <div className="flex w-full max-w-xs flex-col gap-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Motivos vistos</span>
            <span className="tabular-nums">
              {contagem} de {total}
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={contagem}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Motivos vistos"
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${(contagem / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </Card>
    </SecaoAnimada>
  )
}
