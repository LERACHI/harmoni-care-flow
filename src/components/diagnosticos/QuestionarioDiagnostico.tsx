import React, { useState } from 'react';
// Importação dos seus componentes de UI. Adicione Input e Select se estiverem disponíveis.
import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assumindo que este componente existe
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assumindo que este componente existe
import { Textarea } from '@/components/ui/textarea'; // Componente para campos maiores (Sintoma)
import { Label } from '@/components/ui/label'; // Componente de rótulo (Label)

// --- 1. DEFINIÇÃO DOS TIPOS DE DADOS ---

// Dados Pessoais/Anamnese (Parte A - Etapa 0)
interface DadosPessoais {
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  bairro: string;
  profissao: string;
  data: string;
  idade: string;
  estCivil: string;
  // Perguntas Iniciais (a a f)
  sintoma: string;
  desequilibrioTipo: 'recente' | 'antiga' | '' | 'misto'; // (b)
  tempoDesequilibrio: string; // (c)
  manifestacaoFamilia: 'Sim' | 'Não'; // (d)
  emQuemManifestacao: string; // (d) - quem na família (se Sim)
  gravida: 'Sim' | 'Não'; // (e)
  especificarGravida: string; // (e) - especificação (se Sim)
  imc: 'Magreza' | 'Normal' | 'Sobrepeso' | 'Obeso' | 'Obeso mórbido' | ''; // (f)
}

// Pergunta de Avaliação Dosha (Parte B - Etapa 1)
interface PerguntaDosha {
  id: number;
  texto: string;
  opcaoVatta: string;
  opcaoPitta: string;
  opcaoKapha: string;
}

// --- 2. CONTEÚDO DO QUESTIONÁRIO ---

