import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuestionarioDiagnostico from "@/components/diagnosticos/QuestionarioDiagnostico";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type RecommendationKey = "A" | "B" | "C" | "D" | "E" | "F";

const recommendations: Record<
  RecommendationKey,
  { title: string; path: string; objective: string }
> = {
  A: {
    title: "Sintomas físicos + ansiedade/tensão",
    path: "Yoga suave, respiração (Pranayama) e aromaterapia calmante (lavanda, bergamota, ylang-ylang).",
    objective: "Relaxar o sistema nervoso.",
  },
  B: {
    title: "Cansaço, apatia, energia baixa",
    path: "Nutrição energética, fitoterapia leve e meditação guiada curta (gengibre, hortelã, alecrim).",
    objective: "Tonificar energia e clareza mental.",
  },
  C: {
    title: "Estresse alto, sobrecarga mental, tensão muscular",
    path: "Yoga restaurativo, respiração 4-7-8, aromaterapia e rotina de autocuidado.",
    objective: "Desarmar o sistema simpático.",
  },
  D: {
    title: "Insônia, irritabilidade ou digestão lenta",
    path: "MTC simplificada, ervas digestivas e meditação noturna (melissa, camomila, funcho, cúrcuma).",
    objective: "Harmonizar eixo digestivo–emocional.",
  },
  E: {
    title: "Desconexão corpo–mente",
    path: "Meditação sensorial, grounding e yoga leve.",
    objective: "Trazer presença e estabilidade.",
  },
  F: {
    title: "Prevenção e manutenção",
    path: "Rotina de autocuidado, nutrição consciente, mantras e meditações curtas (Om Shanti).",
    objective: "Prevenir desequilíbrios e manter bem-estar.",
  },
};

const symptomOptions = [
  "Cansaço constante",
  "Tensão muscular",
  "Dor nas costas",
  "Sono irregular/insônia",
  "Digestão lenta/azia",
  "Baixa imunidade",
  "Nenhum sintoma relevante",
] as const;

const emotionOptions = [
  "Ansiedade",
  "Irritabilidade",
  "Tristeza",
  "Apatia",
  "Sobrecarga mental",
  "Equilíbrio emocional",
] as const;

const routineOptions = [
  "Muito corrida",
  "Equilibrada",
  "Sedentária",
  "Muito estressante",
  "Equilibrada com pausas",
] as const;

const foodOptions = [
  "Rica em industrializados",
  "Rica em carboidratos simples",
  "Balanceada",
  "Irregular",
  "Natural e fresca",
] as const;

const practiceOptions = ["Nunca", "Poucas vezes", "Às vezes", "Frequentemente"] as const;
const flowOptions = ["Travado/pesado", "Acelerado", "Irregular", "Fluido", "Não sei"] as const;
const tempOptions = ["Frio", "Calor", "Oscila", "Nenhum"] as const;

