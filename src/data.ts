/* =========================================================================
   ARQUIVO DE DADOS — EDITE TUDO POR AQUI
   -------------------------------------------------------------------------
   Este é o único arquivo que você precisa mexer para personalizar o app.
   Troque nomes, datas, textos e caminhos de foto. Nada de código aqui.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. INFORMAÇÕES BÁSICAS
   TROQUE: o nome dela, o seu, e a data em que vocês começaram.
   Formato da data: "AAAA-MM-DDTHH:MM:SS" (ano-mês-dia T hora:minuto:segundo)
   ------------------------------------------------------------------------- */
export const CASAL = {
  nomeDela: "Princesinha", // <-- TROQUE pelo nome dela
  nomeDele: "Eu", // <-- TROQUE pelo seu nome
  dataInicio: "2024-09-17T07:00:00", // <-- TROQUE pela data em que vocês começaram
  fraseAbertura: "Fiz esse cantinho para guardar a gente.", // <-- frase da tela inicial
  emailDela: "fernanda.burdizinski.csouza@gmail.com",
  emailDele: "mc.matheusczeck@gmail.com",
}

/* -------------------------------------------------------------------------
   2. CONTADOR — estatísticas fofas dos cards
   TROQUE: os valores. São números fixos, você atualiza quando quiser.
   ------------------------------------------------------------------------- */
export const ESTATISTICAS = [
  { rotulo: '"Eu te amo" ditos', valor: "4.812", icone: "heart" },
  { rotulo: "Viagens juntos", valor: "7", icone: "plane" },
  { rotulo: "Filmes assistidos", valor: "15", icone: "film" },
  { rotulo: "Cafés da manhã", valor: "10", icone: "coffee" },
]

/* -------------------------------------------------------------------------
   3. COFRE DE MEMÓRIAS
   TROQUE: coloque suas fotos na pasta /public e use o caminho "/minha-foto.jpg".
   Cada memória abre uma cartinha ao ser clicada.
   ------------------------------------------------------------------------- */
export type Memoria = {
  imagem: string
  titulo: string
  data: string
  texto: string
}

export const MEMORIAS: Memoria[] = [
  {
    imagem: "/os-dias-de-hoje.jpeg", // <-- TROQUE pela foto real
    titulo: "Esse dia foi especial pra mim",
    data: "30 de julho, 2026",
    texto:
      "O dia foi cansativo, mas ter você no final dele fez ele mil vezes melhor.",
  },
  {
    imagem: "/dia-dosnamoradu.jpeg",
    titulo: "Dia dos namorados",
    data: "12 de junho, 2026",
    texto:
      "Esse dia eu tentei te fazer bem de verdade e fazer esquecer de tudo que te faz mau.",
  },
  {
    imagem: "/ilha-do-mel.jpeg",
    titulo: "Ilha do mel",
    data: "15 de fevereiro, 2026",
    texto:
      "Só pra esclarecer que vai aparecer 2 vezes hihihihi, esse dia foi o melhor dia da minha vida <3.",
  },
  {
    imagem: "/meu-aniversario.jpeg",
    titulo: "Meu aniversário",
    data: "13 de junho, 2025",
    texto:
      "Você me fez muito feliz, eu amei esse dia foi muito bom, eu te amooo.",
  },
  {
    imagem: "/primeira-noite-juntos.jpeg",
    titulo: "primeira vez que dormi na sua casa",
    data: "3 de maio, 2025",
    texto:
      "Foi muito bom, eu nunca vou esquecer. Na festa e o tempo que tive com você.",
  },
  {
    imagem: "/a-nossa-primeira-foto-e-beijo.jpeg",
    titulo: "Primeira foto",
    data: "28 de agosto, 2024",
    texto:
      "Foi quando começamos a ficar e nossas vidas nunca mais foram a mesma <3.",
  },
]

/* -------------------------------------------------------------------------
   4. ROLETA DE ENCONTROS
   TROQUE / ADICIONE ideias de date. O "icone" escolhe o desenho do card.
   Ícones disponíveis: picnic, movie, hike, dinner, stars, music, game, art,
   coffee, road
   ------------------------------------------------------------------------- */
export type IdeiaDate = {
  titulo: string
  descricao: string
  icone: string
}

