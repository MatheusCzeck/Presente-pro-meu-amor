import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

type DadosNotificacao = {
  destinatarioEmail: string
  destinatarioNome: string
  dataRevelacao: string
  trechoTexto: string
}

/* Envia um único e-mail via EmailJS. Falha em silêncio (só loga no console)
   para não travar a experiência do app caso o EmailJS não esteja configurado. */
export async function enviarNotificacaoCarta(dados: DadosNotificacao) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn(
      "EmailJS não configurado (.env.local ausente ou incompleto) — notificação não enviada."
    )
    return
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: dados.destinatarioEmail,
        to_name: dados.destinatarioNome,
        data_revelacao: dados.dataRevelacao,
        trecho: dados.trechoTexto,
      },
      { publicKey: PUBLIC_KEY }
    )
  } catch (erro) {
    console.error("Falha ao enviar notificação de carta:", erro)
  }
}