// Questionário Ayurvédico Simplificado (Exemplo)
const perguntasDosha: PerguntaDosha[] = [
  {
    id: 1,
    texto: "Reação a medicamentos",
    opcaoVatta: "Ação rápida, efeitos colaterais e reações nervosas inesperadas.",
    opcaoPitta: "Ação mediana e eficiente, com dose correta.",
    opcaoKapha: "Ação lenta, exigindo alta dosagem para efeito.",
  },
  {
    id: 2,
    texto: "Característica da dor",
    opcaoVatta: "Cólica incômoda, latejante e migratória para outras partes do corpo.",
    opcaoPitta: "Acompanhada de ardência e queimação local, pode ser intensa.",
    opcaoKapha: "Pouco intensa, constante, pesada e entorpecedora.",
  },
  {
    id: 3,
    texto: "Coloração da pele",
    opcaoVatta: "Acinzentada ou pálida apagada. Desidratada",
    opcaoPitta: "Avermelhada ou preta.",
    opcaoKapha: "Esbranquiçada tendendo à palidez.",
  },
  {
    id: 4,
    texto: "Apetite",
    opcaoVatta: "Irregular com dificuldade digestiva.",
    opcaoPitta: "Excessivo, com queimação, etc.",
    opcaoKapha: "Constante com digestão lenta.",
  },
  {  
    id: 5,
    texto: "Arrotos e soluços",
    opcaoVatta: "Constantes e com aperto no estômago.",
    opcaoPitta: "Refluxo salgado ou com ácido.",
    opcaoKapha: "Refluxo adocicado ou com muco (clara de ovo).",
  },
  {
    id: 6,
    texto: "Sede",
    opcaoVatta: "Intensa.",
    opcaoPitta: "Excessiva.",
    opcaoKapha: "Normal.",
  },
  {
    id: 7,
    texto: "Salivação",
    opcaoVatta: "Boca seca.",
    opcaoPitta: "Intensa.",
    opcaoKapha: "Excessiva.",
  },
  {
    id: 8,
    texto: "Sente atração por",
    opcaoVatta: "Quentes, repelindo as frias.",
    opcaoPitta: "Frias.",
    opcaoKapha: "Quentes.",
  },
  {
    id: 9,
    texto: "Suor",
    opcaoVatta: "Frio e líquido.",
    opcaoPitta: "Excessivo e quente.",
    opcaoKapha: "Inchado, às vezes com muco.",
  },
  {
    id: 10,
    texto: "Garganta",
    opcaoVatta: "Áspera, suaviza quando ingere água.",
    opcaoPitta: "Inflamada e dolorida, irrita quando ingere água.",
    opcaoKapha: "Inchada, às vezes com muco.",
  },
  {
    id: 11,
    texto: "Sabor da boca",
    opcaoVatta: "Adstringente.",
    opcaoPitta: "Amarga e ardida.",
    opcaoKapha: "Adocicada.",
  },
  {
    id: 12,
    texto: "Urina",
    opcaoVatta: "Sem coloração, volume variável, difícil de ser eliminada.",
    opcaoPitta: "Amarela, marrom, vermelha ou turva, em grande quantidade, com queimação na uretra.",
    opcaoKapha: "Leitosa e espumante, em grande quantidade.",
  },
  {
    id: 13,
    texto: "Fezes",
    opcaoVatta: "Obstipação em menor intensidade.",
    opcaoPitta: "Fezes com queimação retal.",
    opcaoKapha: "Sem muco.",
  },
  {
    id: 14,
    texto: "Sensação de cansaço",
    opcaoVatta: "Pequeno.",
    opcaoPitta: "Tonteiras e desmaios.",
    opcaoKapha: "Moderado.",
  },
  {
    id: 15,
    texto: "Funcionamento da vesícula biliar",
    opcaoVatta: "Reduzido e irregular.",
    opcaoPitta: "Cálculos, inflamações e abscessos.",
    opcaoKapha: "Preguiçosa.",
  },
  {
    id: 16,
    texto: "Febre",
    opcaoVatta: "Moderada e irregular, com sede, calafrio e agitação.",
    opcaoPitta: "Alta, com sensação de queimação na pele, suor e sede intensa e irritabilidade e delírio.",
    opcaoKapha: "Baixa e constante, com sensação de peso, cansaço e torpor mental.",
  },
   {
    id: 17,
    texto: "Padrão de Sono",
    opcaoVatta: "Leve, intermitente, com insônia e dificuldade em pegar no sono.",
    opcaoPitta: "Moderado, dorme bem, mas acorda facilmente se incomodado.",
    opcaoKapha: "Pesado, longo, dificuldade em acordar, sente-se grogue pela manhã.",
  },
  {
    id: 18, // Corresponde à pergunta 18 da imagem (Como são os seus dentes?)
    texto: "Como são os seus dentes?",
    opcaoVatta: "Pequenos, secos, enrugados, acinzentados e encavalados.",
    opcaoPitta: "Médios e rosados.",
    opcaoKapha: "Grandes, grossos, brancos ou amarelados e brilhantes.",
  },
  {
    id: 19, // Corresponde à pergunta 19 da imagem (Como são os seus ombros?)
    texto: "Como são os seus ombros?",
    opcaoVatta: "Pequenos, magros, com ossos proeminentes e arqueados para a frente.",
    opcaoPitta: "Mais ampliados com musculatura desenvolvida.",
    opcaoKapha: "Desenvolvidos, firmes e largos, apresentando uma característica arredondada.",
  },
  {
    id: 20, // Corresponde à pergunta 20 da imagem (Como é o seu tórax?)
    texto: "Como é o seu tórax?",
    opcaoVatta: "Pequeno, pouco desenvolvido, magro e estreito.",
    opcaoPitta: "Mais desenvolvido com musculatura bem definida.",
    opcaoKapha: "Volumoso, chegando a ser extremamente desenvolvido.",
  },
  {
    id: 21, // Corresponde à pergunta 21 da imagem (Como são os seus braços e pernas?)
    texto: "Como são os seus braços e pernas?",
    opcaoVatta: "Finos, excessivamente pequenos ou longos.",
    opcaoPitta: "Mais desenvolvidos e com musculatura bem definida.",
    opcaoKapha: "Bem desenvolvido, volumoso e arredondado.",
  },
  {
    id: 22, // Corresponde à pergunta 22 da imagem (Como são as suas mãos e pés?)
    texto: "Como são as suas mãos e pés?",
    opcaoVatta: "Pele seca, áspera e fria, com tendência à descamação e tremores das mãos.",
    opcaoPitta: "Pele quente, palma avermelhada, dedos com musculatura desenvolvida.",
    opcaoKapha: "Pele fria, branca, oleosa, com dedos bem desenvolvidos.",
  },
  {
    id: 23, // Corresponde à pergunta 23 da imagem (Como são as suas unhas?)
    texto: "Como são as suas unhas?",
    opcaoVatta: "Finas, ásperas, quebradiças e acinzentadas.",
    opcaoPitta: "Medianas e avermelhadas.",
    opcaoKapha: "Largas, grossas, lisas, esbranquiçadas e oleosas.",
  },
  {
    id: 24, // Corresponde à pergunta 24 da imagem (O que sente normalmente?)
    texto: "O que sente normalmente?",
    opcaoVatta: "Medo e ansiedade.",
    opcaoPitta: "Raiva e irritabilidade.",
    opcaoKapha: "Tristeza e depressão.",
  },
  {
    id: 25, // Corresponde à pergunta 25 da imagem (Como é normalmente o seu apetite?)
    texto: "Como é normalmente o seu apetite?",
    opcaoVatta: "Irregular, sem horários definidos. Tem dificuldade para ganhar peso.",
    opcaoPitta: "Intenso e com horários definidos. Engorda rápido e perde peso com facilidade.",
    opcaoKapha: "De pouca intensidade, com prazer pela alimentação, principalmente em tristeza, depressão e ansiedade. Vive fazendo dieta.",
  },
  {
    id: 26, // Corresponde à pergunta 26 da imagem (Sabores que mais agradam)
    texto: "Quais os sabores que mais agradam a você?",
    opcaoVatta: "Ácidos ou salgados.",
    opcaoPitta: "Amargos.",
    opcaoKapha: "Picantes ou adstringentes.",
  },
  {
    id: 27, // Corresponde à pergunta 27 da imagem (Características da urina)
    texto: "Qual a característica normal da sua urina?",
    opcaoVatta: "Sem coloração e em pequena quantidade, exigindo esforço para ser eliminada.",
    opcaoPitta: "Amarelada, avermelhada ou amarronzada ou em quantidade moderada, podendo apresentar queimação na uretra.",
    opcaoKapha: "Esbranquiçada ou leitosa, em grande quantidade.",
  },
  {
    id: 28, // Corresponde à pergunta 28 da imagem (Características das fezes)
    texto: "Quais as características normais das suas fezes?",
    opcaoVatta: "Pouco volume, ressecadas, tendência à prisão de ventre e formação de gases intestinais.",
    opcaoPitta: "Volumosa, com eliminação fácil e regular, podendo apresentar-se diarreica. Tendência à diarreia, queimação anal.",
    opcaoKapha: "Eliminação moderada, oleosa, podendo apresentar-se amarelada e coceira anal.",
  },
  {
    id: 29, // Corresponde à pergunta 29 da imagem (Características do suor)
    texto: "Qual a característica normal do seu suor?",
    opcaoVatta: "Pouca quantidade.",
    opcaoPitta: "Sudorese intensa, com suor aquoso e quente nas mãos.",
    opcaoKapha: "Sudorese moderada e constante, de aspecto pegajoso.",
  },
  {
    id: 30, // Corresponde à pergunta 30 da imagem (Como desempenha suas atividades)
    texto: "Como desempenha suas atividades?",
    opcaoVatta: "Com rapidez, cansando rapidamente, em virtude da hiperatividade.",
    opcaoPitta: "Com decisão, competitividade, ambição e entusiasmo.",
    opcaoKapha: "Com lentidão, determinação e esforço.",
  },
  {
    id: 31, // Corresponde à pergunta 31 da imagem (Comportamento diante do esforço)
    texto: "Como se comporta diante do esforço físico?",
    opcaoVatta: "Pouca resistência física.",
    opcaoPitta: "Resistência física mediana, que reduz quando exposto ao calor.",
    opcaoKapha: "Boa resistência física.",
  },
  {
    id: 32, // Corresponde à pergunta 32 da imagem (Avaliação de performance)
    texto: "Como é avaliada sua performance?",
    opcaoVatta: "Excelente no aspecto criativo e no planejamento, dificilmente concluindo suas metas e objetivos.",
    opcaoPitta: "Excelente administrador e condutor de pessoa, concretizando suas metas e objetivos.",
    opcaoKapha: "Sempre adia o início da execução das suas metas e objetivos, propensa à relutância contra mudanças que exigem esforço.",
  },
  {
    id: 33, // Corresponde à pergunta 9 da imagem (Cabeça)
    texto: "Como é o formato da sua cabeça?",
    opcaoVatta: "Pequena, com laterais menores.",
    opcaoPitta: "Média, com tendência a angulações.",
    opcaoKapha: "Grande, arredondada, robusta e firme.",
  },
  {
    id: 34, // Corresponde à pergunta 10 da imagem (Testa)
    texto: "Como é a sua testa?",
    opcaoVatta: "Curta, pequena e com rugas na testa.",
    opcaoPitta: "Grande, com rugas nas laterais das sobrancelhas.",
    opcaoKapha: "Grande e larga.",
  },
  {
    id: 35, // Corresponde à pergunta 11 da imagem (Cabelo)
    texto: "Como é o seu cabelo?",
    opcaoVatta: "Fino, grosso, com tendência à queda, à caspa e a sensibilidade a tinturas.",
    opcaoPitta: "Moderado, volumoso, com tendência à calvície, ao embranquecimento precoce, à dermatite seborreica e sensibilidade ao Sol (avermelhamento).",
    opcaoKapha: "Abundante, grosso, brilhante e com oleosidade excessiva.",
  },
  {
    id: 36, // Corresponde à pergunta 12 da imagem (Nariz)
    texto: "Como é o seu nariz?",
    opcaoVatta: "Estreito, fino e longo.",
    opcaoPitta: "Médio, com tendência a sangramento constante.",
    opcaoKapha: "Rombudo com narinas largas e oleosidade excessiva.",
  },
  {
    id: 37, // Corresponde à pergunta 13 da imagem (Olhos)
    texto: "Como são os seus olhos?",
    opcaoVatta: "Pequenos, secos, opacos e escuros.",
    opcaoPitta: "Médios, estreitos e com tendência à vermelhidão.",
    opcaoKapha: "Grandes, brancos, atraentes e lacrimejantes em virtude da emotividade.",
  },
  {
    id: 38, // Corresponde à pergunta 14 da imagem (Cílios)
    texto: "Como são os seus cílios?",
    opcaoVatta: "Curtos, escassos, secos e firmes.",
    opcaoPitta: "Curtos, finos e abundantes.",
    opcaoKapha: "Longos, grossos, oleosos e firmes.",
  },
  {
    id: 39, // Corresponde à pergunta 15 da imagem (Sobrancelhas)
    texto: "Como são as suas sobrancelhas?",
    opcaoVatta: "Curtas e finas.",
    opcaoPitta: "Medianas, com boa formação.",
    opcaoKapha: "Grossas, volumosas e com muitos pelos.",
  },
  {
    id: 40, // Corresponde à pergunta 16 da imagem (Lábios)
    texto: "Como são os seus lábios?",
    opcaoVatta: "Finos, estreitos, secos e acinzentados.",
    opcaoPitta: "Médios, macios e rosados.",
    opcaoKapha: "Grossos, grandes, úmidos, lisos e firmes.",
  },
  {
    id: 41, // Corresponde à pergunta 17 da imagem (Gengivas)
    texto: "Como são as suas gengivas?",
    opcaoVatta: "Aparentes e acinzentadas.",
    opcaoPitta: "Avermelhadas, podendo sangrar com facilidade.",
    opcaoKapha: "Bem nutridas e brilhantes.",
  },
];


