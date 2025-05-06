import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard } from "lucide-react";

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
    .replace(/(.{4})/g, "$1")
    .trim();
  const formattedName = cardHolderName || "NOME DO TITULAR";
  const formattedExpiration = expiration
    ? format(new Date(expiration), "MM/yy")
    : "MM/AA";
  const formattedCvv = cvv || "•••";

  const isBack = Boolean(cvv);

  return (
    <div className="w-[400px] h-56 perspective">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={isBack ? "back" : "front"}
            initial={{ rotateY: isBack ? -180 : 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: isBack ? 180 : -180 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 shadow-xl backface-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {!isBack ? (
              <div className="flex flex-col justify-between h-full">
                <CreditCard className="mb-4" width={30} height={30} />
                <div className="text-sm">Número do cartão</div>
                <div className="text-2xl tracking-widest font-mono">
                  {formattedNumber}
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <div>
                    <div className="text-xs text-gray-300">Nome</div>
                    <div className="w-[250px] truncate ...">
                      {formattedName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-300">Validade</div>
                    <div>{formattedExpiration}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-start h-full">
                <div className="bg-black h-10 w-full mt-4 rounded-sm"></div>
                <div className="mt-8 px-4">
                  <div className="bg-gray-100 text-black px-4 py-2 rounded-sm text-right text-sm tracking-widest font-mono">
                    {formattedCvv}
                  </div>
                  <div className="text-xs text-gray-300 mt-1 text-right">
                    CVV
                  </div>
                </div>
                <div className="absolute bottom-4 right-6 text-[10px] text-gray-200">
                  Cartão Virtual - Uso exclusivo online
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