export const IDEIAS_DATE: IdeiaDate[] = [
  { titulo: "Piquenique no parque", descricao: "Cesta, cobertor e nada de pressa.", icone: "picnic" },
  { titulo: "Cinema em casa", descricao: "Cobertas no chão da sala e pipoca demais.", icone: "movie" },
  { titulo: "Resort de manhã", descricao: "Acordar cedo, e ir pra um resort, sem celular.", icone: "hike" },
  { titulo: "Restaurante novo", descricao: "Aquele que a gente vive dizendo que vai.", icone: "dinner" },
  { titulo: "Viajar pra praia", descricao: "Sair da cidade e ir a praia de noite.", icone: "stars" },
  { titulo: "Noite de playlist", descricao: "Cada um mostra 5 músicas e explica o porquê.", icone: "music" },
  { titulo: "Torneio de jogos", descricao: "Perdedor faz o o outro quiser.", icone: "game" },
  { titulo: "Role no shopping", descricao: "Vamos bem gatãos e nos amamos.", icone: "art" },
  { titulo: "Café da manhã fora", descricao: "Acordar sem alarme e sair só pra comer pão.", icone: "coffee" },
  { titulo: "Viagem sem destino", descricao: "Entrar no carro e virar onde der na telha.", icone: "road" },
  { titulo: "Corrida de kart", descricao: "Comemos um lanchinho te compro roupa e vamos numa corrida de kart.", icone: "road" },
]

/* -------------------------------------------------------------------------
   5. MAPA DO RELACIONAMENTO (linha do tempo de lugares)
   TROQUE: os lugares, datas e as historinhas.
   ------------------------------------------------------------------------- */
export type Lugar = {
  nome: string
  cidade: string
  data: string
  historia: string
}

export const LUGARES: Lugar[] = [
  {
    nome: "A mesa da escola",
    cidade: "Onde tudo começou",
    data: "Agosto, 2024",
    historia:
      "Nesse dia eu fiquei caido por você e só queria conseguir gerar um assunto.",
  },
  {
    nome: "Passeio da escola pro SENAI",
    cidade: "Minha primeira vez indo pra algum lugar com você",
    data: "Agosto, 2024",
    historia:
      "Foi o dia que me apaixonei por completo por você e ganhei entimidade.",
  },
  {
    nome: "Viagem pra Balenario Camboriu ",
    cidade: "Uma viagem tranquilizante e que foi muito marcante pra mim",
    data: "dezembro, 2025",
    historia: "Fomos ver os animais e passeamos muito e nos amamos <3.",
  },
  {
    nome: "Viagem para Ilha do Mel",
    cidade: "Nossa primeira vez juntos no mar",
    data: "Fevereiro, 2026",
    historia:
      "Foi o dia que um dos meus sonhos com você foram realizados.",
  },
  {
    nome: "Aqui, agora",
    cidade: "Onde a gente está",
    data: "Hoje",
    historia: "Esse é o meu lugar favorito de todos. Não é um endereço, é você.",
  },
]

/* -------------------------------------------------------------------------
   Trecho ATUALIZADO da seção 6 (PLAYLIST) do seu data.ts.
   Substitua o "type Musica" e o array "PLAYLIST" atuais por este.
   ------------------------------------------------------------------------- */

export type Musica = {
  nome: string
  artista: string
  motivo: string
  duracao: string
  arquivo?: string // <-- NOVO: caminho do mp3, ex: "/audio/nossa-primeira-danca.mp3"
}

export const PLAYLIST: Musica[] = [
  {
    nome: "Longe de Você",
    artista: "Charlie Brow JR",
    motivo: "Me deixa com muita saudades e me remete ao curso e toda vez que voltei pensando em você.",
    duracao: "3:24",
    arquivo: "/audio/charlie-brown-jr-longe-de-voce.mp3", // <-- TROQUE pelo caminho real
  },
  {
    nome: "Rubi",
    artista: "Kawe e Andrade",
    motivo: "Me deixa com vontade de chorar e combina muito com a gente.",
    duracao: "3:27",
    arquivo: "/audio/kawe-andrade-rubi.mp3",
  },
  {
    nome: "Orochi",
    artista: "Distante de Tudo",
    motivo: "A maturidade do relacionamente e o crescimento.",
    duracao: "3:43",
    arquivo: "/audio/orochi-distante-de-tudo.mp3",
  },
  {
    nome: "Só Eu e Ela",
    artista: "MC Paiva, MC Tuto, Menor Salim",
    motivo: "Remete ao inicio do nosso relacionamento e nossa paixão infinita",
    duracao: "4:04",
    arquivo: "/audio/mc-paiva-so-eu-e-ela.mp3",
  },
  {
    nome: "Pra Falar De Amor",
    artista: "Quinto Andar",
    motivo: "Me faz lembrar sua fofura e como você é linda minha gatinha.",
    duracao: "4:09",
    arquivo: "/audio/quinto-andar-pra-falar-de-amor.mp3",
  },
]

