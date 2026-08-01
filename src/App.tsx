import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookHeart,
  Dices,
  HelpCircle,
  Images,
  Mail,
  MapPin,
  Music2,
  Timer,
} from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { Abertura } from "@/components/Abertura"
import { BottomNav, Sidebar, TopoMobile, type ItemNav } from "@/components/Navegacao"
import { Contador } from "@/sections/Contador"
import { Memorias } from "@/sections/Memorias"
import { Roleta } from "@/sections/Roleta"
import { Mapa } from "@/sections/Mapa"
import { Carta } from "@/sections/Carta"
import { Playlist } from "@/sections/Playlist"
import { Motivos } from "@/sections/Motivos"
import { Quiz } from "@/sections/Quiz"

/* Ordem das seções no menu. */
const ITENS: ItemNav[] = [
  { id: "contador", rotulo: "Nosso tempo", rotuloCurto: "Tempo", icone: Timer },
  { id: "memorias", rotulo: "Cofre de memórias", rotuloCurto: "Memórias", icone: Images },
  { id: "roleta", rotulo: "Roleta de encontros", rotuloCurto: "Roleta", icone: Dices },
  { id: "mapa", rotulo: "Nossos lugares", rotuloCurto: "Lugares", icone: MapPin },
  { id: "carta", rotulo: "Carta do futuro", rotuloCurto: "Carta", icone: Mail },
  { id: "playlist", rotulo: "Nossa playlist", rotuloCurto: "Músicas", icone: Music2 },
  { id: "motivos", rotulo: "Livro de motivos", rotuloCurto: "Motivos", icone: BookHeart },
  { id: "quiz", rotulo: "Quiz do casal", rotuloCurto: "Quiz", icone: HelpCircle },
]

const SECOES: Record<string, () => React.ReactElement> = {
  contador: Contador,
  memorias: Memorias,
  roleta: Roleta,
  mapa: Mapa,
  carta: Carta,
  playlist: Playlist,
  motivos: Motivos,
  quiz: Quiz,
}

export default function App() {
  const { tema, alternar } = useTheme()
  const [comecou, setComecou] = useState(false)
  const [ativo, setAtivo] = useState("contador")

  function selecionar(id: string) {
    setAtivo(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!comecou) {
    return (
      <Abertura
        onComecar={() => setComecou(true)}
        tema={tema}
        onAlternarTema={alternar}
      />
    )
  }

  const Secao = SECOES[ativo] ?? Contador

  return (
    <div className="flex min-h-dvh">
      <Sidebar
        itens={ITENS}
        ativo={ativo}
        onSelecionar={selecionar}
        tema={tema}
        onAlternarTema={alternar}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopoMobile tema={tema} onAlternarTema={alternar} />

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-28 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
          <AnimatePresence mode="wait">
            <motion.div key={ativo}>
              <Secao />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mx-auto w-full max-w-3xl px-5 pb-28 sm:px-8 lg:pb-8">
          <p className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            Feito para você, com tudo o que eu tenho.
          </p>
        </footer>
      </div>

      <BottomNav itens={ITENS} ativo={ativo} onSelecionar={selecionar} />
    </div>
  )
}
