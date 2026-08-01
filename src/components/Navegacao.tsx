import type { LucideIcon } from "lucide-react"
import { Heart, MoonStar, Sun } from "lucide-react"
import { CASAL } from "@/data"

export type ItemNav = {
  id: string
  rotulo: string
  rotuloCurto: string
  icone: LucideIcon
}

/* ---------- Sidebar (desktop) ---------- */
export function Sidebar({
  itens,
  ativo,
  onSelecionar,
  tema,
  onAlternarTema,
}: {
  itens: ItemNav[]
  ativo: string
  onSelecionar: (id: string) => void
  tema: "claro" | "escuro"
  onAlternarTema: () => void
}) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
      <div className="flex h-dvh flex-col gap-6 overflow-y-auto p-6">
        {/* Marca */}
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Heart className="size-4 fill-current" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-serif text-base leading-tight">
              Nosso Lugar
            </span>
            <span className="truncate text-xs text-muted-foreground">
              para {CASAL.nomeDela}
            </span>
          </div>
        </div>

        {/* Itens */}
        <nav aria-label="Seções">
          <ul className="flex flex-col gap-1">
            {itens.map((item) => {
              const Icone = item.icone
              const selecionado = ativo === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelecionar(item.id)}
                    aria-current={selecionado ? "page" : undefined}
                    className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      selecionado
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icone className="size-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.rotulo}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Alternador de tema */}
        <button
          type="button"
          onClick={onAlternarTema}
          className="mt-auto flex items-center gap-3 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {tema === "escuro" ? (
            <Sun className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <MoonStar className="size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{tema === "escuro" ? "Tema claro" : "Tema escuro"}</span>
        </button>
      </div>
    </aside>
  )
}

/* ---------- Topo (mobile) ---------- */
export function TopoMobile({
  tema,
  onAlternarTema,
}: {
  tema: "claro" | "escuro"
  onAlternarTema: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-5 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Heart className="size-3.5 fill-current" aria-hidden="true" />
        </span>
        <span className="font-serif text-base">Nosso Lugar</span>
      </div>
      <button
        type="button"
        onClick={onAlternarTema}
        aria-label={tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"}
        className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {tema === "escuro" ? (
          <Sun className="size-4" />
        ) : (
          <MoonStar className="size-4" />
        )}
      </button>
    </header>
  )
}

/* ---------- Bottom nav (mobile) ---------- */
export function BottomNav({
  itens,
  ativo,
  onSelecionar,
}: {
  itens: ItemNav[]
  ativo: string
  onSelecionar: (id: string) => void
}) {
  return (
    <nav
      aria-label="Seções"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
    >
      <ul className="no-scrollbar flex snap-x items-stretch gap-1 overflow-x-auto px-2 py-2">
        {itens.map((item) => {
          const Icone = item.icone
          const selecionado = ativo === item.id
          return (
            <li key={item.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => onSelecionar(item.id)}
                aria-current={selecionado ? "page" : undefined}
                className={`flex w-18 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring ${
                  selecionado
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icone className="size-5" aria-hidden="true" />
                <span className="text-[0.65rem] leading-tight">
                  {item.rotuloCurto}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
