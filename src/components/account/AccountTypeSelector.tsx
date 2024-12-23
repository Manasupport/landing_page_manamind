import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { GraduationCap, BookOpen, User, Home } from "lucide-react";
import { motion } from "framer-motion";

interface AccountTypeSelectorProps {
  accountType: string;
  setAccountType: (type: string) => void;
}

export const AccountTypeSelector = ({ accountType, setAccountType }: AccountTypeSelectorProps) => {
  const accountTypes = [
    { id: "Professeur permanent", icon: GraduationCap },
    { id: "Professeur vacataire", icon: User },
    { id: "Institution", icon: Home },
    { id: "Directeur de Master", icon: BookOpen },
  ];

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold text-white mb-8 animate-fade-in">
        Choisis le type de compte qui te correspond
      </h2>

      <RadioGroup
        value={accountType}
        onValueChange={setAccountType}
        className="grid grid-cols-2 gap-4"
      >
        {accountTypes.map(({ id, icon: Icon }) => (
          <motion.div
            key={id}
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RadioGroupItem value={id} id={id} className="peer sr-only" />
            <Label
              htmlFor={id}
              className="flex flex-col items-center justify-center p-6 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all peer-checked:bg-manamind peer-checked:text-black peer-checked:scale-105 peer-checked:shadow-lg"
            >
              <Icon className="h-12 w-12 mb-2 text-white peer-checked:text-black transition-colors" />
              <span className="text-center font-medium text-white peer-checked:text-black transition-colors">
                {id}
              </span>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};