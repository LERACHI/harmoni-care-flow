import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function Login() {
  const signIn = async (provider: "google" | "apple") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-xl space-y-4 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Entrar</h1>

        <Button className="w-full" onClick={() => signIn("google")}>
          Entrar com Google
        </Button>

        <Button className="w-full" onClick={() => signIn("apple")}>
          Entrar com Apple
        </Button>
      </div>
    </div>
  );
}
