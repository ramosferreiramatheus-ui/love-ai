"use client"

import { useState } from "react"
import { Heart, Gift, MessageCircle, Sparkles, ArrowRight, Check, ChevronLeft, Star, Clock, TrendingUp, Users, BarChart3 } from "lucide-react"

type RelationshipStatus = "namorando" | "casado" | "solteiro" | null
type QuizStep = "welcome" | "personalData" | "status" | "crushQuestion" | "questions" | "diagnosis" | "whyLoveAI" | "partnerData" | "partnerQuestions" | "partnerDiagnosis" | "pitch"
type Sexuality = "heterosexual" | "homosexual" | "bisexual" | null
type PartnerPreference = "homem" | "mulher" | "tanto-faz" | null

interface PersonalData {
  name: string
  sexuality: Sexuality
  partnerPreference: PartnerPreference
  age: string
  email: string
}

interface PartnerData {
  name: string
  sexuality: Sexuality
  age: string
}

interface QuizAnswers {
  status: RelationshipStatus
  personalData: PersonalData
  hasCrush?: boolean
  crushName?: string
  partnerData?: PartnerData
  challenge1?: string
  challenge2?: string
  challenge3?: string
  partnerChallenge1?: string
  partnerChallenge2?: string
  partnerChallenge3?: string
}

interface Diagnosis {
  profile: string
  challenges: string[]
  opportunities: string[]
}

interface CoupleDiagnosis {
  userDiagnosis: Diagnosis
  partnerDiagnosis: Diagnosis
  coupleDiagnosis: {
    compatibility: string
    strengths: string[]
    areasToImprove: string[]
  }
}

const testimonials = [
  {
    name: "Carolina M.",
    age: 28,
    status: "Namorando há 3 anos",
    text: "O LoveAI me ajudou a encontrar presentes perfeitos e a manter a chama acesa no relacionamento. Meu namorado ficou impressionado!",
    rating: 5
  },
  {
    name: "Rafael S.",
    age: 35,
    status: "Casado há 7 anos",
    text: "Depois de anos juntos, estava difícil surpreender minha esposa. Com o LoveAI, consegui renovar o romance e criar momentos inesquecíveis.",
    rating: 5
  },
  {
    name: "Juliana P.",
    age: 24,
    status: "Solteira",
    text: "Estava insegura para conversar com pessoas novas. O LoveAI me deu confiança e em 2 meses conheci alguém incrível!",
    rating: 5
  },
  {
    name: "Marcos L.",
    age: 31,
    status: "Namorando há 1 ano",
    text: "As sugestões de mensagens são perfeitas! Minha namorada sempre comenta como sou romântico. O segredo é o LoveAI 😄",
    rating: 5
  }
]

