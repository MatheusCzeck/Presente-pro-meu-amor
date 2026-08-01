import { useCallback, useEffect, useState } from "react"

type Tema = "claro" | "escuro"

const CHAVE = "nosso-lugar:tema"

/* Tema inicial: o que estiver salvo, senão o escuro elegante. */
function temaInicial(): Tema {
  if (typeof window === "undefined") return "escuro"
  const salvo = window.localStorage.getItem(CHAVE)
  if (salvo === "claro" || salvo === "escuro") return salvo
  return "escuro"
}

export function useTheme() {
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    const raiz = document.documentElement
    raiz.classList.toggle("dark", tema === "escuro")
    window.localStorage.setItem(CHAVE, tema)
  }, [tema])

  const alternar = useCallback(() => {
    setTema((atual) => (atual === "escuro" ? "claro" : "escuro"))
  }, [])

  return { tema, alternar }
}