// --- 3. COMPONENTE PRINCIPAL (Multi-Etapas) ---

const QuestionarioDiagnostico: React.FC = () => {
  // Estado para controlar as etapas: 0=Dados Pessoais, 1=Questionário Dosha, 2=Resultado
  const [etapa, setEtapa] = useState(0); 
  
  // Estado para Dados Pessoais e Anamnese
  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>({
    nome: '', telefone: '', endereco: '', cidade: '', bairro: '', profissao: '',
    data: new Date().toLocaleDateString('pt-BR'), // Preenche a data atual
    idade: '', estCivil: '', sintoma: '', desequilibrioTipo: '', 
    tempoDesequilibrio: '', manifestacaoFamilia: 'Não', emQuemManifestacao: '', 
    gravida: 'Não', especificarGravida: '', imc: ''
  });
  
  // Estado para Respostas Dosha: Mapeia ID da pergunta para o Dosha escolhido ('Vatta' | 'Pitta' | 'Kapha')
  const [respostasDosha, setRespostasDosha] = useState<{ [key: number]: 'Vatta' | 'Pitta' | 'Kapha' | '' }>({});

  // Função genérica para atualizar os dados pessoais
  const handleUpdateDadosPessoais = (field: keyof DadosPessoais, value: string) => {
    setDadosPessoais(prev => ({ ...prev, [field]: value }));
  };

  // Função para lidar com a resposta do Dosha
  const handleResponderDosha = (perguntaId: number, dosha: 'Vatta' | 'Pitta' | 'Kapha') => {
    setRespostasDosha(prev => ({ ...prev, [perguntaId]: dosha }));
  };

  // Verifica se todas as perguntas Dosha foram respondidas
  const isQuestionarioCompleto = Object.keys(respostasDosha).length === perguntasDosha.length;
  
  // Simples verificação de campos obrigatórios da Etapa 0
  const isDadosPessoaisValidos = dadosPessoais.nome && dadosPessoais.sintoma && dadosPessoais.idade && dadosPessoais.imc;


  // --- LÓGICA DE CÁLCULO DO DOSHA DOMINANTE (ETAPA 2) ---
  const calcularDoshaDominante = () => {
    const contagem = { Vatta: 0, Pitta: 0, Kapha: 0 };

    Object.values(respostasDosha).forEach(dosha => {
      if (dosha) {
        // @ts-ignore - TypeScript não consegue inferir o tipo da chave dinamicamente aqui
        contagem[dosha] += 1;
      }
    });

    // Encontra o Dosha com a maior contagem
    let dominante: 'Vatta' | 'Pitta' | 'Kapha' = 'Vatta';
    
    // Converte para array e ordena para garantir que o 'pior' dosha (maior contagem) seja selecionado
    const doshasOrdenados = (Object.keys(contagem) as ('Vatta' | 'Pitta' | 'Kapha')[])
      .sort((a, b) => contagem[b] - contagem[a]);
    
    dominante = doshasOrdenados[0];

    return { contagem, dominante };
  };


  // --- RENDERIZAÇÃO DAS ETAPAS ---

  // Etapa 0: Dados Pessoais/Anamnese
  if (etapa === 0) {
    return (
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">1/3. Informações Pessoais e Anamnese</CardTitle>
          <p className="text-sm text-muted-foreground">Preencha os campos abaixo para iniciarmos a avaliação.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" value={dadosPessoais.nome} onChange={(e) => handleUpdateDadosPessoais('nome', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" value={dadosPessoais.telefone} onChange={(e) => handleUpdateDadosPessoais('telefone', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="idade">Idade</Label>
              <Input id="idade" type="number" value={dadosPessoais.idade} onChange={(e) => handleUpdateDadosPessoais('idade', e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" value={dadosPessoais.cidade} onChange={(e) => handleUpdateDadosPessoais('cidade', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="bairro">Bairro</Label>
              <Input id="bairro" value={dadosPessoais.bairro} onChange={(e) => handleUpdateDadosPessoais('bairro', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="profissao">Profissão</Label>
              <Input id="profissao" value={dadosPessoais.profissao} onChange={(e) => handleUpdateDadosPessoais('profissao', e.target.value)} />
            </div>
          </div>

          <h3 className="text-xl font-bold pt-4 text-primary">Análise do Desequilíbrio Atual</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sintoma">a) Qual o sintoma que sente? (Máximo 200 caracteres)</Label>
              <Textarea 
                id="sintoma" 
                value={dadosPessoais.sintoma} 
                onChange={(e) => handleUpdateDadosPessoais('sintoma', e.target.value)} 
                maxLength={200} // Ajustado para 200 caracteres para ser mais realista para um campo de input
                rows={3}
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>b) O desequilíbrio é de natureza?</Label>
                <Select 
                  onValueChange={(value: 'recente' | 'antiga' | 'misto') => handleUpdateDadosPessoais('desequilibrioTipo', value)}
                  value={dadosPessoais.desequilibrioTipo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recente">Recente</SelectItem>
                    <SelectItem value="antiga">Antiga</SelectItem>
                    <SelectItem value="misto">Misto (Recente e Antiga)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tempoDesequilibrio">c) Tempo de Manifestação</Label>
                <Input 
                  id="tempoDesequilibrio" 
                  placeholder="Ex: 3 meses, desde a infância, etc."
                  value={dadosPessoais.tempoDesequilibrio} 
                  onChange={(e) => handleUpdateDadosPessoais('tempoDesequilibrio', e.target.value)} 
                />
              </div>

              <div>
                <Label>f) Classificação IMC (Autoavaliação)</Label>
                <Select 
                  onValueChange={(value: 'Magreza' | 'Normal' | 'Sobrepeso' | 'Obeso' | 'Obeso mórbido') => handleUpdateDadosPessoais('imc', value)}
                  value={dadosPessoais.imc}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua faixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Magreza">Magreza</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Sobrepeso">Sobrepeso</SelectItem>
                    <SelectItem value="Obeso">Obeso Grau I/II</SelectItem>
                    <SelectItem value="Obeso mórbido">Obeso Mórbido (Grau III)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>d) Manifestação em Família?</Label>
                <Select 
                  onValueChange={(value: 'Sim' | 'Não') => {
                    handleUpdateDadosPessoais('manifestacaoFamilia', value);
                    if (value === 'Não') handleUpdateDadosPessoais('emQuemManifestacao', '');
                  }}
                  value={dadosPessoais.manifestacaoFamilia}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sim">Sim</SelectItem>
                    <SelectItem value="Não">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dadosPessoais.manifestacaoFamilia === 'Sim' && (
                <div className="md:col-span-2">
                  <Label htmlFor="emQuemManifestacao">Especifique em quem da família</Label>
                  <Input id="emQuemManifestacao" value={dadosPessoais.emQuemManifestacao} onChange={(e) => handleUpdateDadosPessoais('emQuemManifestacao', e.target.value)} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>e) Está Grávida ou Lactante?</Label>
                <Select 
                  onValueChange={(value: 'Sim' | 'Não') => {
                    handleUpdateDadosPessoais('gravida', value);
                    if (value === 'Não') handleUpdateDadosPessoais('especificarGravida', '');
                  }}
                  value={dadosPessoais.gravida}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sim">Sim</SelectItem>
                    <SelectItem value="Não">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dadosPessoais.gravida === 'Sim' && (
                <div className="md:col-span-2">
                  <Label htmlFor="especificarGravida">Especifique a situação</Label>
                  <Input id="especificarGravida" value={dadosPessoais.especificarGravida} onChange={(e) => handleUpdateDadosPessoais('especificarGravida', e.target.value)} />
                </div>
              )}
            </div>
          </div>
          
          <Button 
            className="mt-8 w-full bg-primary hover:bg-primary/90"
            onClick={() => setEtapa(1)}
            disabled={!isDadosPessoaisValidos}
          >
            Próxima Etapa: Avaliação Dosha (2/3)
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Etapa 1: Questionário Dosha (Avaliação)
  if (etapa === 1) {
    return (
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">2/3. Avaliação de Desequilíbrio Energético (Doshas)</CardTitle>
          <p className="text-sm text-muted-foreground">Para cada característica, escolha a descrição que mais se aplica à sua condição *atual*.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {perguntasDosha.map((pergunta) => (
              <div key={pergunta.id} className="border p-4 rounded-lg bg-white shadow-sm">
                <h3 className="font-bold mb-4 text-lg text-secondary-foreground">{pergunta.id}. {pergunta.texto}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Opção Vata */}
                  <Button 
                    variant={respostasDosha[pergunta.id] === 'Vatta' ? 'default' : 'outline'}
                    onClick={() => handleResponderDosha(pergunta.id, 'Vatta')}
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                  >
                    <span className="font-semibold mr-2">[Vatta]</span> {pergunta.opcaoVatta}
                  </Button>
                  {/* Opção Pitta */}
                  <Button 
                    variant={respostasDosha[pergunta.id] === 'Pitta' ? 'default' : 'outline'}
                    onClick={() => handleResponderDosha(pergunta.id, 'Pitta')}
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                  >
                    <span className="font-semibold mr-2">[Pitta]</span> {pergunta.opcaoPitta}
                  </Button>
                  {/* Opção Kapha */}
                  <Button 
                    variant={respostasDosha[pergunta.id] === 'Kapha' ? 'default' : 'outline'}
                    onClick={() => handleResponderDosha(pergunta.id, 'Kapha')}
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                  >
                    <span className="font-semibold mr-2">[Kapha]</span> {pergunta.opcaoKapha}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setEtapa(0)}>
              ← Voltar (1/3)
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setEtapa(2)} 
              disabled={!isQuestionarioCompleto}
            >
              Finalizar e Ver Diagnóstico (3/3)
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Etapa 2: Resultados e Análise
  if (etapa === 2) {
    const { contagem, dominante } = calcularDoshaDominante();
    const totalRespostas = perguntasDosha.length;
    
    // Simples lógica de recomendação baseada no Dosha dominante
    let recomendacao = "";
    if (dominante === 'Vatta') {
      recomendacao = "Seu desequilíbrio aponta predominantemente para Vatta. É essencial buscar rotinas de aterramento, alimentação quente, oleosa e nutritiva, e práticas que acalmem o sistema nervoso, como massagens com óleo e meditação.";
    } else if (dominante === 'Pitta') {
      recomendacao = "Seu desequilíbrio aponta predominantemente para Pitta. O foco deve ser em resfriar e acalmar o fogo: evite comidas picantes ou azedas, reduza o estresse competitivo e passe tempo em contato com a natureza ou água.";
    } else {
      recomendacao = "Seu desequilíbrio aponta predominantemente para Kapha. Priorize o movimento, exercícios vigorosos, alimentos leves e aquecidos, e evite o excesso de laticínios e açúcares para combater a letargia e o acúmulo.";
    }

    return (
      <Card className="max-w-4xl mx-auto border-primary/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Análise Preliminar Concluída!</CardTitle>
          <p className="text-sm text-muted-foreground">Este é um resumo automático. Procure um profissional de saúde para um diagnóstico completo.</p>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-4 text-secondary-foreground">Seu Dosha Dominante Atual: <span className="text-red-500">{dominante}</span></h3>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center font-semibold">
            <div className="p-3 bg-blue-100 rounded-lg">Vatta: {contagem.Vatta} de {totalRespostas}</div>
            <div className="p-3 bg-red-100 rounded-lg">Pitta: {contagem.Pitta} de {totalRespostas}</div>
            <div className="p-3 bg-green-100 rounded-lg">Kapha: {contagem.Kapha} de {totalRespostas}</div>
          </div>
          
          <h4 className="font-bold text-lg mt-6">Recomendação Inicial:</h4>
          <p className="mb-6">{recomendacao}</p>

          <h4 className="font-bold text-lg mt-6">Dados de Anamnese Coletados:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><span className="font-semibold">Nome:</span> {dadosPessoais.nome}</li>
            <li><span className="font-semibold">Idade:</span> {dadosPessoais.idade}</li>
            <li><span className="font-semibold">Sintoma Principal:</span> {dadosPessoais.sintoma || 'Não informado'}</li>
            <li><span className="font-semibold">Tipo/Tempo de Desequilíbrio:</span> {dadosPessoais.desequilibrioTipo} / {dadosPessoais.tempoDesequilibrio || 'Não informado'}</li>
          </ul>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setEtapa(1)}>
              ← Revisar Questionário (2/3)
            </Button>
            <Button onClick={() => setEtapa(0)} className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Iniciar Novo Diagnóstico
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default QuestionarioDiagnostico;