export default function Home() {
  const [step, setStep] = useState<QuizStep>("welcome")
  const [answers, setAnswers] = useState<QuizAnswers>({
    status: null,
    personalData: {
      name: "",
      sexuality: null,
      partnerPreference: null,
      age: "",
      email: ""
    }
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [coupleDiagnosis, setCoupleDiagnosis] = useState<CoupleDiagnosis | null>(null)

  // Perguntas adaptativas baseadas no status
  const getQuestions = () => {
    if (answers.status === "solteiro") {
      return [
        {
          id: "challenge1",
          question: "Qual é o seu maior desafio para encontrar alguém especial?",
          options: [
            "Timidez e dificuldade para iniciar conversas",
            "Não sei onde conhecer pessoas interessantes",
            "Dificuldade em manter conversas interessantes",
            "Insegurança sobre mim mesmo(a)",
          ],
        },
        {
          id: "challenge2",
          question: "O que você busca em um relacionamento?",
          options: [
            "Conexão emocional profunda",
            "Companheirismo e diversão",
            "Estabilidade e compromisso",
            "Paixão e romance intenso",
          ],
        },
        {
          id: "challenge3",
          question: "Como você se sente em relação ao amor atualmente?",
          options: [
            "Esperançoso(a) e otimista",
            "Frustrado(a) com experiências passadas",
            "Ansioso(a) para encontrar alguém",
            "Tranquilo(a) e sem pressa",
          ],
        },
      ]
    } else if (answers.status === "namorando") {
      return [
        {
          id: "challenge1",
          question: "Qual é o principal desafio no seu relacionamento?",
          options: [
            "Comunicação e diálogo",
            "Falta de tempo juntos",
            "Rotina e monotonia",
            "Diferenças de opinião",
          ],
        },
        {
          id: "challenge2",
          question: "Como você demonstra amor ao seu parceiro(a)?",
          options: [
            "Palavras de afirmação",
            "Tempo de qualidade",
            "Presentes e surpresas",
            "Atos de serviço",
          ],
        },
        {
          id: "challenge3",
          question: "O que você gostaria de melhorar no relacionamento?",
          options: [
            "Mais romance e surpresas",
            "Comunicação mais profunda",
            "Resolver conflitos melhor",
            "Manter a chama acesa",
          ],
        },
      ]
    } else {
      // casado
      return [
        {
          id: "challenge1",
          question: "Qual é o maior desafio no seu casamento?",
          options: [
            "Equilibrar trabalho e vida familiar",
            "Manter o romance vivo",
            "Comunicação efetiva",
            "Lidar com responsabilidades",
          ],
        },
        {
          id: "challenge2",
          question: "Como vocês celebram momentos especiais?",
          options: [
            "Jantares românticos",
            "Viagens e aventuras",
            "Presentes significativos",
            "Tempo de qualidade em casa",
          ],
        },
        {
          id: "challenge3",
          question: "O que fortalece seu casamento?",
          options: [
            "Cumplicidade e amizade",
            "Respeito mútuo",
            "Surpresas e gestos de carinho",
            "Diálogo aberto e honesto",
          ],
        },
      ]
    }
  }

  // Perguntas sobre o parceiro/crush - focadas na personalidade
  const getPartnerQuestions = () => {
    const partnerName = answers.partnerData?.name || answers.crushName || "essa pessoa"
    const isCrush = answers.status === "solteiro" && answers.hasCrush
    
    return [
      {
        id: "partnerChallenge1",
        question: `Como você descreveria a personalidade de ${partnerName}?`,
        options: [
          "Extrovertido(a) e sociável - adora estar com pessoas",
          "Introvertido(a) e reflexivo(a) - prefere momentos tranquilos",
          "Aventureiro(a) e espontâneo(a) - sempre pronto para novidades",
          "Calmo(a) e equilibrado(a) - valoriza estabilidade e rotina",
        ],
      },
      {
        id: "partnerChallenge2",
        question: `O que mais chama sua atenção em ${partnerName}?`,
        options: [
          "O senso de humor e capacidade de me fazer rir",
          "A inteligência e forma de ver o mundo",
          "A gentileza e empatia com os outros",
          "A confiança e determinação",
        ],
      },
      {
        id: "partnerChallenge3",
        question: isCrush 
          ? `Como ${partnerName} costuma reagir em situações sociais?`
          : `O que ${partnerName} mais valoriza em um relacionamento?`,
        options: isCrush ? [
          "É o centro das atenções e adora conversar",
          "Prefere conversas mais íntimas com poucas pessoas",
          "Adapta-se facilmente a qualquer ambiente",
          "É mais reservado(a) mas acolhedor(a)",
        ] : [
          "Confiança e honestidade acima de tudo",
          "Diversão e aventuras compartilhadas",
          "Apoio emocional e compreensão",
          "Estabilidade e segurança no relacionamento",
        ],
      },
    ]
  }

  // Gerar diagnóstico baseado nas respostas
  const generateDiagnosis = () => {
    const profiles: Record<RelationshipStatus, string> = {
      solteiro: "Explorador do Amor",
      namorando: "Cultivador de Conexões",
      casado: "Guardião do Romance",
    }

    const challengesMap: Record<RelationshipStatus, string[]> = {
      solteiro: [
        "Você está em busca de conexões autênticas",
        "Precisa de confiança para dar o primeiro passo",
        "Busca equilíbrio entre expectativas e realidade",
      ],
      namorando: [
        "A rotina pode estar afetando a intensidade do relacionamento",
        "Comunicação é a chave para resolver desafios",
        "Pequenos gestos fazem grande diferença",
      ],
      casado: [
        "Manter o romance vivo requer intenção diária",
        "O equilíbrio entre responsabilidades e romance é essencial",
        "Surpresas renovam a conexão emocional",
      ],
    }

    const opportunitiesMap: Record<RelationshipStatus, string[]> = {
      solteiro: [
        "Desenvolva habilidades de comunicação com IA",
        "Receba sugestões de presentes para primeiros encontros",
        "Aprenda a criar conversas memoráveis",
      ],
      namorando: [
        "Sugestões personalizadas de presentes para surpreender",
        "Mensagens românticas criadas por IA",
        "Ideias de encontros únicos e especiais",
      ],
      casado: [
        "Presentes que celebram sua história juntos",
        "Mensagens que reacendem a paixão",
        "Planejamento de surpresas inesquecíveis",
      ],
    }

    setDiagnosis({
      profile: profiles[answers.status!],
      challenges: challengesMap[answers.status!],
      opportunities: opportunitiesMap[answers.status!],
    })
  }

  // Gerar diagnóstico do casal/crush
  const generateCoupleDiagnosis = () => {
    const partnerProfiles = ["Comunicador Empático", "Romântico Atencioso", "Companheiro Leal", "Aventureiro Carismático"]
    const randomPartnerProfile = partnerProfiles[Math.floor(Math.random() * partnerProfiles.length)]

    const isCrush = answers.status === "solteiro" && answers.hasCrush

    const partnerDiagnosis: Diagnosis = {
      profile: randomPartnerProfile,
      challenges: isCrush ? [
        "Pode ter um círculo social amplo que valoriza muito",
        "Busca autenticidade nas conexões",
        "Aprecia pessoas que demonstram interesse genuíno",
      ] : [
        "Pode ter dificuldade em expressar necessidades emocionais",
        "Busca equilíbrio entre independência e intimidade",
        "Valoriza gestos de carinho e atenção",
      ],
      opportunities: isCrush ? [
        "Responde bem a conversas interessantes e autênticas",
        "Aprecia quando alguém demonstra interesse nos seus gostos",
        "Valoriza gestos criativos e espontâneos",
      ] : [
        "Aprecia surpresas e demonstrações de afeto",
        "Responde bem a comunicação clara e honesta",
        "Valoriza tempo de qualidade juntos",
      ],
    }

    const coupleDiag = {
      compatibility: isCrush ? "Potencial Promissor" : "Alta Compatibilidade",
      strengths: isCrush ? [
        "Você demonstra interesse genuíno na pessoa",
        "Há admiração mútua que pode se desenvolver",
        "Vocês compartilham valores que podem criar conexão",
      ] : [
        "Vocês compartilham valores fundamentais sobre relacionamentos",
        "Há complementaridade nas formas de demonstrar amor",
        "Ambos estão dispostos a investir no relacionamento",
      ],
      areasToImprove: isCrush ? [
        "Criar oportunidades naturais de aproximação",
        "Demonstrar interesse sem pressão ou expectativas",
        "Construir confiança através de conversas autênticas",
      ] : [
        "Comunicação sobre expectativas pode ser mais clara",
        "Criar rituais de conexão diária fortalecerá o vínculo",
        "Equilibrar tempo individual e tempo juntos",
      ],
    }

    setCoupleDiagnosis({
      userDiagnosis: diagnosis!,
      partnerDiagnosis,
      coupleDiagnosis: coupleDiag,
    })
  }

  const handleStatusSelect = (status: RelationshipStatus) => {
    setAnswers({ ...answers, status })
    if (status === "solteiro") {
      setStep("crushQuestion")
    } else {
      setStep("questions")
    }
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer })
    
    const questions = getQuestions()
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateDiagnosis()
      setStep("diagnosis")
    }
  }

  const handlePartnerAnswerSelect = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer })
    
    const questions = getPartnerQuestions()
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateCoupleDiagnosis()
      setStep("partnerDiagnosis")
    }
  }

  const handleBack = () => {
    if (step === "personalData") {
      setStep("welcome")
    } else if (step === "status") {
      setStep("personalData")
    } else if (step === "crushQuestion") {
      setStep("status")
    } else if (step === "questions" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (step === "questions" && currentQuestion === 0) {
      if (answers.status === "solteiro") {
        setStep("crushQuestion")
      } else {
        setStep("status")
      }
      setCurrentQuestion(0)
    } else if (step === "diagnosis") {
      setStep("questions")
      setCurrentQuestion(getQuestions().length - 1)
    } else if (step === "whyLoveAI") {
      setStep("diagnosis")
    } else if (step === "partnerData") {
      setStep("whyLoveAI")
    } else if (step === "partnerQuestions" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (step === "partnerQuestions" && currentQuestion === 0) {
      setStep("partnerData")
      setCurrentQuestion(0)
    } else if (step === "partnerDiagnosis") {
      setStep("partnerQuestions")
      setCurrentQuestion(getPartnerQuestions().length - 1)
    } else if (step === "pitch") {
      if ((answers.status !== "solteiro" || answers.hasCrush) && coupleDiagnosis) {
        setStep("partnerDiagnosis")
      } else {
        setStep("whyLoveAI")
      }
    }
  }

  // Tela de boas-vindas
  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-6 rounded-full shadow-2xl">
                <Heart className="w-16 h-16 text-white" fill="white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Love AI
            </h1>
            <p className="text-lg text-gray-600">
              Transforme seus relacionamentos com inteligência artificial
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Diagnóstico Personalizado</h3>
                  <p className="text-sm text-gray-600">Entenda seu perfil amoroso em minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Presentes Perfeitos</h3>
                  <p className="text-sm text-gray-600">IA sugere presentes que emocionam</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Mensagens Especiais</h3>
                  <p className="text-sm text-gray-600">Crie conversas memoráveis</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("personalData")}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Começar Quiz Gratuito
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-gray-500">
              3 minutos • 100% gratuito • Diagnóstico completo
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Coleta de dados pessoais
  if (step === "personalData") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              Vamos nos conhecer melhor
            </h2>
            <p className="text-gray-600">
              Essas informações nos ajudam a personalizar sua experiência
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome
              </label>
              <input
                type="text"
                value={answers.personalData.name}
                onChange={(e) => setAnswers({
                  ...answers,
                  personalData: { ...answers.personalData, name: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Como você gostaria de ser chamado(a)?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua idade
              </label>
              <input
                type="number"
                value={answers.personalData.age}
                onChange={(e) => setAnswers({
                  ...answers,
                  personalData: { ...answers.personalData, age: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Sua idade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu email
              </label>
              <input
                type="email"
                value={answers.personalData.email}
                onChange={(e) => setAnswers({
                  ...answers,
                  personalData: { ...answers.personalData, email: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua orientação sexual
              </label>
              <div className="space-y-2">
                {[
                  { value: "heterosexual", label: "Heterossexual" },
                  { value: "homosexual", label: "Homossexual" },
                  { value: "bisexual", label: "Bissexual" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({
                      ...answers,
                      personalData: { ...answers.personalData, sexuality: option.value as Sexuality }
                    })}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.personalData.sexuality === option.value
                        ? "border-pink-400 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Você prefere se relacionar com
              </label>
              <div className="space-y-2">
                {[
                  { value: "homem", label: "Homem" },
                  { value: "mulher", label: "Mulher" },
                  { value: "tanto-faz", label: "Tanto faz" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({
                      ...answers,
                      personalData: { ...answers.personalData, partnerPreference: option.value as PartnerPreference }
                    })}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.personalData.partnerPreference === option.value
                        ? "border-pink-400 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (answers.personalData.name && answers.personalData.age && 
                    answers.personalData.email && answers.personalData.sexuality && 
                    answers.personalData.partnerPreference) {
                  setStep("status")
                }
              }}
              disabled={!answers.personalData.name || !answers.personalData.age || 
                       !answers.personalData.email || !answers.personalData.sexuality || 
                       !answers.personalData.partnerPreference}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Seleção de status
  if (step === "status") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              Olá, {answers.personalData.name}! 👋
            </h2>
            <p className="text-gray-600">
              Qual é a sua situação atual?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleStatusSelect("solteiro")}
              className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-pink-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Solteiro(a)</h3>
                  <p className="text-sm text-gray-600">Em busca de alguém especial</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStatusSelect("namorando")}
              className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-rose-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Namorando</h3>
                  <p className="text-sm text-gray-600">Cultivando um relacionamento</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStatusSelect("casado")}
              className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-red-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-rose-500 to-red-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Casado(a)</h3>
                  <p className="text-sm text-gray-600">Mantendo o romance vivo</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Pergunta sobre crush (apenas para solteiros)
  if (step === "crushQuestion") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-full shadow-xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Uma pergunta importante...
            </h2>
            <p className="text-gray-600">
              Tem alguém especial que você gostaria de conquistar?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setAnswers({ ...answers, hasCrush: true })
                setStep("questions")
              }}
              className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-pink-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Sim! Tem alguém especial 💕</h3>
                  <p className="text-sm text-gray-600">Vou te ajudar a conquistar essa pessoa</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setAnswers({ ...answers, hasCrush: false })
                setStep("questions")
              }}
              className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-purple-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Ainda não, estou explorando</h3>
                  <p className="text-sm text-gray-600">Vou te ajudar a encontrar alguém incrível</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Perguntas do quiz
  if (step === "questions") {
    const questions = getQuestions()
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, option)}
                  className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-pink-300"
                >
                  <p className="text-gray-700">{option}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Diagnóstico
  if (step === "diagnosis" && diagnosis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-4 rounded-full shadow-xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Seu Diagnóstico Está Pronto!
            </h2>
            <p className="text-gray-600">
              Análise personalizada baseada nas suas respostas
            </p>
          </div>

          <div className="space-y-4">
            {/* Perfil Amoroso */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">Seu Perfil Amoroso</h3>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text">
                  {diagnosis.profile}
                </p>
              </div>
            </div>

            {/* Desafios Identificados */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-rose-500" />
                <h3 className="text-xl font-bold text-gray-800">Desafios Identificados</h3>
              </div>
              <div className="space-y-3">
                {diagnosis.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 bg-rose-50 rounded-xl p-4">
                    <div className="bg-rose-200 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-rose-600 rounded-full" />
                    </div>
                    <p className="text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Oportunidades */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-800">Como Podemos Ajudar</h3>
              </div>
              <div className="space-y-3">
                {diagnosis.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{opportunity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("whyLoveAI")}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Por que você precisa do LoveAI (com gráficos)
  if (step === "whyLoveAI") {
    const isSingle = answers.status === "solteiro"
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Por que você precisa do LoveAI?
            </h2>
            <p className="text-lg text-gray-600">
              Dados comprovados de transformação
            </p>
          </div>

          <div className="space-y-4">
            {/* Gráfico de comparação visual */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">Comparação Visual</h3>
              </div>

              {isSingle ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Sem LoveAI</span>
                      <span className="text-sm font-bold text-red-600">8-12 meses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{ width: '100%' }}>
                        <div className="h-full flex items-center justify-center text-white text-xs font-semibold">
                          100% do tempo
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Com LoveAI</span>
                      <span className="text-sm font-bold text-green-600">2-4 meses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '33%' }}>
                        <div className="h-full flex items-center justify-center text-white text-xs font-semibold">
                          33% do tempo
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-300">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-lg">
                      <TrendingUp className="w-6 h-6" />
                      <span>Você economiza até 67% do tempo!</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Sem LoveAI</span>
                      <span className="text-sm font-bold text-red-600">6-9 meses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{ width: '100%' }}>
                        <div className="h-full flex items-center justify-center text-white text-xs font-semibold">
                          100% do tempo
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Com LoveAI</span>
                      <span className="text-sm font-bold text-green-600">4-8 semanas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '25%' }}>
                        <div className="h-full flex items-center justify-center text-white text-xs font-semibold">
                          25% do tempo
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-300">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-lg">
                      <TrendingUp className="w-6 h-6" />
                      <span>Resultados 4x mais rápidos!</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas de tempo */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">Resultados Comprovados</h3>
              </div>

              {isSingle ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Sem LoveAI</span>
                      <span className="text-3xl font-bold text-red-600">8-12 meses</span>
                    </div>
                    <p className="text-sm text-gray-600">Tempo médio para encontrar um relacionamento sério</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Com LoveAI</span>
                      <span className="text-3xl font-bold text-green-600">2-4 meses</span>
                    </div>
                    <p className="text-sm text-gray-600">Melhore suas habilidades e encontre alguém especial 3x mais rápido</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Sem LoveAI</span>
                      <span className="text-3xl font-bold text-red-600">6-9 meses</span>
                    </div>
                    <p className="text-sm text-gray-600">Tempo médio para melhorar significativamente o relacionamento</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Com LoveAI</span>
                      <span className="text-3xl font-bold text-green-600">4-8 semanas</span>
                    </div>
                    <p className="text-sm text-gray-600">Veja mudanças reais na conexão e intimidade do casal</p>
                  </div>
                </div>
              )}
            </div>

            {/* Por que funciona */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-rose-500" />
                <h3 className="text-xl font-bold text-gray-800">Por que o LoveAI funciona?</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Personalização com IA</h4>
                    <p className="text-sm text-gray-600">Sugestões adaptadas ao seu perfil e situação específica</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 rounded-full p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Ação Imediata</h4>
                    <p className="text-sm text-gray-600">Ideias práticas que você pode aplicar hoje mesmo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Consistência</h4>
                    <p className="text-sm text-gray-600">Pequenas ações diárias que geram grandes transformações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (answers.status !== "solteiro" || answers.hasCrush) {
                setStep("partnerData")
              } else {
                setStep("pitch")
              }
            }}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {(answers.status !== "solteiro" || answers.hasCrush) ? "Continuar para Análise do Casal" : "Ver Planos"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Coleta de dados do parceiro/crush
  if (step === "partnerData") {
    const isCrush = answers.status === "solteiro" && answers.hasCrush
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-full shadow-xl">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {isCrush ? "Conte sobre essa pessoa especial" : "Agora sobre seu/sua parceiro(a)"}
            </h2>
            <p className="text-gray-600">
              {isCrush ? "Vamos entender melhor quem você quer conquistar" : "Vamos entender melhor a dinâmica do casal"}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isCrush ? "Nome dessa pessoa" : "Nome do/da parceiro(a)"}
              </label>
              <input
                type="text"
                value={isCrush ? (answers.crushName || "") : (answers.partnerData?.name || "")}
                onChange={(e) => {
                  if (isCrush) {
                    setAnswers({ ...answers, crushName: e.target.value })
                  } else {
                    setAnswers({
                      ...answers,
                      partnerData: { ...answers.partnerData, name: e.target.value } as PartnerData
                    })
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder={isCrush ? "Nome da pessoa" : "Nome do/da parceiro(a)"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isCrush ? "Idade dessa pessoa" : "Idade do/da parceiro(a)"}
              </label>
              <input
                type="number"
                value={answers.partnerData?.age || ""}
                onChange={(e) => setAnswers({
                  ...answers,
                  partnerData: { ...answers.partnerData, age: e.target.value } as PartnerData
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Idade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isCrush ? "Orientação sexual dessa pessoa" : "Orientação sexual do/da parceiro(a)"}
              </label>
              <div className="space-y-2">
                {[
                  { value: "heterosexual", label: "Heterossexual" },
                  { value: "homosexual", label: "Homossexual" },
                  { value: "bisexual", label: "Bissexual" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({
                      ...answers,
                      partnerData: { ...answers.partnerData, sexuality: option.value as Sexuality } as PartnerData
                    })}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.partnerData?.sexuality === option.value
                        ? "border-pink-400 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                const hasName = isCrush ? answers.crushName : answers.partnerData?.name
                if (hasName && answers.partnerData?.age && answers.partnerData?.sexuality) {
                  setCurrentQuestion(0)
                  setStep("partnerQuestions")
                }
              }}
              disabled={!(isCrush ? answers.crushName : answers.partnerData?.name) || !answers.partnerData?.age || !answers.partnerData?.sexuality}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Perguntas sobre o parceiro/crush
  if (step === "partnerQuestions") {
    const questions = getPartnerQuestions()
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handlePartnerAnswerSelect(currentQ.id, option)}
                  className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-pink-300"
                >
                  <p className="text-gray-700">{option}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Diagnóstico do casal/crush
  if (step === "partnerDiagnosis" && coupleDiagnosis) {
    const isCrush = answers.status === "solteiro" && answers.hasCrush
    const partnerName = answers.crushName || answers.partnerData?.name || "essa pessoa"
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-4 rounded-full shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {isCrush ? "Análise de Compatibilidade" : "Análise Completa do Casal"}
            </h2>
            <p className="text-gray-600">
              {isCrush ? "Entenda como conquistar essa pessoa especial" : "Entenda a dinâmica do relacionamento de vocês"}
            </p>
          </div>

          <div className="space-y-4">
            {/* Perfil do Parceiro/Crush */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-rose-500" />
                <h3 className="text-xl font-bold text-gray-800">Perfil de {partnerName}</h3>
              </div>
              <div className="bg-gradient-to-r from-rose-100 to-red-100 rounded-2xl p-6">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text">
                  {coupleDiagnosis.partnerDiagnosis.profile}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                {coupleDiagnosis.partnerDiagnosis.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-rose-200 rounded-full p-1 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-rose-600 rounded-full" />
                    </div>
                    <p>{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibilidade */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">{isCrush ? "Compatibilidade" : "Compatibilidade do Casal"}</h3>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-4">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                  {coupleDiagnosis.coupleDiagnosis.compatibility}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    {isCrush ? "Pontos Fortes para Conquistar" : "Pontos Fortes do Casal"}
                  </h4>
                  <div className="space-y-2">
                    {coupleDiagnosis.coupleDiagnosis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-2 bg-green-50 rounded-xl p-3">
                        <div className="bg-green-200 rounded-full p-1 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    {isCrush ? "Estratégias de Aproximação" : "Áreas para Melhorar"}
                  </h4>
                  <div className="space-y-2">
                    {coupleDiagnosis.coupleDiagnosis.areasToImprove.map((area, index) => (
                      <div key={index} className="flex items-start gap-2 bg-orange-50 rounded-xl p-3">
                        <div className="bg-orange-200 rounded-full p-1 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("pitch")}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Ver Como o LoveAI Pode Ajudar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Pitch de valor e assinatura
  if (step === "pitch") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Transforme Seus Relacionamentos
            </h2>
            <p className="text-lg text-gray-600">
              Acesso ilimitado a todas as funcionalidades
            </p>
          </div>

          {/* Funcionalidades */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">O que você terá acesso:</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-lg flex-shrink-0">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sugestões de Presentes com IA</h4>
                  <p className="text-sm text-gray-600">Presentes personalizados com links diretos para compra</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-rose-500 to-red-500 p-2 rounded-lg flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Assistente de Mensagens</h4>
                  <p className="text-sm text-gray-600">IA cria mensagens românticas e especiais para qualquer ocasião</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ideias de Encontros</h4>
                  <p className="text-sm text-gray-600">Sugestões criativas para surpreender e criar momentos inesquecíveis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2 rounded-lg flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Dicas Personalizadas</h4>
                  <p className="text-sm text-gray-600">Conselhos baseados no seu perfil e situação específica</p>
                </div>
              </div>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
              <h3 className="text-xl font-bold text-gray-800">O que nossos usuários dizem</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 space-y-3">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-600">{testimonial.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Plano Mensal */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-gray-200 hover:border-pink-300 transition-all duration-300">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Plano Mensal</h3>
                  <p className="text-sm text-gray-600">Cancele quando quiser</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-gray-800">R$ 14,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Começar Agora
                </button>
              </div>
            </div>

            {/* Plano Anual */}
            <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl p-6 shadow-2xl border-2 border-pink-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                ECONOMIZE 44%
              </div>
              <div className="space-y-4 relative z-10">
                <div>
                  <h3 className="text-lg font-semibold text-white">Plano Anual</h3>
                  <p className="text-sm text-pink-100">Melhor custo-benefício</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-white">R$ 99,90</span>
                  <span className="text-pink-100">/ano</span>
                  <p className="text-sm text-pink-100 mt-1">R$ 8,32/mês</p>
                </div>
                <button className="w-full bg-white text-pink-600 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ✓ Acesso imediato a todas as funcionalidades
            </p>
            <p className="text-sm text-gray-600">
              ✓ Cancele quando quiser, sem compromisso
            </p>
            <p className="text-sm text-gray-600">
              ✓ Suporte prioritário via chat
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
