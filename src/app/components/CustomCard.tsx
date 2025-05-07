"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

const CustomCard = ({ title, description, icon, path }: CardProps) => {
  const navigate = useRouter();

  const handleClick = () => {
    if (path) navigate.push(path);
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
export default CustomCard;
