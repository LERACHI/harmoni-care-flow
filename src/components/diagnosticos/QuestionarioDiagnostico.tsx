import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Imports do Firebase mantidos, mas a lógica de inicialização é ajustada para SIMULAR no localhost.
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Definições de Tipos (Mínimas para este ambiente)
interface DoshaScores {
  Vatta: number;
  Pitta: number;
  Kapha: number;
}

interface GunaScores {
  Sattwa: number;
  Rajas: number;
  Tamas: number;
}

interface Question {
  id: string;
  text: string;
  options: { [key: string]: string };
}

interface PersonalData {
  nome: string;
  telefone: string;
  idade: string;
  sintoma: string;
  tempoDesequilibrio: string;
  gestante: 'Sim' | 'Não' | '';
  indiceMassa: 'Magreza' | 'Normal' | 'Sobrepeso' | 'Obeso' | 'Obeso mórbido' | '';
}

// ----------------------------------------------------------------------
// 1. DADOS DAS PERGUNTAS
// ----------------------------------------------------------------------

const doshaQuestions: Question[] = [
  { id: 'd1', text: '01) Reação a medicamentos', options: { Vatta: 'Ação rápida, efeitos colaterais.', Pitta: 'Ação mediana.', Kapha: 'Ação lenta, alta dosagem.' } },
  { id: 'd2', text: '02) Característica da Dor', options: { Vatta: 'Intensa ou cólica incômoda, latejante e migratória para outras partes do corpo.', Pitta: 'Acompanhada de ardência e queimação.', Kapha: 'Pouco intensa, constante e pesada.' } },
  { id: 'd3', text: '03) Coloração da pele', options: { Vatta: 'Acinzentada ou pálida apagada.Desidratada.', Pitta: 'Avermelhada ou preta.', Kapha: 'Esbranquiçada, tendendo à palidez.' } },
  { id: 'd4', text: '04) Apetite', options: { Vatta: 'Irregular, dificuldade digestiva.', Pitta: 'Excessivo, com queimação.', Kapha: 'Constante, digestão lenta.' } },
  { id: 'd5', text: '05) Arrotos e soluços', options: { Vatta: 'Constantes e com aperto no estômago.', Pitta: 'Refluxo salgado ou ácido.', Kapha: 'Refluxo adocicado ou com muco(clara de ovo).' } },
  { id: 'd6', text: '06) Sede', options: { Vatta: 'Intensa.', Pitta: 'Excessiva.', Kapha: 'Excessiva.' } },
  { id: 'd7', text: '07) Salivação', options: { Vatta: 'Boca seca.', Pitta: 'Intensa.', Kapha: 'Excessiva.' } },
  { id: 'd8', text: '08) Sente atração por coisas', options: { Vatta: 'Quentes, repelindo as frias.', Pitta: 'Frias.', Kapha: 'Quentes.' } },
  { id: 'd9', text: '09) Suor', options: { Vatta: 'Frio e líquido.', Pitta: 'Excessivo e quente.', Kapha: 'Moderado, frio e pegajoso.' } },
  { id: 'd10', text: '10) Garganta', options: { Vatta: 'Áspera, suaviza quando ingere água.', Pitta: 'Inflamada e dolorida, irrita quando ingere água.', Kapha: 'Inchada, às vezes com muco.' } },
  { id: 'd11', text: '11) Voz', options: { Vatta: 'Fraca, trêmula e rouca.', Pitta: 'Clara, penetrante e forte.', Kapha: 'Profunda, lenta e melodiosa.' } },
  { id: 'd12', text: '12) Sono', options: { Vatta: 'Leve, interrompido, sonolento.', Pitta: 'Moderado, com sonhos vívidos.', Kapha: 'Profundo, prolongado e pesado.' } },
  { id: 'd13', text: '13) Sabor da boca', options: { Vatta: 'Adstringente.', Pitta: 'Amarga e ardida.', Kapha: 'Adocicada.' } },
  { id: 'd14', text: '14) Urina', options: { Vatta: 'Sem coloração, volume variado, difícil de ser eliminada.', Pitta: 'Amarela, marrom, vermelha ou turva, em grande quantidade,com queimação na uretra.', Kapha: 'Leitosa e espumante e em grande quantidade.' } },
  { id: 'd15', text: '15) Cabelo', options: { Vatta: 'Seco, fino, áspero, quebradiço, com pontas duplas.', Pitta: 'Fino, oleoso, ralo, com tendência à calvície precoce.', Kapha: 'Grosso, oleoso, forte e brilhante.' } },
  { id: 'd16', text: '16) Fezes', options: { Vatta: 'Obstipação em menor intensidade.', Pitta: 'Fezes, com queimação retal.', Kapha: 'Sem muco.' } },
  { id: 'd17', text: '17) Vontade de ir ao banheiro', options: { Vatta: 'Irregular, com tendência à constipação.', Pitta: 'Frequente, com urgência.', Kapha: 'Lenta, com dificuldade para iniciar.' } },
  { id: 'd18', text: '18) Sensação de cansaço', options: { Vatta: 'Pequeno.', Pitta: 'Tonteiras e desmaios.', Kapha: 'Moderado.' } },
  { id: 'd19', text: '19) Temperatura do corpo', options: { Vatta: 'Frio.', Pitta: 'Quente.', Kapha: 'Frio.' } },
  { id: 'd20', text: '20) Energia física', options: { Vatta: 'Variável, com picos de energia seguidos de fadiga.', Pitta: 'Alta, mas diminui com o calor.', Kapha: 'Constante e duradoura.' } },
  { id: 'd21', text: '21) Resistência a doenças', options: { Vatta: 'Baixa, com recuperação lenta.', Pitta: 'Moderada, com recuperação rápida.', Kapha: 'Alta, com recuperação lenta.' } },
  { id: 'd22', text: '22) Funcionamento da vesícula biliar', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Cálculos, inflamções e abscessos.', Kapha: 'Preguiçosa.' } },
  { id: 'd23', text: '23) Funcionamento do fígado', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Inflamações, úlceras e hepatites.', Kapha: 'Preguiçoso.' } },
  { id: 'd24', text: '24) Funcionamento do pâncreas', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Inflamações e úlceras.', Kapha: 'Preguiçoso.' } },
  { id: 'd25', text: '25) Funcionamento dos rins', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Cálculos e infecções.', Kapha: 'Preguiçoso.' } },
  { id: 'd26', text: '26) Funcionamento dos pulmões', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Inflamações e infecções.', Kapha: 'Preguiçoso.' } },
  { id: 'd27', text: '27) Funcionamento do coração', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Inflamações e hipertensão.', Kapha: 'Preguiçoso.' } },
  { id: 'd28', text: '28) Funcionamento do intestino', options: { Vatta: 'Reduzido e irregular.', Pitta: 'Inflamações e úlceras.', Kapha: 'Preguiçoso.' } },
  { id: 'd29', text: '29) Temperamento', options: { Vatta: 'Nervoso, ansioso, inquieto.', Pitta: 'Irritável, competitivo, ambicioso.', Kapha: 'Calmo, paciente, afetuoso.' } },
  { id: 'd30', text: '30) Memória', options: { Vatta: 'Boa, mas com lapsos frequentes.', Pitta: 'Excelente, rápida e precisa.', Kapha: 'Lenta, mas duradoura.' } },
  { id: 'd31', text: '31) Capacidade de concentração', options: { Vatta: 'Curta, com distrações frequentes.', Pitta: 'Alta, com foco intenso.', Kapha: 'Moderada, com tendência à procrastinação.' } },
  { id: 'd32', text: '32) Humor', options: { Vatta: 'Variável, com mudanças rápidas.', Pitta: 'Intenso, com explosões de raiva.', Kapha: 'Estável, mas com tendência à melancolia.' } },
  { id: 'd33', text: '33) Febre', options: { Vatta: 'Moderada e irregular, com sede,calafrio e agitação.', Pitta: 'Alta, com sensação de queimação na pele, suor e sede intensa e irritabilidade e delírio.', Kapha: 'Baixa e constante, com sensação de peso,cansaço e torpor mental.' } },
  { id: 'd34', text: '34) Como é o formato da sua cabeça?', options: { Vatta: 'Pequena, com laterais menores.', Pitta: 'Média, com tendência a angulações.', Kapha: 'Grande, arredondada, robusta e firme.' } },
  { id: 'd35', text: '35) Como são os seus olhos?', options: { Vatta: 'Pequenos, secos e opacos.', Pitta: 'Médios, estreitos e com tendência à vermelhidão.', Kapha: 'Grandes, brancos, atraentes e lacrimejantes.' } },
  { id: 'd36', text: '36) Como são os seus dentes?', options: { Vatta: 'Pequenos, secos, encavalados.', Pitta: 'Médios e rosados.', Kapha: 'Grandes, grossos, brilhantes.' } },
  { id: 'd37', text: '37) Como são as suas mãos e pés?', options: { Vatta: 'Pele seca, áspera e fria, com descamação e tremores.', Pitta: 'Pele quente, palma avermelhada.', Kapha: 'Pele fria, branca, oleosa.' } },
  { id: 'd38', text: '38) O que sente normalmente?', options: { Vatta: 'Medo e ansiedade.', Pitta: 'Raiva e irritabilidade.', Kapha: 'Tristeza e depressão.' } },
  { id: 'd39', text: '39) Quais as características normais das suas fezes?', options: { Vatta: 'Pouco volume, ressecadas, formação de gases.', Pitta: 'Volumosa, eliminação fácil, tendência à diarreia.', Kapha: 'Eliminação moderada, oleosa.' } },
  { id: 'd40', text: '40) Como se comporta diante do esforço físico?', options: { Vatta: 'Pouca resistência física.', Pitta: 'Resistência física mediana, reduz quando exposto ao calor.', Kapha: 'Boa resistência física.' } },
  { id: 'd41', text: '41) Como são os seus ombros?', options: { Vatta: 'Pequenos, magros,com ossos proeminentes e arqueados para frente.', Pitta: 'Mais ampliados com musculatura desenvolvida.', Kapha: 'Desenvolvidos, firmes e largos, apresentando uma característica arredondada.' } },
  { id: 'd42', text: '42) Como é o seu pescoço?', options: { Vatta: 'Fino e comprido.', Pitta: 'Médio, musculoso.', Kapha: 'Curto e grosso.' } },
  { id: 'd43', text: '43) Como é seu tórax?', options: { Vatta: 'Pequeno, pouco desenvolvido, magro e estreito.', Pitta: 'Mais desenvolvido, com musculatura bem definida.', Kapha: 'Volumoso chegando a ser extremamente desenvolvido.' } },
  { id: 'd44', text: '44) Como é a sua barriga?', options: { Vatta: 'Plana ou côncava.', Pitta: 'Reta ou levemente arredondada.', Kapha: 'Arredondada ou protuberante.' } },
  { id: 'd45', text: '45) Como são os seus quadris?', options: { Vatta: 'Estreitos e ósseos.', Pitta: 'Médios, proporcionais ao corpo.', Kapha: 'Largos e arredondados.' } },
  { id: 'd46', text: '46) Como são os seus braços e pernas?', options: { Vatta: 'Finos, excessivamente pequenos ou longos.', Pitta: 'Mais desenvolvido com musculatura bem definida.', Kapha: 'Bem desenvolvido,volumoso e arredondado.' } },
  { id: 'd47', text: '47) Como são suas unhas?', options: { Vatta: 'Finas, ásperas.', Pitta: 'Medianas e avermelhadas.', Kapha: 'Largas,grossas,lisas, esbranquiçadas e oleosas.' } },
  { id: 'd48', text: '48) Como é o seu andar?', options: { Vatta: 'Rápido, leve, inquieto.', Pitta: 'Decidido, médio.', Kapha: 'Lento, pesado, arrastado.' } },
  { id: 'd49', text: '49) Como é normalmente seu apetite?', options: { Vatta: 'Irregular, sem horários definidos.tem dificuldade para ganhar peso.', Pitta: 'Intenso, com horários definidos.Engorda rápido e perde peso com facilidade.', Kapha: 'De pouca intensidade,com prazer pela alimentação,principalmente em tristeza,depressão e ansiedade.Vive fazendoo dieta.' } },
  { id: 'd50', text: '50) Como é sua resistência ao frio e ao calor?', options: { Vatta: 'Baixa resistência ao frio.', Pitta: 'Baixa resistência ao calor.', Kapha: 'Boa resistência ao frio.' } },
  { id: 'd51', text: '51) Quais os sabores que mais agradam a você?', options: { Vatta: 'Ácidos ou salgados.', Pitta: 'Amargos.', Kapha: 'Picantes ou adstringentes.' } },
  { id: 'd52', text: '52) Qual a característica normal do seu suor? ', options: { Vatta: 'Pouca quantidade.', Pitta: 'Sudorese intensa,com suor aquoso e quente nas mãos.', Kapha: 'Sudorese moderada e constante,de aspecto pegajoso.' } },
  { id: 'd53', text: '53) Como desempenha suas atividades?', options: { Vatta: 'Com rapidez, cansado rapidamente, em virtude da hiperatividade.', Pitta: 'Com decisão e competitividade, ambição e entusiasmo.', Kapha: 'Com lentidão,determinação e esforço.' } },
  { id: 'd54', text: '54) Como é avaliada sua performance?', options: { Vatta: 'Excelente no aspecto criativo e no planejamento, dificilmente concluindo suas metas e objetivos.', Pitta: 'Excelente administrador e condutor de pessoas, concretizando suas metas e objetivos.', Kapha: 'Sempre adia o início da execução das suas metas e objetivos, graças à relutância contra mudanças que exigem esforço.' } },
];

const gunaQuestions: Question[] = [
  { id: 'g1', text: 'Alimentação Diária', options: { Sattwa: 'Vegetariana, cereais, leite.', Rajas: 'Pouca carne e seus derivados.', Tamas: 'Predominantemente carnívora.' } },
  { id: 'g2', text: 'Concentração mental', options: { Sattwa: 'Elevada.', Rajas: 'Moderada.', Tamas: 'Baixa.' } },
  { id: 'g3', text: 'Criatividade', options: { Sattwa: 'Elevada.', Rajas: 'Moderada.', Tamas: 'Baixa.' } },
  { id: 'g4', text: 'Sinto depressão', options: { Sattwa: 'Nunca.', Rajas: 'Esporadicamente.', Tamas: 'Constantemente.' } },
  { id: 'g5', text: 'Sinto raiva', options: { Sattwa: 'Excepcionalmente.', Rajas: 'Esporadicamente.', Tamas: 'Constantemente.' } },
  { id: 'g6', text: 'Pratico o perdão', options: { Sattwa: 'Facilmente.', Rajas: 'Esforçando-me.', Tamas: 'Guardo mágoas e rancores.' } },
  { id: 'g7', text: 'Como trabalho', options: { Sattwa: 'Desprendimento e idealismo.', Rajas: 'Visando em atender os objetivos pessoais.', Tamas: 'Sem estímulo.' } },
  { id: 'g8', text: 'Controle dos sentidos', options: { Sattwa: 'Moderado.', Rajas: 'Variável.', Tamas: 'Fraco.' } },
  { id: 'g9', text: 'Estado de humor', options: { Sattwa: 'Frequentemente equilibrado.', Rajas: 'Esporádico.', Tamas: 'Mal humorado.' } },
  { id: 'g10', text: 'Estudos espirituais', options: { Sattwa: 'Diariamente.', Rajas: 'Ocacionalmente.', Tamas: 'Nunca.' } },
  { id: 'g11', text: 'Faço orações', options: { Sattwa: 'Diariamente.', Rajas: 'Ocasionalmente.', Tamas: 'Nunca.' } },
  { id: 'g12', text: 'Higiene corporal', options: { Sattwa: 'Intensa.', Rajas: 'Moderada.', Tamas: 'Fraca.' } },
  { id: 'g13', text: 'Faço meditação', options: { Sattwa: 'Diariamente.', Rajas: 'Ocasionalmente.', Tamas: 'Nunca.' } },
  { id: 'g14', text: 'Objetivos e ideais', options: { Sattwa: 'Poucos.', Rajas: 'Alguns.', Tamas: 'Muitos e contraditórios.' } },
  { id: 'g15', text: 'Pratico o perdão', options: { Sattwa: 'Facilmente.', Rajas: 'Esforçando-me.', Tamas: 'Guardo mágoas e rancores.' } },
  { id: 'g16', text: 'Sinto amor', options: { Sattwa: 'Por todos.', Rajas: 'Por alguns.', Tamas: 'Ocasionalmente.' } },
  { id: 'g17', text: 'Sinto contentamento', options: { Sattwa: 'Frequentemente.', Rajas: 'Ocasionalmente.', Tamas: 'Raramente.' } },
  { id: 'g18', text: 'Sinto depressão', options: { Sattwa: 'Nunca.', Rajas: 'Esporadicamente.', Tamas: 'Constantemente.' } },
  { id: 'g19', text: 'Sinto paz', options: { Sattwa: 'Frequentemente.', Rajas: 'Esporadicamente.', Tamas: 'Raramente.' } },
  { id: 'g20', text: 'Sinto medo', options: { Sattwa: 'Excepcionalmente.', Rajas: 'Esporadicamente.', Tamas: 'Constantemente.' } },
  { id: 'g21', text: 'Sinto raiva', options: { Sattwa: 'Excepcionalmente.', Rajas: 'Esporadicamente.', Tamas: 'Constantemente.' } },
  { id: 'g22', text: 'Sou honesto', options: { Sattwa: 'Frequentemente.', Rajas: 'Ocasionalmente.', Tamas: 'Esporadicamente.' } },
  { id: 'g23', text: 'Sou solidário e caridoso', options: { Sattwa: 'Frequentemente.', Rajas: 'Esporadicamente.', Tamas: 'Nunca.' } },
  { id: 'g24', text: 'Sou uma pessoa', options: { Sattwa: 'Modesta.', Rajas: 'Orgulhosa.', Tamas: 'Vaidosa.' } },
  { id: 'g25', text: 'Tenho percepção', options: { Sattwa: 'Aguçada.', Rajas: 'Variável.', Tamas: 'Raramente.' } },
  { id: 'g26', text: 'Tenho vontade', options: { Sattwa: 'Intensa.', Rajas: 'Variável.', Tamas: 'Fraca.' } },
  { id: 'g27', text: 'Uso de drogas e estimulantes(fumo,alcool,etc.)', options: { Sattwa: 'Não.', Rajas: 'Ocasionalmente.', Tamas: 'Frequentemente.' } },

];

// ----------------------------------------------------------------------
// 3. LÓGICA DE CÁLCULO E RECOMENDAÇÃO
// ----------------------------------------------------------------------

const calculateDoshaScores = (answers: { [key: string]: string }): DoshaScores => {
  const scores: DoshaScores = { Vatta: 0, Pitta: 0, Kapha: 0 };
  Object.values(answers).forEach(dosha => {
    if (dosha in scores) { scores[dosha as keyof DoshaScores] += 1; }
  });
  return scores;
};

const calculateGunaScores = (answers: { [key: string]: string }): GunaScores => {
  const scores: GunaScores = { Sattwa: 0, Rajas: 0, Tamas: 0 };
  Object.values(answers).forEach(guna => {
    if (guna in scores) { scores[guna as keyof GunaScores] += 1; }
  });
  return scores;
};

const getPredominantResult = (scores: DoshaScores | GunaScores): string => {
  const entries = Object.entries(scores);
  if (entries.length === 0) return 'Nenhum';

  const sorted = entries.sort(([, a], [, b]) => b - a);

  if (sorted.length >= 2 && sorted[0][1] === sorted[1][1]) {
    if (sorted.length === 3 && sorted[1][1] === sorted[2][1]) {
      return sorted.map(s => s[0]).join(' / ');
    }
    return `${sorted[0][0]} / ${sorted[1][0]}`;
  }

  return sorted[0][0];
};

const getInitialRecommendation = (predominantDosha: string): { title: string, text: string } => {
  // Pega o primeiro Dosha em caso de empate (ex: Vatta / Pitta -> Vatta)
  const dosha = predominantDosha.split('/')[0].trim(); 
  switch (dosha) {
    case 'Vatta':
      return {
        title: "Foco no Enraizamento e Estabilidade (Vatta)",
        text: "Seu perfil aponta predominantemente para Vatta. O foco deve ser em **aquecer e estabilizar** o corpo e a mente: estabeleça uma rotina regular, coma alimentos quentes e nutritivos (como sopas e tubérculos) e pratique meditação suave para acalmar a ansiedade e o movimento excessivo.",
      };
    case 'Pitta':
      return {
        title: "Foco no Resfriamento e Calma (Pitta)",
        text: "Seu perfil aponta predominantemente para Pitta. O foco deve ser em **resfriar e acalmar o fogo**: evite comidas picantes ou azedas, reduza o estresse competitivo, pratique atividades relaxantes (como natação ou passeios na natureza) e consuma alimentos frescos e doces.",
      };
    case 'Kapha':
      return {
        title: "Foco na Leveza e Estímulo (Kapha)",
        text: "Seu perfil aponta predominantemente para Kapha. O foco deve ser em **estimular e trazer leveza**: evite alimentos pesados, doces e laticínios; pratique exercícios vigorosos diariamente para aumentar a circulação, e busque novos estímulos intelectuais para evitar a estagnação.",
      };
    default:
      return {
        title: "Recomendação Neutra",
        text: "O seu resultado não indicou uma predominância única clara. O seu foco deve ser em equilibrar os três doshas. Procure um terapeuta Ayurvédico para uma avaliação completa e personalizada.",
      };
  }
};


// ----------------------------------------------------------------------
// 4. COMPONENTE PRINCIPAL DO QUESTIONÁRIO
// ----------------------------------------------------------------------

// Variáveis Globais (Definidas como nulas/vazias para simulação em localhost)
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const QuestionarioDiagnostico: React.FC = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalData>({
    nome: '', telefone: '', idade: '', sintoma: '', tempoDesequilibrio: '',
    gestante: '', indiceMassa: ''
  });
  const [doshaAnswers, setDoshaAnswers] = useState<{ [key: string]: string }>({});
  const [gunaAnswers, setGunaAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Modo de Simulação Ativo: O salvamento está desabilitado.');
  const [isSimulationMode, setIsSimulationMode] = useState(true);

  // No modo simulação, o user ID é mockado
  const userId = useMemo(() => 'simulated-user-12345', []);
  const appId = useMemo(() => 'simulated-app-id', []);

  // Inicialização do Firebase/Auth - MODO SIMULAÇÃO
  useEffect(() => {
    const isConfigMissing = typeof __firebase_config === 'undefined' || !JSON.parse(__firebase_config || '{}').apiKey;

    if (isConfigMissing) {
      setIsSimulationMode(true);
      setMessage('Modo de Simulação Ativo: O salvamento está desabilitado. Os resultados serão exibidos no console.');
    } else {
      // Lógica real de inicialização (mantida, mas não funcional em localhost sem as variáveis)
      setIsSimulationMode(false);
      setMessage('');
      try {
        const firebaseConfig = JSON.parse(__firebase_config!);
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        // ... Lógica de autenticação e Firestore real aqui
      } catch (error) {
        console.error("Erro na inicialização real do Firebase:", error);
        setIsSimulationMode(true);
        setMessage("Erro ao inicializar o Firebase. Revertendo para o modo de simulação.");
      }
    }
  }, []);

  // Funções de manipulação de estado
  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  
  // Nova função para reiniciar
  const handleRestart = () => {
    setStep(1);
    setPersonalData({
      nome: '', telefone: '', idade: '', sintoma: '', tempoDesequilibrio: '',
      gestante: '', indiceMassa: ''
    });
    setDoshaAnswers({});
    setGunaAnswers({});
    setMessage(isSimulationMode ? 'Modo de Simulação Ativo: O salvamento está desabilitado.' : '');
    setIsLoading(false);
  };

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoshaChange = (questionId: string, dosha: string) => {
    setDoshaAnswers(prev => ({ ...prev, [questionId]: dosha }));
  };

  const handleGunaChange = (questionId: string, guna: string) => {
    setGunaAnswers(prev => ({ ...prev, [questionId]: guna }));
  };

  const handleDownloadResult = () => {
    // Usa o diálogo nativo de impressão para permitir salvar como PDF ou imagem.
    if (resultRef.current) {
      window.print();
    }
  };

  // Função para salvar - MODO SIMULAÇÃO
  const handleSaveResult = useCallback(async () => {
    setIsLoading(true);
    setMessage('');
    
    // Objeto de resultados completo para exibição no console
    const fullResults = {
        personalData,
        doshaAnswers,
        gunaAnswers,
        results: {
            doshaScores: calculateDoshaScores(doshaAnswers),
            gunaScores: calculateGunaScores(gunaAnswers),
            predominantDosha: getPredominantResult(calculateDoshaScores(doshaAnswers)),
            predominantGuna: getPredominantResult(calculateGunaScores(gunaAnswers)),
        },
        userId,
        timestamp: new Date().toISOString(),
    };

    console.log("--- RESULTADO DO QUESTIONÁRIO (SIMULAÇÃO) ---");
    console.log(JSON.stringify(fullResults, null, 2));
    console.log("----------------------------------------------");
    
    // Simulação de delay de salvamento
    setTimeout(() => {
        setIsLoading(false);
        setMessage(`Simulação de sucesso! Os resultados foram exibidos no console do navegador (F12).`);
    }, 1000);

  }, [personalData, doshaAnswers, gunaAnswers, userId]);


  // Etapa 1: Dados Pessoais / Anamnese
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-teal-700 border-b pb-2 mb-4">Etapa 1: Dados Pessoais e Anamnese</h2>
      {/* Campos Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="nome" label="Nome" value={personalData.nome} onChange={handlePersonalDataChange} type="text" />
        <Input name="telefone" label="Telefone" value={personalData.telefone} onChange={handlePersonalDataChange} type="tel" />
        <Input name="idade" label="Idade" value={personalData.idade} onChange={handlePersonalDataChange} type="number" />
      </div>

      {/* Campos de Anamnese */}
      <Input name="sintoma" label="a) Qual o sintoma que sente?" value={personalData.sintoma} onChange={handlePersonalDataChange} type="text" />
      <Input name="tempoDesequilibrio" label="c) O desequilíbrio em questão já se manifestou anteriormente? Há quanto tempo?" value={personalData.tempoDesequilibrio} onChange={handlePersonalDataChange} type="text" />

      {/* Checkboxes/Radios */}
      <div className="flex flex-col space-y-3">
        <label className="text-gray-700 font-medium">e) Está grávida?</label>
        <RadioGroup name="gestante" options={['Sim', 'Não']} selected={personalData.gestante} onChange={handlePersonalDataChange} />
        <label className="text-gray-700 font-medium pt-2">f) Índice de massa corporal (Autoavaliação)</label>
        <RadioGroup name="indiceMassa" options={['Magreza', 'Normal', 'Sobrepeso', 'Obeso', 'Obeso mórbido']} selected={personalData.indiceMassa} onChange={handlePersonalDataChange} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!personalData.nome || !personalData.sintoma}>
          Próxima Etapa (Doshas)
        </Button>
      </div>
    </div>
  );

  // Etapa 2: Questionário de Doshas
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-teal-700 border-b pb-2 mb-4">Etapa 2: Questionário de Doshas (Vata, Pitta, Kapha)</h2>
      <p className="text-gray-600">Selecione a opção que melhor descreve você. Responda a todas as 10 perguntas.</p>
      <div className="space-y-8">
        {doshaQuestions.map(q => (
          <QuestionBlock key={q.id} question={q} answers={doshaAnswers} onSelect={handleDoshaChange} type="dosha" />
        ))}
      </div>
      <div className="flex justify-between pt-6">
        <Button onClick={handleBack} variant="secondary">Voltar (Dados Pessoais)</Button>
        <Button onClick={handleNext} disabled={Object.keys(doshaAnswers).length !== doshaQuestions.length}>
          Próxima Etapa ({Object.keys(doshaAnswers).length}/{doshaQuestions.length} Respondidas)
        </Button>
      </div>
    </div>
  );

  // Etapa 3: Avaliação da Constituição Mental (Gunas)
  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-teal-700 border-b pb-2 mb-4">Etapa 3: Avaliação da Constituição Mental</h2>
      <p className="text-gray-600">Selecione a opção que melhor descreve seu estado mental e hábitos. Responda a todas as 6 perguntas.</p>
      <div className="space-y-8">
        {gunaQuestions.map(q => (
          <QuestionBlock key={q.id} question={q} answers={gunaAnswers} onSelect={handleGunaChange} type="guna" />
        ))}
      </div>
      <div className="flex justify-between pt-6">
        <Button onClick={handleBack} variant="secondary">Voltar (Doshas)</Button>
        <Button onClick={handleNext} disabled={Object.keys(gunaAnswers).length !== gunaQuestions.length}>
          Próxima Etapa ({Object.keys(gunaAnswers).length}/{gunaQuestions.length} Respondidas)
        </Button>
      </div>
    </div>
  );

  // Cálculo dos resultados para a Etapa 4
  const doshaScores = useMemo(() => calculateDoshaScores(doshaAnswers), [doshaAnswers]);
  const gunaScores = useMemo(() => calculateGunaScores(gunaAnswers), [gunaAnswers]);
  const predominantDosha = useMemo(() => getPredominantResult(doshaScores), [doshaScores]);
  const predominantGuna = useMemo(() => getPredominantResult(gunaScores), [gunaScores]);
  const doshaRecommendation = useMemo(() => getInitialRecommendation(predominantDosha), [predominantDosha]);
  const formatGunaLabel = useCallback((key: string) => {
    const map: Record<string, string> = { Sattwa: 'Perfil 1', Rajas: 'Perfil 2', Tamas: 'Perfil 3' };
    return map[key.trim()] || key;
  }, []);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);
  const formattedGunaPredominant = useMemo(
    () => predominantGuna.split('/').map(part => formatGunaLabel(part)).join(' / '),
    [predominantGuna, formatGunaLabel],
  );

  // Etapa 4: Resultado Final
  const renderStep4 = () => (
    <div className="space-y-8" ref={resultRef}>
      {/* 1. TÍTULO DE CONCLUSÃO */}
      <div className="text-center space-y-2 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-extrabold text-teal-700">Análise Preliminar Concluída!</h2>
        <p className="text-gray-600 italic">Este é um resumo automático. Procure um profissional de saúde para um diagnóstico completo.</p>
      </div>

      {/* 2. DOSHA DOMINANTE E PONTUAÇÃO (Combinando a lógica anterior com o estilo da imagem) */}
      <h3 className="text-xl font-semibold text-gray-800">Seu Dosha Dominante Atual: <span className="text-red-600 font-bold">{predominantDosha}</span></h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(doshaScores).sort(([, a], [, b]) => b - a).map(([dosha, score]) => (
          <DoshaScoreCard key={dosha} dosha={dosha} score={score} max={doshaQuestions.length} isPredominant={predominantDosha.includes(dosha)} />
        ))}
      </div>

      {/* 3. RECOMENDAÇÃO INICIAL */}
      <RecommendationCard title={doshaRecommendation.title} text={doshaRecommendation.text} />
      
      {/* 4. DADOS DE ANAMNESE COLETADOS */}
      <div className="space-y-3 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Dados de Anamnese Coletados:</h3>
        <AnamneseItem label="Nome" value={personalData.nome} />
        <AnamneseItem label="Idade" value={personalData.idade} />
        <AnamneseItem label="Telefone" value={personalData.telefone} />
        <AnamneseItem label="Sintoma Principal" value={personalData.sintoma} />
        <AnamneseItem label="Tempo de Desequilíbrio" value={personalData.tempoDesequilibrio || 'Não informado'} />
        <AnamneseItem label="Gestante" value={personalData.gestante || 'Não respondido'} />
        <AnamneseItem label="IMC (Autoavaliação)" value={personalData.indiceMassa || 'Não respondido'} />
      </div>
      
      {/* 5. RESULTADO DOS GUNAS (Seção extra, pois estava no original) */}
      <ResultCard
        title="Pontuação das Respostas Mentais"
        scores={gunaScores}
        predominant={formattedGunaPredominant}
        totalQuestions={gunaQuestions.length}
        labelFormatter={formatGunaLabel}
      />

      {/* 6. PRÓXIMOS PASSOS E BOTÕES */}
      <div className="pt-6 border-t mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Passos</h3>
        <p className="text-gray-600 mb-4">
          {message.includes('Simulação') 
            ? 'No Modo Simulação, clique abaixo para ver o resultado completo no console (F12) ou reinicie o diagnóstico.' 
            : 'Para garantir a continuidade e o acompanhamento do seu progresso, salve seu resultado.'}
        </p>
        
        {/* Mensagem de Aviso/Sucesso */}
        {message && (
          <div className={`p-3 rounded-xl ${message.includes('Simulação de sucesso') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} mb-4 text-sm font-medium`}>
            {message}
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 justify-between">
          <Button onClick={handleRestart} variant="secondary" className="bg-red-500 hover:bg-red-600 text-white">
            Iniciar Novo Diagnóstico
          </Button>
          <Button onClick={handleSaveResult} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
            {isLoading ? 'Simulando Salvamento...' : isSimulationMode ? 'Ver Resultados no Console' : 'Salvar Resultado'}
          </Button>
          <Button onClick={handleDownloadResult} className="bg-gray-800 hover:bg-gray-900 text-white">
            Salvar resultado como PDF/Imagem
          </Button>
        </div>
      </div>
      <div className="text-sm text-center text-gray-400 mt-4">
          ID do Usuário (Para referência): {userId}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8 min-h-screen" ref={containerRef}>
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-100 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Questionário Diagnóstico Ayurvédico</h1>
        <p className="text-center text-gray-500 mb-6">4 Etapas para descobrir seus Doshas e Gunas.</p>
        <StepNavigator currentStep={step} totalSteps={4} />
        {renderContent()}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 5. COMPONENTES REUTILIZÁVEIS DE UI (Atualizados)
// ----------------------------------------------------------------------

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean; variant?: 'primary' | 'secondary'; className?: string }> = ({ onClick, children, disabled = false, variant = 'primary', className = '' }) => {
  const baseStyle = 'px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg';
  const primaryStyle = 'bg-teal-600 text-white hover:bg-teal-700 disabled:bg-gray-400 disabled:shadow-none';
  const secondaryStyle = 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-500';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<{ name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type: string }> = ({ name, label, value, onChange, type }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition duration-150"
    />
  </div>
);

const RadioGroup: React.FC<{ name: string; options: string[]; selected: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, options, selected, onChange }) => (
  <div className="flex flex-wrap gap-3">
    {options.map(option => (
      <label key={option} className="inline-flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option}
          checked={selected === option}
          onChange={onChange}
          className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500 hidden"
        />
        <span className={`ml-2 text-sm text-gray-700 p-3 rounded-xl border transition duration-150 font-medium ${selected === option ? 'bg-teal-500 text-white border-teal-600 shadow-md' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}>
          {option}
        </span>
      </label>
    ))}
  </div>
);

const QuestionBlock: React.FC<{ question: Question; answers: { [key: string]: string }; onSelect: (id: string, value: string) => void; type: 'dosha' | 'guna' }> = ({ question, answers, onSelect, type }) => {
  const isDosha = type === 'dosha';
  const colorMap = isDosha ? { Vatta: 'bg-indigo-50 border-indigo-300', Pitta: 'bg-red-50 border-red-300', Kapha: 'bg-green-50 border-green-300' }
                         : { Sattwa: 'bg-blue-50 border-blue-300', Rajas: 'bg-yellow-50 border-yellow-300', Tamas: 'bg-gray-50 border-gray-300' };
  const labelMap = isDosha ? { Vatta: '', Pitta: '', Kapha: '' } : { Sattwa: '', Rajas: '', Tamas: '' };

  return (
    <div className="p-4 border border-gray-200 rounded-2xl shadow-sm">
      <p className="font-semibold text-gray-800 mb-3">{question.text}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(question.options).map(([key, description]) => {
          const isSelected = answers[question.id] === key;
          const bgClass = colorMap[key as keyof typeof colorMap] || 'bg-gray-100 border-gray-300';
          const label = labelMap[key as keyof typeof labelMap] || '';

          return (
            <div
              key={key}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${bgClass}
                         ${isSelected ? 'ring-2 ring-offset-2 ring-teal-500 shadow-xl scale-[1.02] border-teal-500' : 'hover:shadow-lg hover:border-teal-200'}
                         flex flex-col`}
              onClick={() => onSelect(question.id, key)}
            >
              {label && <span className="font-bold text-lg mb-1 text-gray-900">{label}</span>}
              <p className="text-sm text-gray-700 flex-grow">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StepNavigator: React.FC<{ currentStep: number, totalSteps: number }> = ({ currentStep, totalSteps }) => (
  <div className="flex justify-center my-8 space-x-3">
    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
      <div
        key={step}
        className={`w-12 h-2 rounded-full transition-colors duration-300 ${
          step === currentStep
            ? 'bg-teal-600 shadow-lg'
            : step < currentStep
              ? 'bg-teal-400'
              : 'bg-gray-300'
        }`}
      ></div>
    ))}
  </div>
);

const DoshaScoreCard: React.FC<{ dosha: string, score: number, max: number, isPredominant: boolean }> = ({ dosha, score, max, isPredominant }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let ringColor = 'ring-transparent';
  
  if (isPredominant) {
    switch (dosha) {
      case 'Vatta':
        bgColor = 'bg-blue-200';
        ringColor = 'ring-blue-500';
        break;
      case 'Pitta':
        bgColor = 'bg-red-200';
        ringColor = 'ring-red-500';
        break;
      case 'Kapha':
        bgColor = 'bg-green-200';
        ringColor = 'ring-green-500';
        break;
      default:
        // Caso de desempate
        bgColor = 'bg-yellow-200';
        ringColor = 'ring-yellow-500';
        break;
    }
  }

  return (
    <div className={`p-4 rounded-xl text-center font-bold shadow-md transition-all ${bgColor} ${isPredominant ? `ring-2 ${ringColor} scale-105` : ''}`}>
      <div className="text-xl">{dosha}</div>
      <div className="text-3xl mt-1">{score} <span className="text-lg font-normal">de {max}</span></div>
    </div>
  );
};

const RecommendationCard: React.FC<{ title: string, text: string }> = ({ title, text }) => (
  <div className="p-6 bg-teal-50 border-l-4 border-teal-500 rounded-2xl shadow-lg">
    <h3 className="text-xl font-bold text-teal-800 mb-2">{title}</h3>
    <p className="text-gray-700">{text}</p>
  </div>
);

const AnamneseItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex items-center text-gray-700">
    <span className="font-semibold w-1/2 md:w-1/3 text-sm">{label}:</span>
    <span className="w-1/2 md:w-2/3 ml-2 text-sm italic">{value || '---'}</span>
  </div>
);