const DiagnosticosPage = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [energy, setEnergy] = useState("");
  const [emotions, setEmotions] = useState<string[]>([]);
  const [relax, setRelax] = useState("");
  const [routine, setRoutine] = useState("");
  const [food, setFood] = useState("");
  const [practices, setPractices] = useState("");
  const [disconnected, setDisconnected] = useState("");
  const [flow, setFlow] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const result = useMemo<RecommendationKey>(() => {
    const hasPhysical = symptoms.some(s =>
      ["Cansaço", "Tensão", "Dor", "Sono irregular", "Digestão", "Baixa imunidade"].some(key =>
        s.toLowerCase().includes(key.toLowerCase()),
      ),
    );
    const hasAnxiety = emotions.includes("Ansiedade") || emotions.includes("Sobrecarga mental");
    const hasStress =
      emotions.includes("Sobrecarga mental") || routine === "Muito estressante" || relax === "Sempre";
    const hasLowEnergy = symptoms.includes("Cansaço constante") || energy === "Baixíssima";
    const hasSleepDigest =
      symptoms.includes("Sono irregular/insônia") ||
      symptoms.includes("Digestão lenta/azia") ||
      temperature === "Oscila";
    const hasDisconnect =
      disconnected === "Frequentemente" || disconnected === "Sempre" || flow === "Travado/pesado";

    if (hasPhysical && hasAnxiety) return "A";
    if (hasLowEnergy || emotions.includes("Apatia")) return "B";
    if (hasStress || symptoms.includes("Tensão muscular")) return "C";
    if (hasSleepDigest || emotions.includes("Irritabilidade")) return "D";
    if (hasDisconnect || practices === "Nunca") return "E";
    return "F";
  }, [symptoms, emotions, relax, routine, energy, temperature, flow, disconnected, practices]);

  const allAnswered =
    energy &&
    relax &&
    routine &&
    food &&
    practices &&
    disconnected &&
    flow &&
    temperature;

    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-5xl space-y-10" id="diagnosticos-top">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Catálogo de Diagnósticos</h1>
            <p className="text-lg text-muted-foreground">
              Comece pelo diagnóstico geral e, se quiser aprofundar, avance para o questionário detalhado.
            </p>
          </div>

          <section className="space-y-6">
            <div className="rounded-3xl border border-primary/20 bg-white shadow-lg shadow-primary/10 p-6 md:p-8">
              <div className="flex flex-col items-center text-center gap-2 mb-6">
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">Diagnóstico Geral Inicial</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  🧭 Terapias Integrativas (para iniciantes)
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-muted/40 p-4 bg-muted/10">
                    <h3 className="font-semibold text-foreground mb-3">1. Estado Físico Básico</h3>
                    <div className="space-y-2">
                      {symptomOptions.map(option => (
                        <Label key={option} className="flex items-center gap-2 text-sm text-foreground">
                          <Checkbox
                            checked={symptoms.includes(option)}
                            onCheckedChange={checked => {
                              setSymptoms(prev =>
                                checked ? [...prev, option] : prev.filter(item => item !== option),
                              );
                            }}
                          />
                          {option}
                        </Label>
                      ))}
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">1.2 Energia diária</p>
                      <RadioGroup
                        value={energy}
                        onValueChange={setEnergy}
                        className="grid grid-cols-2 gap-2 text-sm text-foreground"
                      >
                        {["Baixíssima", "Moderada", "Alta", "Oscilante"].map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-muted/40 p-4 bg-muted/10 space-y-3">
                    <h3 className="font-semibold text-foreground">2. Estado Emocional</h3>
                    <div className="space-y-2">
                      {emotionOptions.map(option => (
                        <Label key={option} className="flex items-center gap-2 text-sm text-foreground">
                          <Checkbox
                            checked={emotions.includes(option)}
                            onCheckedChange={checked => {
                              setEmotions(prev =>
                                checked ? [...prev, option] : prev.filter(item => item !== option),
                              );
                            }}
                          />
                          {option}
                        </Label>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">2.2 Dificuldade em relaxar</p>
                      <RadioGroup
                        value={relax}
                        onValueChange={setRelax}
                        className="grid grid-cols-2 gap-2 text-sm text-foreground"
                      >
                        {["Nunca", "Às vezes", "Frequentemente", "Sempre"].map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-muted/40 p-4 bg-muted/10 space-y-3">
                    <h3 className="font-semibold text-foreground">3. Estilo de Vida</h3>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">3.1 Rotina</p>
                      <RadioGroup value={routine} onValueChange={setRoutine} className="space-y-2 text-sm">
                        {routineOptions.map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">3.2 Alimentação</p>
                      <RadioGroup value={food} onValueChange={setFood} className="space-y-2 text-sm">
                        {foodOptions.map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-muted/40 p-4 bg-muted/10 space-y-3">
                    <h3 className="font-semibold text-foreground">4. Conexão Corpo–Mente</h3>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">4.1 Práticas (meditação, yoga, respiração)</p>
                      <RadioGroup value={practices} onValueChange={setPractices} className="space-y-2 text-sm">
                        {practiceOptions.map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">4.2 Sensação de desconexão</p>
                      <RadioGroup value={disconnected} onValueChange={setDisconnected} className="space-y-2 text-sm">
                        {["Nunca", "Às vezes", "Frequentemente", "Sempre"].map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-muted/40 p-4 bg-muted/10 space-y-3">
                    <h3 className="font-semibold text-foreground">5. Sensibilidade Energética / MTC</h3>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">5.1 Fluxo interno</p>
                      <RadioGroup value={flow} onValueChange={setFlow} className="grid grid-cols-2 gap-2 text-sm">
                        {flowOptions.map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">5.2 Temperatura</p>
                      <RadioGroup
                        value={temperature}
                        onValueChange={setTemperature}
                        className="grid grid-cols-2 gap-2 text-sm"
                      >
                        {tempOptions.map(option => (
                          <Label key={option} className="flex items-center gap-2 rounded-lg border p-2">
                            <RadioGroupItem value={option} />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-muted/40 p-4 bg-white">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-primary font-semibold">Sugestão inicial</p>
                    {allAnswered ? (
                      <>
                        <h3 className="text-xl font-semibold text-foreground">
                          Porta de entrada: {result} — {recommendations[result].title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{recommendations[result].path}</p>
                        <p className="text-xs text-primary mt-2">{recommendations[result].objective}</p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Responda todas as perguntas para ver a porta de entrada recomendada.
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSymptoms([]);
                      setEnergy("");
                      setEmotions([]);
                      setRelax("");
                      setRoutine("");
                      setFood("");
                      setPractices("");
                      setDisconnected("");
                      setFlow("");
                      setTemperature("");
                    }}
                  >
                    Limpar respostas
                  </Button>
                </div>
              </div>
            </div>

          </section>

          <QuestionarioDiagnostico />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiagnosticosPage;