/* -------------------------------------------------------------------------
   7. LIVRO DE MOTIVOS
   ADICIONE quantos motivos quiser. Cada clique sorteia um.
   ------------------------------------------------------------------------- */
export const MOTIVOS: string[] = [
  "Porque os dias sem você não fazem sentido.",
  "Porque seus olhos me fazem enxergar o mundo.",
  "Porque você sempre ta linda, uma princesa.",
  "Porque você me escuta de verdade e não só espera a sua vez de falar.",
  "Porque você faz eu ser quem sou de verdade.",
  "Porque você fez eu ter melhores escolhas pra minha vida.",
  "Porque sempre quando não estou bem eu sei que você tem o poder de me deixar.",
  "Porque seu sorriso me faz a pessoa mais feliz do mundo.",
  "Porque com você o silêncio é muito bom.",
  "Porque você defende as pessoas que você ama.",
  "Porque você faz as coisas do jeito que eu gosto sem me perguntar.",
  "Porque você me conta suas ideias com os olhos brilhando.",
  "Porque você me faz pensar diferente sobre tudo.",
  "Porque você transforma um dia comum em algo que eu vou lembrar pra sempre.",
  "Porque você me escolheu, e continua escolhendo todo dia <3.",
]

/* -------------------------------------------------------------------------
   8. QUIZ DO CASAL
   TROQUE: as perguntas, as opções e o índice da resposta certa.
   "correta" é a POSIÇÃO da resposta certa, começando em 0.
   ------------------------------------------------------------------------- */
export type Pergunta = {
  pergunta: string
  opcoes: string[]
  correta: number
}

export const QUIZ: Pergunta[] = [
  {
    pergunta: "Onde foi o nosso primeiro encontro?",
    opcoes: ["Na fabrica do pastel", "Na Gebon", "Na rua", "Na Padaria"],
    correta: 0,
  },
  {
    pergunta: "Qual comida eu não como de jeito nenhum?",
    opcoes: ["Cenoura", "Peixe", "Rucula", "Azeitona"],
    correta: 2,
  },
  {
    pergunta: "Se eu pudesse comer apenas uma comida pelo resto da vida, qual seria??",
    opcoes: ["Hambuerguer", "Strogonoff", "Panqueca", "Sanduiche do Subway"],
    correta: 1,
  },
  {
    pergunta: "Qual é o meu maior medo ou maior insegurança na vida?",
    opcoes: ["Falhar profissionalmente ou passar necessidade financeira.", "Altura", "Perder setido na vida", "Ficar sem meu amor"],
    correta: 3,
  },
  {
    pergunta: "Qual apelido eu uso mais pra você?",
    opcoes: ["Amor", "Princesa", "Nenem", "Chefe"],
    correta: 0,
  },
  {
    pergunta: "Qual é a minha linguagem do amor principal (como eu me sinto mais amada/o)?",
    opcoes: ["Palavras de afirmação (elogios, incentivos e mensagens carinhosas).", "Tempo de qualidade (atenção total, conversas e momentos a dois).", "Atos de serviço (ajuda prática no dia a dia, café na cama, etc.).", "Toque físico (abraços, cafuné, andar de mãos dadas)."],
    correta: 1,
  },
]

/* -------------------------------------------------------------------------
   9. MENSAGENS FINAIS DO QUIZ
   TROQUE: as mensagens por faixa de acerto.
   ------------------------------------------------------------------------- */
export const RESULTADOS_QUIZ = {
  alto: "Você me conhece melhor do que eu hihihi. Te amooooo.",
  medio: "passou de ano.",
  baixo: "Acho que não me ama.",
}
