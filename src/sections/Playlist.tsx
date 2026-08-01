import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Music2, Pause, Play, AlertCircle } from "lucide-react"
import { PLAYLIST } from "@/data"
import { Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

/* Formata segundos como "1:23". */
function formatarTempo(segundos: number) {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00"
  const min = Math.floor(segundos / 60)
  const seg = Math.floor(segundos % 60)
  return `${min}:${String(seg).padStart(2, "0")}`
}

export function Playlist() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [selecionada, setSelecionada] = useState<number | null>(null)
  const [tocando, setTocando] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [duracao, setDuracao] = useState(0)
  const [erro, setErro] = useState(false)

  const musicaSelecionada = selecionada === null ? null : PLAYLIST[selecionada]

  /* Troca a faixa carregada no <audio> sempre que a seleção muda. */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || selecionada === null) return

    const musica = PLAYLIST[selecionada]
    setErro(false)
    setProgresso(0)
    setDuracao(0)

    if (!musica.arquivo) {
      setTocando(false)
      return
    }

    audio.src = musica.arquivo
    audio.currentTime = 0
    audio
      .play()
      .then(() => setTocando(true))
      .catch(() => setTocando(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecionada])

  function selecionarOuAlternar(i: number) {
    const musica = PLAYLIST[i]

    if (selecionada !== i) {
      setSelecionada(i)
      return
    }

    // Clicou de novo na mesma faixa: alterna play/pause.
    const audio = audioRef.current
    if (!audio || !musica.arquivo) return

    if (tocando) {
      audio.pause()
      setTocando(false)
    } else {
      audio.play().then(() => setTocando(true)).catch(() => setTocando(false))
    }
  }

  function aoArrastarProgresso(novoTempo: number) {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = novoTempo
    setProgresso(novoTempo)
  }

  function tocarProximaAoTerminar() {
    if (selecionada === null) return
    const proximo = selecionada + 1
    if (proximo < PLAYLIST.length) {
      setSelecionada(proximo)
    } else {
      setTocando(false)
      setProgresso(0)
    }
  }

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Playlist do casal"
        titulo="A trilha sonora da gente"
        descricao="Toque em uma música para ouvir e ver por que ela entrou nessa lista."
      />

      {/* Elemento de áudio único, compartilhado entre as faixas */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgresso(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
        onEnded={tocarProximaAoTerminar}
        onError={() => setErro(true)}
        onPause={() => setTocando(false)}
        onPlay={() => setTocando(true)}
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
            const ativa = selecionada === i
            const tocandoEssa = ativa && tocando

            return (
              <li key={`${musica.nome}-${i}`}>
                <button
                  type="button"
                  onClick={() => selecionarOuAlternar(i)}
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
                    {tocandoEssa ? (
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
                    {ativa && duracao > 0
                      ? formatarTempo(duracao)
                      : musica.duracao}
                  </span>
                </button>

                {/* Player expandido + motivo da música */}
                <AnimatePresence initial={false}>
                  {ativa ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 border-l-2 border-primary bg-muted px-5 py-4 sm:px-6">
                        {!musica.arquivo ? (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                            Ainda não tem áudio nessa faixa. Adicione o
                            arquivo em <code className="rounded bg-background px-1">public/audio</code> e
                            aponte pelo campo <code className="rounded bg-background px-1">arquivo</code> em
                            data.ts.
                          </p>
                        ) : erro ? (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                            Não consegui carregar esse áudio. Confira se o
                            arquivo existe no caminho indicado.
                          </p>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                              {formatarTempo(progresso)}
                            </span>
                            <input
                              type="range"
                              min={0}
                              max={duracao || 0}
                              step={0.1}
                              value={Math.min(progresso, duracao || 0)}
                              onChange={(e) =>
                                aoArrastarProgresso(Number(e.target.value))
                              }
                              className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-border accent-primary"
                              aria-label={`Progresso de ${musica.nome}`}
                            />
                            <span className="w-9 shrink-0 text-xs tabular-nums text-muted-foreground">
                              {formatarTempo(duracao)}
                            </span>
                          </div>
                        )}

                        <p className="text-sm italic leading-relaxed text-pretty">
                          {musica.motivo}
                        </p>
                      </div>
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