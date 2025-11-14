import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "Consulta Individual de Reiki",
      category: "Serviços",
      price: 150,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      description: "Sessão de 60 minutos de Reiki para equilíbrio energético",
    },
    {
      id: 2,
      name: "Curso Online de Meditação",
      category: "Cursos",
      price: 297,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
      description: "8 semanas de prática guiada para iniciantes e intermediários",
    },
    {
      id: 3,
      name: "Kit de Óleos Essenciais",
      category: "Produtos",
      price: 89,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
      description: "5 óleos essenciais puros para aromaterapia",
    },
    {
      id: 4,
      name: "E-book: Guia de Autocuidado",
      category: "Materiais",
      price: 39,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
      description: "Manual completo de práticas integrativas para o dia a dia",
    },
    {
      id: 5,
      name: "Sessão de Acupuntura",
      category: "Serviços",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=400&fit=crop",
      description: "Tratamento tradicional chinês com profissional certificado",
    },
    {
      id: 6,
      name: "Workshop de Yoga",
      category: "Workshops",
      price: 120,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop",
      description: "Workshop presencial de 3 horas para todos os níveis",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Nossa <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">Loja</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Produtos e serviços selecionados para seu bem-estar integral
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent text-white">
                    {product.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl font-bold text-primary">
                      R$ {product.price}
                    </span>
                    <Button className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
