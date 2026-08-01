import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Music2, Pause, Play } from "lucide-react"
import { PLAYLIST } from "@/data"
import { Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

export function Playlist() {
  /* Player só visual: marca qual faixa está "tocando" e mostra o motivo. */
  const [tocando, setTocando] = useState<number | null>(null)

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Playlist do casal"
        titulo="A trilha sonora da gente"
        descricao="Toque em uma música para ver por que ela entrou nessa lista."
      />

      <Card className="overflow-hidden">
        {/* Cabeçalho do player */}
        <div className="flex items-center gap-4 border-b border-border bg-muted p-5 sm:p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:size-16">
            <Music2 className="size-6" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Playlist
            </span>
            <h2 className="font-serif text-xl leading-tight">Nosso Lugar</h2>
            <span className="text-sm text-muted-foreground">
              {PLAYLIST.length} músicas
            </span>
          </div>
        </div>

        {/* Faixas */}
        <ul className="divide-y divide-border">
          {PLAYLIST.map((musica, i) => {
            const ativa = tocando === i
            return (
              <li key={`${musica.nome}-${i}`}>
                <button
                  type="button"
                  onClick={() => setTocando(ativa ? null : i)}
                  aria-expanded={ativa}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-6"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      ativa
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {ativa ? (
                      <Pause className="size-4" aria-hidden="true" />
                    ) : (
                      <Play className="size-4" aria-hidden="true" />
                    )}
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span
                      className={`truncate font-medium ${ativa ? "text-primary" : ""}`}
                    >
                      {musica.nome}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      {musica.artista}
                    </span>
                  </span>

                  <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                    {musica.duracao}
                  </span>
                </button>

                {/* Motivo da música */}
                <AnimatePresence initial={false}>
                  {ativa ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-l-2 border-primary bg-muted px-5 py-4 text-sm italic leading-relaxed text-pretty sm:px-6">
                        {musica.motivo}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Card>
    </SecaoAnimada>
  )
}
