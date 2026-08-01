import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Download, Heart, RotateCcw, Share2, X } from "lucide-react"
import { toBlob } from "html-to-image"
import { QUIZ, RESULTADOS_QUIZ, CASAL } from "@/data"
import { Botao, Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"
import { dispararConfeteGrande } from "@/lib/confete"

export function Quiz() {
  const [atual, setAtual] = useState(0)
  const [escolhida, setEscolhida] = useState<number | null>(null)
  const [acertos, setAcertos] = useState(0)
  const [terminou, setTerminou] = useState(false)
  const [gerandoImagem, setGerandoImagem] = useState(false)
  const [avisoCompartilhar, setAvisoCompartilhar] = useState<string | null>(null)

  const cardCompartilhamentoRef = useRef<HTMLDivElement>(null)

  const pergunta = QUIZ[atual]
  const total = QUIZ.length

  function responder(indice: number) {
    if (escolhida !== null) return
    setEscolhida(indice)
    if (indice === pergunta.correta) setAcertos((a) => a + 1)
  }

  function avancar() {
    if (atual + 1 >= total) {
      setTerminou(true)
      return
    }
    setAtual((a) => a + 1)
    setEscolhida(null)
  }

  function reiniciar() {
    setAtual(0)
    setEscolhida(null)
    setAcertos(0)
    setTerminou(false)
    setAvisoCompartilhar(null)
  }

  const proporcao = acertos / total
  const mensagem =
    proporcao >= 0.8
      ? RESULTADOS_QUIZ.alto
      : proporcao >= 0.5
        ? RESULTADOS_QUIZ.medio
        : RESULTADOS_QUIZ.baixo

  const progresso = terminou ? 100 : (atual / total) * 100

  /* Confete quando ela acerta tudo. */
  useEffect(() => {
    if (terminou && acertos === total) {
      dispararConfeteGrande()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminou])

  /* Renderiza o card oculto como PNG (Blob), usando html-to-image.
     Diferente do html2canvas, essa lib deixa o próprio navegador desenhar
     as cores (via SVG), então formatos modernos como oklch/oklab funcionam
     sem precisar sobrescrever nada. */
  async function gerarImagem(): Promise<Blob | null> {
    if (!cardCompartilhamentoRef.current) return null
    try {
      const blob = await toBlob(cardCompartilhamentoRef.current, {
        pixelRatio: 2, // resolução mais alta, fica nítido pra print/story
        cacheBust: true,
      })
      return blob
    } catch (erro) {
      console.error("Falha ao gerar imagem do resultado:", erro)
      return null
    }
  }

  function baixarBlob(blob: Blob, nomeArquivo: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  async function baixarImagem() {
    setGerandoImagem(true)
    setAvisoCompartilhar(null)
    try {
      const blob = await gerarImagem()
      if (!blob) {
        setAvisoCompartilhar("Não foi possível gerar a imagem. Tente de novo.")
        return
      }
      baixarBlob(blob, "quiz-do-casal.png")
    } finally {
      setGerandoImagem(false)
    }
  }

  async function compartilharImagem() {
    setGerandoImagem(true)
    setAvisoCompartilhar(null)
    try {
      const blob = await gerarImagem()
      if (!blob) {
        setAvisoCompartilhar("Não foi possível gerar a imagem. Tente de novo.")
        return
      }
      const arquivo = new File([blob], "quiz-do-casal.png", {
        type: "image/png",
      })

      const podeCompartilharArquivo =
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [arquivo] })

      if (podeCompartilharArquivo) {
        await navigator.share({
          files: [arquivo],
          title: "Quiz do casal",
          text: "Olha meu resultado no nosso quiz! 💕",
        })
      } else {
        // Navegador não suporta compartilhamento nativo de arquivo (comum em desktop):
        // baixa a imagem pra pessoa anexar manualmente onde quiser.
        baixarBlob(blob, "quiz-do-casal.png")
        setAvisoCompartilhar(
          "Esse navegador não suporta compartilhamento direto — a imagem foi baixada, é só anexar no WhatsApp."
        )
      }
    } catch (erro) {
      const cancelado = erro instanceof Error && erro.name === "AbortError"
      if (!cancelado) {
        setAvisoCompartilhar("Não foi possível compartilhar. Tente baixar a imagem.")
      }
    } finally {
      setGerandoImagem(false)
    }
  }

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Quiz do casal"
        titulo="Quanto você me conhece?"
        descricao="Sem consultar ninguém. Vale ponto de honra."
      />

      {/* Barra de progresso */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted-foreground">
            {terminou ? "Concluído" : `Pergunta ${atual + 1} de ${total}`}
          </span>
          <span className="tabular-nums text-muted-foreground">
            {acertos} {acertos === 1 ? "acerto" : "acertos"}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={Math.round(progresso)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do quiz"
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {terminou ? (
          /* ---------- Tela final ---------- */
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="size-7 fill-current" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-serif text-5xl text-primary">
                  {acertos}/{total}
                </span>
                <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                  Sua pontuação
                </span>
              </div>
              <p className="max-w-md font-serif text-lg italic leading-relaxed text-pretty sm:text-xl">
                {mensagem}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Botao
                  onClick={compartilharImagem}
                  disabled={gerandoImagem}
                >
                  <Share2 className="size-4" aria-hidden="true" />
                  {gerandoImagem ? "Gerando..." : "Compartilhar resultado"}
                </Botao>
                <Botao
                  variante="contorno"
                  onClick={baixarImagem}
                  disabled={gerandoImagem}
                >
                  <Download className="size-4" aria-hidden="true" />
                  Baixar imagem
                </Botao>
                <Botao variante="contorno" onClick={reiniciar}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Jogar de novo
                </Botao>
              </div>

              <AnimatePresence>
                {avisoCompartilhar ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="status"
                    className="overflow-hidden text-sm text-muted-foreground"
                  >
                    {avisoCompartilhar}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </Card>
          </motion.div>
        ) : (
          /* ---------- Pergunta ---------- */
          <motion.div
            key={atual}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col gap-6 p-6 sm:p-8">
              <h2 className="font-serif text-xl leading-snug text-pretty sm:text-2xl">
                {pergunta.pergunta}
              </h2>

              <ul className="flex flex-col gap-3">
                {pergunta.opcoes.map((opcao, i) => {
                  const eCorreta = i === pergunta.correta
                  const eEscolhida = escolhida === i
                  const revelado = escolhida !== null

                  return (
                    <li key={opcao}>
                      <button
                        type="button"
                        onClick={() => responder(i)}
                        disabled={revelado}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                          revelado && eCorreta
                            ? "border-primary bg-primary/10 text-foreground"
                            : revelado && eEscolhida
                              ? "border-border bg-muted text-muted-foreground line-through"
                              : revelado
                                ? "border-border text-muted-foreground"
                                : "border-border hover:border-primary hover:bg-muted"
                        }`}
                      >
                        <span>{opcao}</span>
                        {revelado && eCorreta ? (
                          <Check
                            className="size-5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                        ) : null}
                        {revelado && eEscolhida && !eCorreta ? (
                          <X
                            className="size-5 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {escolhida !== null ? (
                <Botao onClick={avancar} className="self-end">
                  {atual + 1 >= total ? "Ver resultado" : "Próxima"}
                </Botao>
              ) : null}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -----------------------------------------------------------------
         Card "fantasma" usado só para gerar a imagem de compartilhamento.
         Fica fora da tela (não aparece pra ninguém), mas o html2canvas
         consegue capturá-lo normalmente porque ele está no DOM.
         ----------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: "-9999px" }}
      >
        <div
          ref={cardCompartilhamentoRef}
          className="captura-compartilhar"
          style={{
            width: 600,
            padding: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            textAlign: "center",
            // Cores fixas em hex (não usar var()/oklch aqui: o html2canvas
            // não consegue interpretar a função oklch() do Tailwind v4 e
            // quebra a geração da imagem).
            background: "linear-gradient(160deg, #2A1B4D 0%, #4C2A85 100%)",
            color: "#F5F1FB",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "9999px",
              backgroundColor: "#C9A6FF",
              color: "#2A1B4D",
            }}
          >
            <Heart className="size-8 fill-current" aria-hidden="true" />
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 64,
                color: "#C9A6FF",
                lineHeight: 1,
              }}
            >
              {acertos}/{total}
            </span>
            <span
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#B8AAD6",
              }}
            >
              Quiz do casal
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 1.6,
              maxWidth: 460,
              color: "#F5F1FB",
            }}
          >
            {mensagem}
          </p>

          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B8AAD6",
            }}
          >
            {CASAL.nomeDele} &amp; {CASAL.nomeDela} · Nosso Lugar
          </span>
        </div>
      </div>
    </SecaoAnimada>
  )
}