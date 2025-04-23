import { ClipboardCheck, FilePlus, IdCard } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

const CardsData: CardProps[] = [
  {
    title: " Inscrição de Participantes",
    description:
      "Cadastre-se como participante para o congresso de forma simples e rápida",
    icon: <IdCard color="#1e36ae" width={100} height={100} />,
    path: "subscription",
  },
  {
    title: "Submissão de Artigo",
    description:
      "Envie artigos para avaliação, acompanhe e gerencie as submissões",
    icon: <FilePlus color="#1e36ae" width={100} height={100} />,
    path: "",
  },
  {
    title: " Avaliação de Artigos",
    description: "Revise e avalie os artigos submetidos por outros autores",
    icon: <ClipboardCheck color="#1e36ae" width={100} height={100} />,
    path: "",
  },
];

const CustomCard = ({ title, description, icon, path }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer w-[300px] hover:!bg-[#61727C]/10 hover:!border-blue-950 zoom-in"
    >
      <CardHeader>
        <CardTitle className="flex flex-col items-center justify-center">
          {icon}
          <p className="opacity-100 text-3xl font-bold text-blue-950 text-center">
            {title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export function Welcome() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <main className="h-screen overflow-y-hidden flex flex-col items-center">
      <div className="bg-blue-950 w-full h-16"></div>
      <section className="w-1/2">
        <div className="w-full flex flex-col gap-4 items-center py-20">
          <h1 className="text-7xl font-bold text-blue-900 text-center">
            Controle de Submissão e Avaliação de Artigos
          </h1>
          <p className="text-2xl italic w-1/2 text-center opacity-65">
            Inscrição, submissão e avaliação de artigos de congressos
          </p>
          <Button
            onClick={() => navigate("/subscription")}
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
