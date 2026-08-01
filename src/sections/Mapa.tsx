import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { LUGARES } from "@/data"
import { Card, CabecalhoSecao, SecaoAnimada } from "@/components/ui"

export function Mapa() {
  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Mapa do relacionamento"
        titulo="Os lugares que são nossos"
        descricao="Nem todo lugar importante aparece no mapa. Esses aqui aparecem no meu."
      />

      <ol className="relative flex flex-col gap-6">
        {/* Linha vertical da timeline */}
        <div
          className="absolute left-4 top-3 bottom-3 w-px bg-border sm:left-5"
          aria-hidden="true"
        />

        {LUGARES.map((lugar, i) => (
          <motion.li
            key={lugar.nome}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.07 * i, duration: 0.35 }}
            className="relative flex gap-4 sm:gap-6"
          >
            {/* Pin */}
            <span
              className={`relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border sm:size-10 ${
                i === LUGARES.length - 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-primary"
              }`}
            >
              <MapPin className="size-4 sm:size-5" aria-hidden="true" />
            </span>

            <Card className="flex-1 p-5 sm:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-serif text-lg leading-tight text-pretty sm:text-xl">
                    {lugar.nome}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.15em] text-accent">
                    {lugar.data}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary">
                  {lugar.cidade}
                </p>
                <p className="leading-relaxed text-pretty text-muted-foreground">
                  {lugar.historia}
                </p>
              </div>
            </Card>
          </motion.li>
        ))}
      </ol>
    </SecaoAnimada>
  )
}
