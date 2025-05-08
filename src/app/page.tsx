"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardsData } from "./data/HomeCards";
import CustomCard from "./components/CustomCard";

export default function Home() {
  const navigate = useRouter();

  return (
    <main className="h-full overflow-y-hidden flex flex-col items-center content-area">
      <section className="w-1/2">
        <div className="w-full flex flex-col gap-4 items-center py-20">
          <h1 className="text-7xl font-bold text-blue-900 text-center">
            Controle de Submissão e Avaliação de Artigos
          </h1>
          <p className="text-2xl italic w-1/2 text-center opacity-65">
            Inscrição, submissão e avaliação de artigos de congressos
          </p>
          <Button
            onClick={() => navigate.push("/subscription")}
            className="bg-blue-950 hover:bg-blue-950/80 text-white text-lg py-6 cursor-pointer"
          >
            REALIZAR INSCRIÇÃO
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {CardsData.map((cardData, idx) => (
            <CustomCard
              key={cardData.title + idx}
              title={cardData.title}
              description={cardData.description}
              icon={cardData.icon}
              path={cardData.path}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
