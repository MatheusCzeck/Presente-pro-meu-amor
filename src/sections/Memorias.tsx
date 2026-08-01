import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, X } from "lucide-react"
import { MEMORIAS, type Memoria } from "@/data"
import { CabecalhoSecao, SecaoAnimada } from "@/components/ui"

export function Memorias() {
  const [aberta, setAberta] = useState<Memoria | null>(null)

  /* Fecha o lightbox com a tecla Esc e trava o scroll do fundo. */
  useEffect(() => {
    if (!aberta) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberta(null)
    }
    window.addEventListener("keydown", aoTeclar)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", aoTeclar)
      document.body.style.overflow = ""
    }
  }, [aberta])

  return (
    <SecaoAnimada>
      <CabecalhoSecao
        sobretitulo="Cofre de memórias"
        titulo="Momentos que eu guardei"
        descricao="Toque em qualquer foto para ler a cartinha que eu escrevi sobre aquele dia."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {MEMORIAS.map((memoria, i) => (
          <motion.button
            key={memoria.titulo}
            type="button"
            onClick={() => setAberta(memoria)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-card border border-border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <img
              src={memoria.imagem || "/placeholder.svg"}
              alt={memoria.titulo}
              className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
              <span className="text-xs uppercase tracking-wider text-white/70">
                {memoria.data}
              </span>
              <span className="font-serif text-base leading-tight text-white text-pretty">
                {memoria.titulo}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox com a cartinha */}
      <AnimatePresence>
        {aberta ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setAberta(null)}
            role="dialog"
            aria-modal="true"
            aria-label={aberta.titulo}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card sm:rounded-card"
            >
              <button
                type="button"
                onClick={() => setAberta(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="size-4" />
              </button>

              <img
                src={aberta.imagem || "/placeholder.svg"}
                alt={aberta.titulo}
                className="aspect-3/2 w-full object-cover"
              />

              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.15em] text-primary">
                    {aberta.data}
                  </span>
                  <h2 className="font-serif text-2xl leading-tight text-pretty">
                    {aberta.titulo}
                  </h2>
                </div>
                <p className="leading-relaxed text-pretty text-muted-foreground">
                  {aberta.texto}
                </p>
                <Heart
                  className="size-4 fill-primary text-primary"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SecaoAnimada>
  )
}
