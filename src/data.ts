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
  nomeDela: "Amor", // <-- TROQUE pelo nome dela
  nomeDele: "Eu", // <-- TROQUE pelo seu nome
  dataInicio: "2024-09-17T07:00:00", // <-- TROQUE pela data em que vocês começaram
  fraseAbertura: "Fiz esse cantinho para guardar a gente.", // <-- frase da tela inicial
  emailDela: "oliveira.souza.fernanda@escola.pr.gov.br",
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
    imagem: "/memoria-primeiro-encontro.png", // <-- TROQUE pela foto real
    titulo: "Nosso primeiro encontro",
    data: "14 de março, 2023",
    texto:
      "Eu tinha ensaiado umas três frases no caminho e esqueci todas quando você chegou. A gente ficou até fecharem o lugar e eu voltei pra casa sabendo que ia querer isso de novo.",
  },
  {
    imagem: "/memoria-praia.png",
    titulo: "Aquele fim de semana na praia",
    data: "22 de julho, 2023",
    texto:
      "Você dormiu no carro com a cabeça no meu ombro e eu fiquei sem mexer o braço por quarenta minutos. Valeu cada formigamento.",
  },
  {
    imagem: "/memoria-cozinha.png",
    titulo: "A massa que deu errado",
    data: "9 de setembro, 2023",
    texto:
      "Ficou salgada, queimada e a gente comeu tudo rindo. Até hoje é o melhor jantar que eu já fiz.",
  },
  {
    imagem: "/memoria-aniversario.png",
    titulo: "Seu aniversário",
    data: "3 de dezembro, 2023",
    texto:
      "Você chorou com o bolo torto e disse que era o mais bonito que já tinha visto. Eu guardei essa cara na memória.",
  },
  {
    imagem: "/memoria-chuva.png",
    titulo: "A chuva que nos pegou",
    data: "18 de fevereiro, 2024",
    texto:
      "Corremos duas quadras rindo, encharcados, sem lugar pra ir. Naquele momento eu não queria estar em nenhum outro.",
  },
  {
    imagem: "/memoria-mirante.png",
    titulo: "O mirante no fim da tarde",
    data: "5 de maio, 2024",
    texto:
      "A gente ficou em silêncio um tempão olhando a cidade. Foi o silêncio mais confortável da minha vida.",
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
    nome: "O café da esquina",
    cidade: "Onde tudo começou",
    data: "Março, 2023",
    historia:
      "Foi ali que a gente se viu pela primeira vez fora da tela. Eu cheguei quinze minutos antes só pra não me atrasar.",
  },
  {
    nome: "A praia do fim da estrada",
    cidade: "Nosso primeiro fim de semana",
    data: "Julho, 2023",
    historia:
      "Três dias, um guarda-sol furado e a descoberta de que a gente funciona bem em silêncio também.",
  },
  {
    nome: "O apartamento antigo",
    cidade: "A primeira cozinha nossa",
    data: "Setembro, 2023",
    historia:
      "Foi onde a gente aprendeu a dividir gaveta, controle da TV e o lado direito da cama.",
  },
  {
    nome: "O mirante da serra",
    cidade: "O lugar do silêncio bom",
    data: "Maio, 2024",
    historia: "Subimos reclamando da ladeira e descemos quietos. Voltamos outras quatro vezes desde então.",
  },
  {
    nome: "Aqui, agora",
    cidade: "Onde a gente está",
    data: "Hoje",
    historia: "Esse é o meu lugar favorito de todos. Não é um endereço, é você.",
  },
]

/* -------------------------------------------------------------------------
   6. PLAYLIST DO CASAL
   TROQUE: as músicas e o motivo de cada uma ser especial.
   ------------------------------------------------------------------------- */
export type Musica = {
  nome: string
  artista: string
  motivo: string
  duracao: string
}

export const PLAYLIST: Musica[] = [
  {
    nome: "Nossa primeira dança",
    artista: "Coloque o artista",
    motivo: "Tocou naquela festa e você me puxou pra dançar mesmo eu dizendo que não sabia.",
    duracao: "3:42",
  },
  {
    nome: "A do carro",
    artista: "Coloque o artista",
    motivo: "A gente canta errado no volume máximo em toda viagem. Já é tradição.",
    duracao: "4:05",
  },
  {
    nome: "A da madrugada",
    artista: "Coloque o artista",
    motivo: "Você me mandou às 2 da manhã dizendo 'essa é sobre a gente'. E era.",
    duracao: "3:18",
  },
  {
    nome: "A que eu escuto quando você viaja",
    artista: "Coloque o artista",
    motivo: "Serve pra matar a saudade e pra piorar ela, dependendo do dia.",
    duracao: "4:31",
  },
  {
    nome: "A do domingo de manhã",
    artista: "Coloque o artista",
    motivo: "Café, janela aberta, você de cabelo bagunçado. É a trilha sonora disso.",
    duracao: "2:57",
  },
]

/* -------------------------------------------------------------------------
   7. LIVRO DE MOTIVOS
   ADICIONE quantos motivos quiser. Cada clique sorteia um.
   ------------------------------------------------------------------------- */
export const MOTIVOS: string[] = [
  "Porque você ri antes falar qualquer coisa pra mim.",
  "Porque seus olhos me fazem enxergar o mundo.",
  "Porque você sempre ta linda, e isso não é justo.",
  "Porque você me escuta de verdade e não só espera a sua vez de falar.",
  "Porque você me faz eu ser quem sou de verdade.",
  "Porque você me fez eu ser uma pessoa com melhores escolhas pra minha vida.",
  "Porque sempre quando não estou bem eu sei que você tem o poder de me deixar.",
  "Porque seu sorriso me faz a pessoa mais feliz do mundo.",
  "Porque com você o silêncio é muito bom.",
  "Porque você defende as pessoas que você ama com uma força que me impressiona.",
  "Porque você faz as coisas do jeito que eu gosto sem me perguntar.",
  "Porque você me conta das suas ideias com os olhos brilhando.",
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
  medio: "Acertou o basico.",
  baixo: "Acho que não me ama",
}
