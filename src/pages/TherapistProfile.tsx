// ✅ src/pages/TherapistProfile.tsx

import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  ArrowLeft,
} from "lucide-react";

const therapists = [
  {
    id: 1,
    name: "Ana Silva",
    specialty: "Reiki & Meditação",
    location: "São Paulo, SP",
    address: "Rua das Flores, 120 - Vila Mariana, São Paulo",
    email: "ana.silva@harmoni.com",
    social: {
      instagram: "https://instagram.com/ana.reiki",
      facebook: "https://facebook.com/ana.reiki",
      linkedin: "https://linkedin.com/in/ana-silva-therapist",
    },
    rating: 4.9,
    reviews: 127,
    description:
      "Especialista em terapias energéticas com mais de 10 anos de experiência. Ana Silva é dedicada a ajudar seus clientes a encontrar equilíbrio e bem-estar através de técnicas personalizadas. Profissional apaixonada pelo que faz, Ana combina conhecimento profundo com uma abordagem compassiva para oferecer o melhor cuidado possível.",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    whatsapp: "5511970010001",
  },

  {
    id: 2,
    name: "Carlos Mendes",
    specialty: "Acupuntura & Fitoterapia",
    location: "Rio de Janeiro, RJ",
    address: "Av. Atlântica, 850 - Copacabana, Rio de Janeiro",
    email: "carlos.mendes@harmoni.com",
    social: {
      instagram: "https://instagram.com/carlos.acu",
      facebook: "https://facebook.com/carlos.acu",
      linkedin: "https://linkedin.com/in/carlos-mendes-therapist",
    },
    rating: 4.8,
    reviews: 98,
    description:
       "Mestre em medicina tradicional chinesa e terapias naturais, com vasta experiência em tratamentos integrativos. Carlos Mendes é conhecido por sua abordagem holística e eficaz, ajudando seus pacientes a alcançarem saúde e equilíbrio através de métodos naturais. Seu compromisso com o bem-estar dos clientes faz dele um terapeuta respeitado na área, sempre buscando atualização e aprimoramento contínuo. Profissional dedicado a proporcionar alívio e qualidade de vida através de práticas tradicionais adaptadas às necessidades modernas. Sua paixão pela medicina natural é evidente em cada consulta, onde ele combina conhecimento técnico com empatia e atenção aos detalhes, garantindo tratamentos personalizados que visam o equilíbrio físico e emocional de cada indivíduo. Refletindo seu compromisso com a saúde integral, Carlos está sempre em busca de novas técnicas e abordagens para enriquecer sua prática terapêutica.",

    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    whatsapp: "5521990020002",
  },

  {
    id: 3,
    name: "Mariana Costa",
    specialty: "Aromaterapia & Massagem",
    location: "Belo Horizonte, MG",
    address: "Rua Amarela, 45 - Savassi, Belo Horizonte",
    email: "mariana.costa@harmoni.com",
    social: {
      instagram: "https://instagram.com/mariana.aroma",
      facebook: "https://facebook.com/mariana.aroma",
      linkedin: "https://linkedin.com/in/mariana-costa-therapist",
    },
    rating: 5.0,
    reviews: 156,
    description:
       "Terapeuta holística certificada em diversas modalidades, com foco em bem-estar integral. Mariana Costa utiliza a aromaterapia e técnicas de massagem para promover relaxamento e equilíbrio emocional. Com uma abordagem centrada no cliente, Mariana personaliza cada sessão para atender às necessidades individuais, garantindo uma experiência única e transformadora. Sua paixão pelo cuidado holístico faz dela uma terapeuta respeitada e procurada na área, sempre comprometida com a saúde e o bem-estar de seus clientes. É dedicada a ajudar cada pessoa a alcançar seu potencial máximo de saúde e felicidade. Sua abordagem integrada combina conhecimento técnico com empatia e atenção aos detalhes está sempre atualizada com as últimas tendências e pesquisas em terapias holísticas.",

    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
    whatsapp: "5531990030003",
  },

  {
    id: 4,
    name: "João Santos",
    specialty: "Yoga & Ayurveda",
    location: "Curitiba, PR",
    address: "Rua do Sol, 300 - Centro, Curitiba",
    email: "joao.santos@harmoni.com",
    social: {
      instagram: "https://instagram.com/joao.yoga",
      facebook: "https://facebook.com/joao.yoga",
      linkedin: "https://linkedin.com/in/joao-santos-therapist",
    },
    rating: 4.9,
    reviews: 89,
    description:
       "Instrutor de yoga e consultor em Ayurveda com 8 anos de prática. Formado na Índia, João Santos traz uma abordagem autêntica e profunda para suas aulas e consultas, ajudando seus alunos a alcançarem equilíbrio físico e mental através dessas práticas milenares. Sua paixão pelo yoga e Ayurveda é evidente em seu compromisso com o bem-estar de cada pessoa que atende. Com uma combinação de conhecimento tradicional e técnicas modernas, João oferece uma experiência transformadora para todos que buscam melhorar sua qualidade de vida, seja através da prática do yoga ou dos princípios ayurvédicos. Sua dedicação ao ensino e à cura faz dele um terapeuta respeitado e procurado na área, sempre focado em proporcionar saúde e harmonia aos seus clientes.",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
    whatsapp: "5541990040004",
  },

  {
    id: 5,
    name: "Patricia Lima",
    specialty: "Terapia Floral & Cromoterapia",
    location: "Porto Alegre, RS",
    address: "Rua das Acácias, 77 - Moinhos de Vento, Porto Alegre",
    email: "patricia.lima@harmoni.com",
    social: {
      instagram: "https://instagram.com/patricia.floral",
      facebook: "https://facebook.com/patricia.floral",
      linkedin: "https://linkedin.com/in/patricia-lima-therapist",
    },
    rating: 4.7,
    reviews: 72,
    description:
      "Especialista em essências florais e terapias vibracionais, com foco em equilíbrio emocional. Patricia Lima traz uma abordagem única para o cuidado holístico, utilizando a combinação de terapias florais e cromoterapia para ajudar seus clientes a alcançarem harmonia e bem-estar. Com uma formação sólida e uma paixão pelo que faz, Patricia está comprometida em oferecer tratamentos personalizados que atendam às necessidades individuais de cada pessoa, promovendo saúde e equilíbrio. A sua dedicação ao bem-estar emocional faz dela uma terapeuta confiável e respeitada na área.",

    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop",
    whatsapp: "5551990050005",
  },

  {
    id: 6,
    name: "Roberto Alves",
    specialty: "Reflexologia & Shiatsu",
    location: "Brasília, DF",
    address: "SHN Quadra 2, Bloco B - Brasília",
    email: "roberto.alves@harmoni.com",
    social: {
      instagram: "https://instagram.com/roberto.shiatsu",
      facebook: "https://facebook.com/roberto.shiatsu",
      linkedin: "https://linkedin.com/in/roberto-alves-therapist",
    },
    rating: 4.8,
    reviews: 104,
    description:
      "Terapeuta corporal especializado em reflexologia e shiatsu. Com mais de 12 anos de experiência, Roberto Alves utiliza técnicas orientais e ocidentais para promover saúde e bem-estar aos seus clientes, combinando tradição e inovação em seus tratamentos. Sua abordagem personalizada visa atender às necessidades individuais de cada pessoa. Roberto é conhecido por sua habilidade em aliviar tensões e melhorar a qualidade de vida através de suas técnicas terapêuticas. Seu compromisso com o cuidado integral faz dele um terapeuta respeitado e procurado na área, sempre focado em proporcionar equilíbrio físico e emocional aos seus clientes. Roberto está constantemente aprimorando suas habilidades e conhecimentos para oferecer o melhor atendimento possível, refletindo sua paixão pela terapia corporal e seu desejo de ajudar as pessoas a alcançarem uma vida mais saudável e harmoniosa. Sua dedicação ao bem-estar dos clientes é evidente em cada sessão, onde ele combina expertise técnica com empatia e atenção aos detalhes, garantindo tratamentos eficazes e personalizados.",

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
    whatsapp: "5561990060006",
  },
];

