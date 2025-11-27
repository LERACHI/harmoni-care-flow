import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setLoading(false);

      const { data } = await supabase
        .from("favorites")
        .select("therapists(*)")
        .eq("user_id", user.id);

      setFavorites(data || []);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4 container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Meus Favoritos</h1>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="w-full h-20 rounded-xl" />
            <Skeleton className="w-full h-20 rounded-xl" />
          </div>
        ) : favorites.length === 0 ? (
          <p className="text-muted-foreground">Nenhum favorito ainda.</p>
        ) : (
          <div className="space-y-4">
            {favorites.map((f) => (
              <Link
                key={f.therapists.id}
                to={`/terapeutas/${f.therapists.id}`}
                className="p-4 border rounded-xl flex items-center gap-4 hover:bg-accent/10"
              >
                <img
                  src={f.therapists.image}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{f.therapists.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {f.therapists.specialty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
