// src/components/UserList.tsx

import { useEffect, useState } from "react";
// Assumindo que você renomeou o arquivo de inicialização para client.ts
import { supabase } from "@/integrations/supabase/client"; 

// 1. Definição de uma Interface para o Usuário (Melhor Prática TS)
interface UserProfile {
  id: string;
  username: string | null;
  email: string;
  // Adicione outras colunas da sua tabela 'profiles' aqui
}

// 2. Mock de Fallback (Mais limpo e reutilizável)
const FALLBACK_USERS: UserProfile[] = [
  { id: "mock-1", username: "Usuário Mock 1", email: "mock1@exemplo.com" },
  { id: "mock-2", username: "Usuário Mock 2", email: "mock2@exemplo.com" },
];

export default function UserList() {
  // Tipagem forte para o estado
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error: supabaseError } = await supabase
          .from("profiles")
          .select("*")
          .returns<UserProfile[]>(); // Tipagem do retorno

        if (supabaseError) {
          // Em caso de erro de conexão/permissão, registramos o erro
          console.error("Erro ao buscar usuários do Supabase:", supabaseError.message);
          setError(supabaseError.message);
          // Usa o mock de fallback
          setUsers(FALLBACK_USERS);
        } else if (data) {
          // Sucesso: Define os dados reais
          setUsers(data);
        } else {
            // Caso data seja null/undefined (improvável com .select('*') bem sucedido)
            console.warn("Nenhum dado retornado, usando fallback.");
            setUsers(FALLBACK_USERS);
        }
      } catch (err) {
        // Erro inesperado no código (ex: SupabaseClient não definido)
        console.error("Erro inesperado durante a busca de usuários:", err);
        setError("Erro de código ao buscar dados.");
        setUsers(FALLBACK_USERS);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  
  // Exibir mensagem de erro se houver falha na busca E não for um ambiente de mock
  if (error && users.length === FALLBACK_USERS.length && users[0].id.startsWith('mock')) {
    // Se o erro for real, mas o mock está sendo exibido, mostramos um alerta
    return (
      <div style={{ padding: '20px', border: '1px solid red' }}>
        <p>⚠️ **Alerta:** Falha na conexão com o DB. Exibindo dados de desenvolvimento (Mock). ({error})</p>
        <UserDisplayList users={users} />
      </div>
    );
  }

  // Renderização normal da lista
  return <UserDisplayList users={users} />;
}

// 3. Componente de Renderização Separado (Melhor Legibilidade)
interface UserDisplayListProps {
    users: UserProfile[];
}

function UserDisplayList({ users }: UserDisplayListProps) {
    return (
        <div>
            <h1>Lista de Usuários ({users.length} encontrados)</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username ? user.username : `ID: ${user.id} | Email: ${user.email}`}
                    </li>
                ))}
            </ul>
            {users.length === 0 && <p>Nenhum usuário encontrado (tabela vazia).</p>}
        </div>
    );
}