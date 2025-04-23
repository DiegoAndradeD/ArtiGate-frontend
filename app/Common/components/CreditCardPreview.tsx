import { motion } from "framer-motion";

interface CreditCardPreviewProps {
  cardNumber: string;
  cardHolderName: string;
  expiration: string;
  cvv: string;
}

export default function CreditCardPreview({
  cardNumber = "",
  cardHolderName = "",
  expiration = "",
  cvv = "",
}: CreditCardPreviewProps) {
  const formattedNumber = cardNumber
    .padEnd(16, "•")
    .replace(/(.{4})/g, "$1 ")
    .trim();
  const formattedName = cardHolderName || "NOME DO TITULAR";
  const formattedExpiration = expiration || "MM/AA";
  const formattedCvv = cvv || "•••";

  return (
    <motion.div
      className="w-96 h-56 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 shadow-xl flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full transform-gpu transition-transform duration-300">
          <div className="text-sm">Cartão Virtual</div>
          <div className="text-2xl tracking-widest font-mono">
            {formattedNumber}
          </div>
          <div className="flex justify-between text-sm mt-4">
            <div>
              <div className="text-xs text-gray-300">Nome</div>
              <div>{formattedName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-300">Validade</div>
              <div>{formattedExpiration}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
