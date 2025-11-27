import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Send, Copy } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si"; // ícones corretos

import LeiteDouradoImg from "@/assets/LeiteDourado.jpeg";
import CalmaBarrigaImg from "@/assets/CalmaBarriga.jpeg";
import TomilhoImg from "@/assets/tomilho.jpeg";
import AspargoImg from "@/assets/CremeAspargos.jpeg";
import BrocolisImg from "@/assets/Brocolis.jpeg";
import KaphaImg from "@/assets/Kapha.jpeg";
import KitchiriImg from "@/assets/Kitchiri.jpeg";
import LegumesImg from "@/assets/legumes.jpeg"; 

// ✅ futuramente você pode puxar do Supabase
const recipes = [
  {
    id: 1,
    title: "🌟 Leite Dourado (Golden Milk) Anti-inflamatório",
    content: `
      Esta bebida milenar da Ayurveda é uma potente combinação que utiliza a cúrcuma (açafrão-da-terra), amplamente reconhecida pelo seu composto ativo, a curcumina, com fortes propriedades anti-inflamatórias e antioxidantes.Foco Terapêutico
      • Ação: Anti-inflamatória, digestiva e reforço da imunidade.
      • Plantas Chave: Cúrcuma (anti-inflamatório) e Pimenta-do-Reino (essencial para ativar a absorção da curcumina).

      ✅ Ingredientes:

      1 xícara (240ml) de Leite Vegetal (amêndoa, coco ou aveia).
      1 colher de chá de Cúrcuma (açafrão-da-terra) em pó.
      1/2 colher de chá de Gengibre fresco ralado ou 1/4 colher de chá em pó (estimulante e digestivo).
      Uma pitada generosa de Pimenta-do-Reino preta moída na hora.
      1/2 colher de chá de Óleo de Coco (melhora a absorção).
      Mel, xarope de agave ou tâmara a gosto (opcional, para adoçar).

      ✅ Modo de Preparo:

      Numa panela pequena, junte o leite vegetal, a cúrcuma, o gengibre, a pimenta-do-reino e o óleo de coco.
      Leve ao fogo médio e mexa constantemente. Deixe aquecer bem, mas sem ferver.
      Quando estiver quente e homogêneo, retire do fogo.
      Coe (se usou gengibre ralado) e adoce a gosto.
      Sirva imediatamente.
      
      ✅ Uso Comestível:
      • Dosagem: 1 copo por dia, de preferência no final da tarde ou antes de dormir, pois o leite morno também ajuda a relaxar.
      • Aviso: O consumo regular é mais eficaz. Por ser anti-inflamatório, pode ajudar em dores articulares e na recuperação muscular.
      • Dica: Pode ser consumido quente ou frio, ideal para noites relaxantes.
      • Precauções: Evite em casos de cálculos biliares ou obstrução biliar.
      • Aproveite os benefícios anti-inflamatórios e reconfortantes do Leite Dourado!
    `,
    image: LeiteDouradoImg,
  },
  {
    id: 2,
    title: "🌼 Infusão \"Calma-Barriga\" (Digestiva e Relaxante)",
    content: `
      Uma infusão clássica, ideal para finalizar refeições ou induzir um estado de calma antes do descanso. A combinação de camomila e funcho atua duplamente no sistema nervoso e digestivo.
      Foco Terapêutico
      Ação: Antiespasmódica (alivia cólicas e gases), ansiolítica leve (acalma o sistema nervoso) e digestiva.
      Plantas Chave: Camomila (Matricaria recutita - relaxante) e Funcho (Foeniculum vulgare - carminativo e digestivo)..

      ✅ Ingredientes:
      1 colher de sopa de Flores de Camomila secas.
      1 colher de chá de Sementes de Funcho (ervas-doce), levemente esmagadas.
      Folhas frescas de Hortelã-Pimenta (opcional, para refrescar e auxiliar na digestão).
      250 ml de água filtrada.
      
      ✅ Modo de preparo:
      1. Aqueça a água sem ferver
      2. Numa chávena ou bule, coloque as flores de camomila, as sementes de funcho esmagadas e as folhas de hortelã.
      3. Despeje a água fervente sobre as plantas.
      4. Tampe e deixe em infusão por 10 minutos.
      5. Coe e consuma morno.


      ✅ Uso Comestível:
      • Dosagem: 1 chávena após as refeições principais ou antes de dormir.
      • Aviso: Ideal para quem sofre de indigestão, cólicas ou ansiedade leve.
    `,
    image: CalmaBarrigaImg,
  },
  {
    id: 3,
    title: "🍯 Xarope Fitoterápico de Tomilho e Gengibre (Vias Aéreas)",
    content: `
     Um xarope caseiro que combina o poder antissético do tomilho com a ação expectorante e aquecedora do gengibre, tudo isso conservado e suavizado pelo mel.
     Foco Terapêutico
     Ação: Expectorante, antissética (especialmente para as vias respiratórias) e imunoestimulante.
     Plantas Chave: Tomilho (Thymus vulgaris - combate bactérias e acalma a tosse) e Gengibre (Zingiber officinale - aquece e estimula a expectoração).

      ✅ Ingredientes:
      1 xícara de água filtrada.
      2 colheres de sopa de Tomilho seco.
      1 pedaço de 5 cm de Gengibre fresco, fatiado.
      1 xícara de Mel puro (de preferência orgânico).
      Suco de 1/2 Limão (rico em vitamina C e potencializa a ação).
      

      ✅ Modo de preparo:
      Ferva a água e adicione o tomilho e o gengibre.
      Deixe em infusão por 15 minutos, depois coe.
      Misture o mel na infusão ainda morna (não fervente) até dissolver completamente.
      Armazene em um frasco de vidro esterilizado, em local fresco e escuro.
      
    `,
    image: TomilhoImg,
  },
  {
    id: 4,
    title: 'Creme de aspargos.',
    content: `
      Um creme suave e nutritivo, perfeito para dias frios ou para quem busca uma alimentação leve e saudável.
      Foco Terapêutico
      Ação: Nutritiva, anti-inflamatória e digestiva.
      Plantas Chave: Aspargos (Asparagus officinalis - diurético e rico em vitaminas).

      ✅ Ingredientes:
      • 1/2 maço de aspargos frescos
      • 3 colheres (sopa) de ghee
      • 2 dentes de alho picados.
      • 2 colheres (sopa) de farinha de cevada
      • 2 copos e meio de creme de leite
      • 1/2 colher (chá) de sal
      • Uma pequena porção de páprica

      ✅ Modo de preparo:
      
      Lave os aspargos e corte-os em pedaços. Aqueça o ghee na panela ou numa frigideira
grossa. Refogue os aspargos no ghee até amolecerem. Reserve-os. Coloque a farinha de
cevada no ghee e adicione o creme de leite aos poucos; mexa até engrossar tendo cuidado
para que a mistura fique homogênea (sem pelotas). Adicione os aspargos e cozinhe em
fogo baixo até que vire um creme. Acrescente o sal e polvilhe a páprica sobre a pre-
paração. Sirva a seguir.
Obs: Bom como acompanhamento de arroz e torradas.

Tempo de preparo: 15 minutos
Rende 3 porções


      ✅ Uso Comestível:
      • Dosagem: 1 prato por refeição principal.
      • Aviso: Ideal para quem busca uma alimentação anti-inflamatória e nutritiva.
    `,
    image: AspargoImg,
  },
  {
    id: 5,
    title: 'Brócolis, couve-flor e cenouras ao vapor',
    content: `
      Uma receita simples e saudável que preserva os nutrientes dos vegetais, ideal para complementar uma dieta equilibrada.
      Foco Terapêutico
      Ação: Nutritiva, antioxidante e digestiva.
      Plantas Chave: Brócolis (Brassica oleracea - rico em vitaminas e minerais).
      
      ✅ Ingredientes:

      1 maço de brócolis
      1 cabeça de couve-flor
      3 cenouras
 

      ✅ Modo de preparo:
      
      Lavar os brócolis e cortá-los em pedaços finos e compridos. Lavar a couve-flor e cortá-la
em pedaços. Raspar as cenouras e cortá-las em quatro tiras finas. Coloque os legumes
em boa uma quantidade de água em uma panela a vapor e deixe-os cozinhando por 10
minutos. Arrume os legumes alternadamente em uma travessa para servir. Vata deve usar
maior quantidade de sal e azeite de oliva ou ghee para condimentar.
Tempo de preparo: 10 minutos
Rende 4 porções

    `, 
    image: BrocolisImg,
  },
  {
    id: 6,
    title: '🍲 Kapha Ayurvédico (Detox e Equilíbrio dos Doshas).',
    content: `
      Uma receita tradicional ayurvédica que ajuda a equilibrar o dosha Kapha, promovendo a desintoxicação e o bem-estar geral.
      Foco Terapêutico
      Ação: Detoxificante, equilibrante dos doshas e nutritiva.
      Plantas Chave: Especiarias ayurvédicas (como gengibre, cominho, coentro).
      
      ✅ Ingredientes:

      1/2 copo de iogurte
      1 copo de água
      2 colheres (chá) de mel
      1/2 colher (chá) de canela
      1/2 colher (chá) de gengibre em pó
      1/2 colher (chá) de pimenta do reino
      1/2 colher (chá) de cominho
      3 favas de cardamomo
      
      ✅ Modo de preparo:

      Bata tudo no liquidificador e sirva. Evite excessos.

    `,
    image: KaphaImg,
  },
  {
    id: 7,
    title: 'Kitchiri Ayurvédico (Refeição Completa e Nutritiva).',
    content: `
      Uma receita ayurvédica tradicional que oferece uma refeição completa, equilibrada e nutritiva, ideal para a digestão e revitalização do corpo.
      Foco Terapêutico
      Ação: Nutritiva, digestiva e equilibrante dos doshas.
      Plantas Chave: Arroz, lentilhas, especiarias ayurvédicas (como açafrão, cominho, gengibre).
      
      ✅ Ingredientes:
      200 gramas de arroz
      250 gramas de dahl (lentilha indiana) partida, lavada e escorrida
      1/4 de couve-flor cortada em pedacinhos
      2 tomates picados
      3 colheres de sopa de ghee
      1/2 xícara de castanhas de caju torradas picadas
      2 colheres (sopa) de manteiga (não pode ser margarina)
      2 colheres (sopa) de gengibre fresco ralado
      2 pimentas frescas amassadas
      1 colher (chá) de cúrcuma
      1 pitada de assa-fétida
      2 colheres (chá) de coentro fresco picado
      sal e pimenta do reino

      ✅ Modo de preparo:

      Ferva o dahl na água salgada e aromatizada com a cúrcuma, até ficar macio. Em outra pa-
nela, aqueça o ghee, e, nele, doure o cominho, a pimenta e o gengibre. Junte a assa-fétida
e a couve-flor. Cozinhe por 5 minutos ou até que comecem a aparecer manchinhas escu-
ras na couve-flor. Acrescente o arroz, deixe levantar fervura, baixe o fogo e tampe. Mexa
de vez em quanto para evitar que grude no fundo da panela. Cinco minutos antes de
retirar, misture os tomates, a pimenta-do-reino e as castanhas-de-caju. Antes de servir,
deixe derreter um pedaço de manteiga sobre o kitchiri e guarneça com coentro picado.
Tempo de preparo: 45 minutos
Rende 4 porções
Obs: o ghee e a assa-fétida podem ser encontrados em lojas de produtos indianos.

    `,
    image: KitchiriImg,
  },
  {
    id: 8,
    title: 'Legumes Picantes.',
    content: `
    Uma receita simples e saborosa que realça o sabor natural dos legumes, enriquecida com ervas aromáticas para benefícios terapêuticos.
    Foco Terapêutico
    Ação: Nutritiva, antioxidante e anti-inflamatória.
    Plantas Chave: Legumes variados (como abobrinha, berinjela, pimentão) e ervas frescas (como alecrim, tomilho).
    
    ✅ Ingredientes:

    1/4 colher (sopa) de óleo de girassol
    1 colher (sopa) de semente de mostarda preta
    1/2 colher (sopa) de pimenta caiena
    1/4 de colher (sopa) de cúrcuma
    1 pitada de assafétida
    1 pitada de sal
    1/4 de pimenta vermelha cortada
    pequenos pedaços de couve-flor
    pequenos pedaços de cabeça de brócolis
    pouca água
    
    ✅ Modo de preparo:

    Em uma panela média, aqueça o óleo. Doure a semente de mostarda até que fique cro-
cante. Adicione a pimenta caiena, a cúrcuma, a assa-fétida e o sal. Refogue a pimenta
vermelha, os pedaços de couve-flor e o brócolis.
Adicione água, cubra e deixe cozinhar em fogo baixo por 10 minutos. Sirva quente.

Tempo de preparo: 10 minutos
Rende 4 porções


    `,
    image: LegumesImg,
  },
];

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const recipeIndex = recipes.findIndex((r) => r.id === Number(id));
  const recipe = recipes[recipeIndex];
  const nextRecipe = recipes[recipeIndex + 1];

  // Scroll to top e fade-in
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFadeIn(true);
    return () => setFadeIn(false);
  }, [id]);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!recipe) {
    return (
      <div className="container mx-auto pt-24 px-4 text-center">
        <p className="text-lg">Receita não encontrada.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate("/content#receitas")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado!");
  };

  const handleWhatsappShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, "_blank");
  };

  const handleTelegramShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}`, "_blank");
  };

  // Receitas relacionadas (até 3 diferentes)
  const relatedRecipes = recipes.filter((r) => r.id !== recipe.id).slice(0, 3);

  return (
    <div className="relative">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div
        className="container mx-auto pt-24 pb-16 px-4 max-w-6xl transition-opacity duration-700"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        {/* Botão voltar */}
        <Button variant="ghost" onClick={() => navigate("/content#receitas")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Conteúdo */}
          <div className="flex-1 flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {recipe.category}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {recipe.time}
              </span>
            </div>

            <pre className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground mb-6">
              {recipe.content}
            </pre>

            {/* Botões de compartilhar */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="w-4 h-4 mr-2" /> Copiar Link
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsappShare}
                className="flex items-center gap-2"
              >
                <SiWhatsapp className="w-4 h-4" /> WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={handleTelegramShare}
                className="flex items-center gap-2"
              >
                <SiTelegram className="w-4 h-4" /> Telegram
              </Button>
            </div>

            {/* Receitas relacionadas */}
            {relatedRecipes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Você também pode gostar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedRecipes.map((r) => (
                    <Link key={r.id} to={`/receita/${r.id}`}>
                      <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer">
                        <img src={r.image} alt={r.title} className="w-full h-40 object-cover" />
                        <div className="p-2 text-center font-medium">{r.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Imagem com gradiente de fundo */}
          <div className="flex-1 relative flex justify-center items-start mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/70 to-white/90 rounded-xl pointer-events-none"></div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-xl shadow-2xl max-w-full h-auto object-cover relative z-10"
            />
          </div>
        </div>

        {/* Próxima receita sugerida */}
        {nextRecipe && (
          <div className="mt-12 text-right">
            <Link to={`/receita/${nextRecipe.id}`}>
              <Button variant="secondary">
                Próxima Receita: {nextRecipe.title}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
