import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const CHAVE_MUTE = "nosso-lugar:som-mutado"

type SomContextType = {
  mutado: boolean
  alternarMute: () => void
  tocar: (volume?: number) => void
}

const SomContext = createContext<SomContextType | null>(null)

let audioCtx: AudioContext | null = null

function obterContexto(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!audioCtx) {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      audioCtx = new AudioCtor()
    }
    return audioCtx
  } catch {
    return null
  }
}

/* Sintetiza um "clique" curto e suave na hora — não depende de nenhum
   arquivo .mp3/.wav, então nunca quebra por causa de asset ausente. */
function tocarClique(volume: number) {
  const ctx = obterContexto()
  if (!ctx) return
  try {
    if (ctx.state === "suspended") ctx.resume()

    const osc = ctx.createOscillator()
    const ganho = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(720, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.12)

    ganho.gain.setValueAtTime(volume, ctx.currentTime)
    ganho.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)

    osc.connect(ganho)
    ganho.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  } catch {
    // Web Audio bloqueado/indisponível — ignora silenciosamente.
  }
}

export function SomProvider({ children }: { children: ReactNode }) {
  const [mutado, setMutado] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(CHAVE_MUTE) === "1"
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(CHAVE_MUTE, mutado ? "1" : "0")
    } catch {
      // ignora
    }
  }, [mutado])

  const tocar = useCallback(
    (volume = 0.05) => {
      if (mutado) return
      tocarClique(volume)
    },
    [mutado]
  )

  const alternarMute = useCallback(() => setMutado((m) => !m), [])

  const valor = useMemo(
    () => ({ mutado, alternarMute, tocar }),
    [mutado, alternarMute, tocar]
  )

  return <SomContext.Provider value={valor}>{children}</SomContext.Provider>
}

export function useSom() {
  const contexto = useContext(SomContext)
  if (!contexto) {
    throw new Error("useSom precisa ser usado dentro de <SomProvider>")
  }
  return contexto
}