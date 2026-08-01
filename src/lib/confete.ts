import confetti from "canvas-confetti"

/* Confete "de comemoração" — quiz perfeito, marcos importantes etc. */
export function dispararConfeteGrande() {
  const cores = ["#7c3aed", "#c9a6ff", "#f5c6d6", "#ffd700"]

  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 38,
    origin: { y: 0.6 },
    colors: cores,
  })

  window.setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      startVelocity: 28,
      origin: { y: 0.55 },
      colors: cores,
    })
  }, 200)
}

/* Confete leve — usado em ações menores, tipo girar a roleta. */
export function dispararConfeteLeve() {
  confetti({
    particleCount: 40,
    spread: 55,
    startVelocity: 25,
    origin: { y: 0.5 },
    colors: ["#7c3aed", "#c9a6ff", "#f5c6d6"],
  })
}