import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/harmonicare.png";
import imageRight from "@/assets/iogameta1.jpeg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
    arquivos: [] as File[],
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: any) {
    setForm({ ...form, arquivos: Array.from(e.target.files) });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! 🚀");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* HERO SECTION */}
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
                Entre em{" "}
                <span className="bg-gradient-to-r from-primary via-harmonize to-accent bg-clip-text text-transparent">
                  Contato
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Fale conosco para tirar dúvidas, solicitar informações ou enviar mensagens diretamente para nossa equipe.
              </p>

              <p className="text-sm italic text-muted-foreground/70 mt-2">
                Respondemos normalmente em até 24 horas úteis.
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
                className="w-full h-auto rounded-3xl shadow-2xl opacity-90"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-start relative">

          {/* FORM */}
          <div className="bg-card border border-border rounded-3xl shadow-card p-6 md:p-8 animate-slide-up z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              Fale Conosco
            </h2>

            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Envie sua mensagem, sugestão ou dúvida. Estamos aqui para ajudar!
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

              {/* Assunto */}
              <div>
                <label className="block font-medium mb-1">Assunto</label>
                <select
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Suporte">Suporte</option>
                  <option value="Informações">Informações</option>
                  <option value="Parcerias">Parcerias</option>
                  <option value="Sugestões">Sugestões</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block font-medium mb-1">Mensagem</label>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-border h-32 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Escreva sua mensagem..."
                  required
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block font-medium mb-2">
                  Enviar arquivos (PDF, imagens, vídeos, DOC, ZIP...)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFile}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-border cursor-pointer focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-harmonize hover:opacity-90 text-white shadow-lg mt-4"
              >
                Enviar Mensagem
              </Button>

            </form>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative">
            <img
              src={imageRight}
              alt="Decorative Side Illustration"
              className="w-full h-full object-cover rounded-3xl shadow-xl pointer-events-none"
              style={{ filter: "brightness(1.05) contrast(1.05)" }}
            />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
