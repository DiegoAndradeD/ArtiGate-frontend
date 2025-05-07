import { IdCard, FilePlus, ClipboardCheck } from "lucide-react";
import { CardProps } from "../components/CustomCard";

export const CardsData: CardProps[] = [
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
    path: "submission",
  },
  {
    title: " Avaliação de Artigos",
    description: "Revise e avalie os artigos submetidos por outros autores",
    icon: <ClipboardCheck color="#1e36ae" width={100} height={100} />,
    path: "evaluation",
  },
];
