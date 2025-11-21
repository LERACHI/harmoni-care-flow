import React from 'react';
// Importações de Layout
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Importação do Novo Questionário
import QuestionarioDiagnostico from '../components/diagnosticos/QuestionarioDiagnostico';
// OBS: Ajuste o caminho '../components/diagnosticos/QuestionarioDiagnostico' se a estrutura de pasta for diferente!


const DiagnosticosPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            {/* Início do Conteúdo Principal da Página */}
            <section className="py-20 px-4 flex-grow bg-muted/20">
                <div className="container mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
                            Encontre Seu Equilíbrio
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Responda ao nosso questionário para receber uma análise preliminar do seu bem-estar.
                        </p>
                    </div>

                    {/* RENDERIZAÇÃO DO QUESTIONÁRIO AQUI */}
                    <QuestionarioDiagnostico />
                    
                </div>
            </section>
            {/* Fim do Conteúdo Principal da Página */}

            <Footer />
        </div>
    );
};

export default DiagnosticosPage;