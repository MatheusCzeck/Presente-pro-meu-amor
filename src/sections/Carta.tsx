import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Download, Lock, Mail, MailOpen, Trash2, Upload } from "lucide-react"
import { Botao, Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

const CHAVE = "nosso-lugar:cartas"

type Carta = {
  id: string
  texto: string
  revelarEm: string // "AAAA-MM-DD"
  criadaEm: string
}

function carregar(): Carta[] {
  try {
    const bruto = window.localStorage.getItem(CHAVE)
    return bruto ? (JSON.parse(bruto) as Carta[]) : []
  } catch {
    return []
  }
}

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

/* Uma carta está liberada quando a data escolhida já chegou. */
function estaLiberada(carta: Carta) {
  const [ano, mes, dia] = carta.revelarEm.split("-").map(Number)
  return new Date(ano, mes - 1, dia).getTime() <= Date.now()
}

/* Dispara o download de um arquivo .json com a lista de cartas. */
function baixarBackup(cartas: Carta[]) {
  const conteudo = JSON.stringify(cartas, null, 2)
  const blob = new Blob([conteudo], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  const carimbo = new Date().toISOString().slice(0, 10)
  link.download = `nosso-lugar-cartas-${carimbo}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/* Valida se o conteúdo importado tem o formato esperado de uma lista de cartas. */
function ehCartaValida(valor: unknown): valor is Carta {
  if (!valor || typeof valor !== "object") return false
  const c = valor as Record<string, unknown>
  return (
    typeof c.id === "string" &&
    typeof c.texto === "string" &&
    typeof c.revelarEm === "string" &&
    typeof c.criadaEm === "string"
  )
}

export function Carta() {
  const [cartas, setCartas] = useState<Carta[]>([])
  const [texto, setTexto] = useState("")
  const [data, setData] = useState("")
  const [confirmacao, setConfirmacao] = useState<string | null>(null)
  const [abertaId, setAbertaId] = useState<string | null>(null)
  const [avisoImportacao, setAvisoImportacao] = useState<string | null>(null)
  const inputArquivoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCartas(carregar())
  }, [])

  function salvar(proximas: Carta[]) {
    setCartas(proximas)
    window.localStorage.setItem(CHAVE, JSON.stringify(proximas))
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim() || !data) return

    const nova: Carta = {
      id: crypto.randomUUID(),
      texto: texto.trim(),
      revelarEm: data,
      criadaEm: new Date().toISOString(),
    }
    const proximas = [nova, ...cartas]
    salvar(proximas)
    baixarBackup(proximas) // baixa um .json atualizado toda vez que uma carta é criada
    setConfirmacao(formatarData(data))
    setTexto("")
    setData("")
  }

  function apagar(id: string) {
    salvar(cartas.filter((c) => c.id !== id))
    if (abertaId === id) setAbertaId(null)
  }

  function abrirSeletorArquivo() {
    inputArquivoRef.current?.click()
  }

  function importarArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return

    const leitor = new FileReader()
    leitor.onload = () => {
      try {
        const dados = JSON.parse(String(leitor.result))
        const lista = Array.isArray(dados) ? dados : [dados]
        const validas = lista.filter(ehCartaValida)

        if (validas.length === 0) {
          setAvisoImportacao("O arquivo não parece ter cartas válidas.")
          return
        }

        // Junta com o que já existe, evitando duplicar pelo id
        const idsExistentes = new Set(cartas.map((c) => c.id))
        const novas = validas.filter((c) => !idsExistentes.has(c.id))
        const combinadas = [...novas, ...cartas]

        salvar(combinadas)
        setAvisoImportacao(
          `${novas.length} carta(s) restaurada(s) com sucesso.`
        )
      } catch {
        setAvisoImportacao("Não foi possível ler esse arquivo. Confira se é o .json correto.")
      } finally {
        e.target.value = ""
      }
    }
    leitor.readAsText(arquivo)
  }

  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Carta do futuro"
        titulo="Escreva agora, leia depois"
        descricao="Escolha uma data. A carta fica lacrada aqui até esse dia chegar — nem você pode ler antes."
      />

      {/* Formulário */}
      <Card className="p-6 sm:p-8">
        <form onSubmit={enviar} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="carta-texto" className="text-sm font-medium">
              O que você quer dizer?
            </label>
            <textarea
              id="carta-texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={5}
              required
              placeholder="Escreva sem pressa..."
              className="resize-none rounded-2xl border border-border bg-background px-4 py-3 leading-relaxed placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="carta-data" className="text-sm font-medium">
              Revelar em
            </label>
            <input
              id="carta-data"
              type="date"
              value={data}
              min={hoje}
              onChange={(e) => setData(e.target.value)}
              required
              className="rounded-full border border-border bg-background px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Botao type="submit">
              <Mail className="size-4" aria-hidden="true" />
              Lacrar carta
            </Botao>

            <Botao type="button" variante="contorno" onClick={abrirSeletorArquivo}>
              <Upload className="size-4" aria-hidden="true" />
              Restaurar backup
            </Botao>
            <input
              ref={inputArquivoRef}
              type="file"
              accept="application/json"
              onChange={importarArquivo}
              className="hidden"
            />
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Toda vez que uma carta é lacrada, um arquivo{" "}
            <code className="rounded bg-muted px-1 py-0.5">.json</code> de
            backup é baixado automaticamente. Guarde esse arquivo — se o
            navegador limpar os dados, é só usar o botão{" "}
            <strong>Restaurar backup</strong> com ele para trazer as cartas
            de volta.
          </p>
        </form>

        <AnimatePresence>
          {confirmacao ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p
                role="status"
                className="mt-5 rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed text-pretty"
              >
                Sua carta foi guardada e será revelada em{" "}
                <strong className="text-primary">{confirmacao}</strong>. Um
                backup em .json foi baixado — guarde-o em um lugar seguro.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {avisoImportacao ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p
                role="status"
                className="mt-3 rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed text-pretty"
              >
                {avisoImportacao}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>

      {/* Envelopes guardados */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-xl">
            Cartas guardadas{" "}
            <span className="text-base text-muted-foreground">
              ({cartas.length})
            </span>
          </h2>

          {cartas.length > 0 ? (
            <Botao
              variante="contorno"
              onClick={() => baixarBackup(cartas)}
            >
              <Download className="size-4" aria-hidden="true" />
              Baixar backup agora
            </Botao>
          ) : null}
        </div>

        {cartas.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma carta ainda. Escreva a primeira aí em cima.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {cartas.map((carta) => {
              const liberada = estaLiberada(carta)
              const aberta = abertaId === carta.id
              return (
                <motion.div
                  key={carta.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="flex h-full flex-col gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                          liberada
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {liberada ? (
                          <MailOpen className="size-4" aria-hidden="true" />
                        ) : (
                          <Lock className="size-4" aria-hidden="true" />
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => apagar(carta.id)}
                        aria-label="Apagar carta"
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.15em] text-accent">
                        {liberada ? "Liberada" : "Lacrada até"}
                      </span>
                      <span className="font-serif text-base leading-snug">
                        {formatarData(carta.revelarEm)}
                      </span>
                    </div>

                    {liberada ? (
                      <>
                        <AnimatePresence initial={false}>
                          {aberta ? (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden text-sm leading-relaxed text-pretty text-muted-foreground"
                            >
                              {carta.texto}
                            </motion.p>
                          ) : null}
                        </AnimatePresence>
                        <Botao
                          variante="contorno"
                          onClick={() => setAbertaId(aberta ? null : carta.id)}
                          className="mt-auto self-start"
                        >
                          {aberta ? "Fechar envelope" : "Abrir envelope"}
                        </Botao>
                      </>
                    ) : (
                      <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                        Ainda não é hora. Volte nessa data.
                      </p>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </SecaoAnimada>
  )
}