const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const therapist = therapists.find((t) => t.id === Number(id));

  if (!therapist) {
    return <div className="p-10 text-center">Terapeuta não encontrado.</div>;
  }

  const whatsappUrl = `https://wa.me/${therapist.whatsapp}?text=Olá%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais!`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">

          {/* ✅ botão voltar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <img
            src={therapist.image}
            alt={therapist.name}
            className="
              mx-auto rounded-xl object-cover
              w-full
              max-w-[260px]
              md:max-w-[320px]
              h-auto mb-6
            "
          />

          <h1 className="text-3xl font-bold mb-2">{therapist.name}</h1>

          <p className="text-lg text-muted-foreground mb-4">
            {therapist.specialty}
          </p>

          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>
                {therapist.rating} ({therapist.reviews})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{therapist.location}</span>
            </div>
          </div>

          <p className="text-base leading-relaxed mb-8">
            {therapist.description}
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-base">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href={`mailto:${therapist.email}`}
                className="text-primary underline"
              >
                {therapist.email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-base">
              <MapPin className="w-5 h-5" />
              <span>{therapist.address}</span>
            </div>

            <div className="flex items-center gap-4">
              {therapist.social.instagram && (
                <a
                  href={therapist.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="w-6 h-6 text-pink-500" />
                </a>
              )}

              {therapist.social.facebook && (
                <a
                  href={therapist.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                </a>
              )}

              {therapist.social.linkedin && (
                <a
                  href={therapist.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-800 transition" />
                </a>
              )}
            </div>

            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="mr-2" />
              Agendar pelo WhatsApp
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TherapistProfile;
