// src/hooks/useAuth.tsx

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
// Importa o cliente Supabase REAL (assumindo que client.ts está corrigido)
import { supabase } from "@/integrations/supabase/client"; 
import { User } from "@supabase/supabase-js"; // Importa o tipo User do Supabase

// 1. Tipagem das Props e do Contexto (Crucial para TS)
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, username: string) => Promise<any>;
  signOut: () => Promise<void>;
}

// 2. Criação do Contexto com Tipagem e Valor Inicial (null as any é evitado)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provedor de Autenticação
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Estado tipado para o usuário
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega sessão ao abrir app e configura o listener
  useEffect(() => {
    // Função para carregar a sessão inicial
    const loadSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        // A sessão pode ter 'session.user' ou ser null
        setUser(data.session?.user ?? null); 
      } catch (err) {
        console.error("Erro ao carregar sessão:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    // Configura o listener para mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Garante que o loading seja setado para false assim que a primeira mudança ocorrer
      setLoading(false); 
    });

    // Limpeza do listener na desmontagem
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Função de login
  const signIn = async (email: string, password: string) => {
    try {
      return await supabase.auth.signInWithPassword({ email, password });
    } catch (err) {
      console.error("Erro no signIn:", err);
      // Retorna o erro de forma consistente para ser tratado pelo componente
      return { data: null, error: { message: "Erro de rede ou cliente." } }; 
    }
  };

  // Função de cadastro (ATENÇÃO: Melhoria da lógica de perfis)
  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        // Adiciona metadados para serem acessados imediatamente após o cadastro
        options: {
            data: {
                username: username
            }
        }
      });

      if (authError) return { data: null, error: authError };
      
      // O Supabase DEVE criar automaticamente um perfil via Trigger/RLS
      // Se você ainda precisa de uma inserção manual, faça:
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user?.id,
          username,
          email,
        })
        .select(); // Adicionar .select() para garantir a execução

      if (profileError) {
        // ATENÇÃO: Se a inserção do perfil falhar, o usuário já está criado no Auth.
        // Você pode querer chamar supabase.auth.signOut() aqui para desfazer a criação do usuário.
        console.error("Erro ao inserir perfil após cadastro:", profileError);
        // Exemplo de como desfazer a ação (opcional, dependendo da sua estratégia de DB)
        // await supabase.auth.signOut(); 
        return { data: authData, error: profileError }; 
      }

      return { data: authData, error: null };
      
    } catch (err) {
      console.error("Erro no signUp:", err);
      return { data: null, error: { message: "Erro inesperado durante o cadastro." } };
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      // Use a chamada real do Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer signOut:", error);
      }
      setUser(null);
    } catch (err) {
      console.error("Erro no signOut:", err);
    }
  };

  const value: AuthContextType = { user, loading, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook de Consumo (useAuth)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};