// MANTIDO DO ARQUIVO ANTERIOR PARA OS GUNAS (SEÇÃO EXTRA)
const ResultCard: React.FC<{
  title: string;
  scores: DoshaScores | GunaScores;
  predominant: string;
  totalQuestions: number;
  labelFormatter?: (key: string) => string;
}> = ({ title, scores, predominant, totalQuestions, labelFormatter }) => {
  const scoreEntries = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const maxScorePossible = totalQuestions;

  return (
    <div className="p-6 bg-white border border-teal-300 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-teal-700 mb-4">{title}</h3>

      {/* Predominância */}
      <div className="mb-4 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-xl">
        <p className="text-lg font-semibold text-teal-800">Predominância Encontrada:</p>
        <p className="text-2xl font-extrabold text-teal-900 mt-1">
          {predominant
            .split("/")
            .map(part => (labelFormatter ? labelFormatter(part.trim()) : part.trim()))
            .join(" / ")}
        </p>
      </div>

      {/* Detalhe da Pontuação */}
      <div className="space-y-3">
        {scoreEntries.map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-gray-700">
            <span className="font-medium w-1/4">{labelFormatter ? labelFormatter(key) : key}</span>
            <div className="flex items-center space-x-3 w-3/4">
              <div className="flex-grow bg-gray-200 rounded-full h-3">
                <div
                  className="bg-teal-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(value / maxScorePossible) * 100}%` }}
                ></div>
              </div>
              <span className="w-10 text-right font-semibold text-sm">{value}/{maxScorePossible}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionarioDiagnostico;
