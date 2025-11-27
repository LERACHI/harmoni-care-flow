import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

export default function TherapistDashboard() {
  const [slots, setSlots] = useState<any[]>([]);
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    const { data } = await supabase
      .from("therapist_slots")
      .select("*")
      .eq("therapist_id", 1);

    setSlots(data || []);
  };

  const addSlot = async () => {
    await supabase.from("therapist_slots").insert({
      therapist_id: 1,
      slot: newSlot,
      is_available: true,
    });

    setNewSlot("");
    loadSlots();
  };

  const toggleSlot = async (id: string, value: boolean) => {
    await supabase
      .from("therapist_slots")
      .update({ is_available: !value })
      .eq("id", id);

    loadSlots();
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Agenda</h1>

        <div className="flex gap-2 mb-6">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Ex: 12/12 - 14:00"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
          <Button onClick={addSlot}>Adicionar</Button>
        </div>

        <div className="space-y-3">
          {slots.map((s) => (
            <div
              key={s.id}
              className="p-4 border rounded-xl flex justify-between"
            >
              <span>{s.slot}</span>
              <Button
                variant={s.is_available ? "default" : "destructive"}
                onClick={() => toggleSlot(s.id, s.is_available)}
              >
                {s.is_available ? "Disponível" : "Indisponível"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
