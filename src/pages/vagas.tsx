import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TrabalheConosco() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    area: "",
    experiencia: "",
    portfolio: "",
    mensagem: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    alert("Formulário enviado com sucesso! 🚀");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* HERO SECTION — igual ao estilo da Home */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Faça Parte da{" "}
                <span className="bg-gradient-to-r from-primary via-harmonize to-accent bg-clip-text text-transparent">
                  HarmoniCare
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Estamos em busca de terapeutas, profissionais de bem-estar e criadores apaixonados por cuidado e equilíbrio.
              </p>

              <p className="text-sm italic text-muted-foreground/70 mt-2">
                Envie seus dados e entraremos em contato.
              </p>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={heroImage}
                className="w-full h-auto rounded-3xl shadow-2xl animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl bg-card border border-border rounded-3xl shadow-card p-8 md:p-10 animate-slide-up">

          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
            Envie sua Candidatura
          </h2>

          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Preencha o formulário abaixo e conte um pouco sobre sua trajetória e sua área de atuação.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nome */}
            <div>
              <label className="block font-medium mb-1">Nome completo</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                placeholder="Seu nome"
                required
              />
            </div>

            {/* Email + Telefone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Telefone</label>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                  placeholder="(DDD) 00000-0000"
                />
              </div>
            </div>

            {/* Área */}
            <div>
              <label className="block font-medium mb-1">Área de atuação</label>
              <select
                name="area"
                value={form.area}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                required
              >
                <option value="">Selecione...</option>
                <option value="Terapias Integrativas">Terapias Integrativas</option>
                <option value="Psicoterapia">Psicoterapia</option>
                <option value="Reiki">Reiki</option>
                <option value="Massoterapia">Massoterapia</option>
                <option value="Yoga / Meditação">Yoga / Meditação</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Experiência */}
            <div>
              <label className="block font-medium mb-1">Experiência</label>
              <textarea
                name="experiencia"
                value={form.experiencia}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-xl border border-border h-28 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Conte sobre sua trajetória"
                required
              />
            </div>

            {/* Portfólio */}
            <div>
              <label className="block font-medium mb-1">Portfólio / Links</label>
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                placeholder="Instagram, Site, LinkedIn, etc."
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block font-medium mb-1">Mensagem adicional</label>
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-xl border border-border h-28 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Fale mais sobre você"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-harmonize hover:opacity-90 text-white shadow-lg mt-4"
            >
              Enviar Candidatura
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
