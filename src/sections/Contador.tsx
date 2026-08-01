import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Film, Heart, Plane } from "lucide-react"
import { CASAL, ESTATISTICAS } from "@/data"
import { Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

const ICONES: Record<string, typeof Heart> = {
  heart: Heart,
  plane: Plane,
  film: Film,
  coffee: Coffee,
}

type Tempo = { dias: number; horas: number; minutos: number; segundos: number }

function calcularTempo(inicio: string): Tempo {
  const diferenca = Math.max(0, Date.now() - new Date(inicio).getTime())
  const totalSegundos = Math.floor(diferenca / 1000)
  return {
    dias: Math.floor(totalSegundos / 86400),
    horas: Math.floor((totalSegundos % 86400) / 3600),
    minutos: Math.floor((totalSegundos % 3600) / 60),
    segundos: totalSegundos % 60,
  }
}

export function Contador() {
  const [tempo, setTempo] = useState(() => calcularTempo(CASAL.dataInicio))

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo(calcularTempo(CASAL.dataInicio))
    }, 1000)
    return () => clearInterval(intervalo)
  }, [])

  const unidades = [
    { valor: tempo.dias, rotulo: tempo.dias === 1 ? "dia" : "dias" },
    { valor: tempo.horas, rotulo: "horas" },
    { valor: tempo.minutos, rotulo: "min" },
    { valor: tempo.segundos, rotulo: "seg" },
  ]

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Desde o primeiro dia"
        titulo={`Há ${tempo.dias.toLocaleString("pt-BR")} dias ao seu lado`}
        descricao="E o contador não para. Cada segundo aqui em cima é um segundo que eu escolhi você de novo."
      />

      {/* Relógio ao vivo */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
          {unidades.map((unidade, i) => (
            <div
              key={unidade.rotulo}
              className={`flex flex-col items-center gap-1 px-4 py-7 ${
                i < 2 ? "border-b border-border sm:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r border-border sm:border-r-0" : ""}`}
            >
              <span className="font-serif text-4xl tabular-nums text-primary sm:text-5xl">
                {unidade.valor.toString().padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {unidade.rotulo}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Estatísticas fofas */}
      <div>
        <h2 className="mb-4 font-serif text-xl">Alguns números nossos</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ESTATISTICAS.map((item, i) => {
            const Icone = ICONES[item.icone] ?? Heart
            return (
              <motion.div
                key={item.rotulo}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Card className="flex h-full flex-col gap-3 p-5">
                  <Icone className="size-5 text-accent" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-serif text-2xl">{item.valor}</span>
                    <span className="text-sm leading-snug text-muted-foreground">
                      {item.rotulo}
                    </span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Frase de fecho */}
      <Card className="bg-muted p-6 sm:p-8">
        <p className="font-serif text-lg italic leading-relaxed text-pretty sm:text-xl">
          &ldquo;Eu não conto os dias por saudade. Conto porque cada um deles
          valeu a pena.&rdquo;
        </p>
      </Card>
    </SecaoAnimada>
  )
}
