import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";
import { GraduationCap, BookOpen, User, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const accountTypes = [
    { id: "Enseignant", icon: GraduationCap },
    { id: "Directeur de Master", icon: BookOpen },
    { id: "Étudiant", icon: User },
    { id: "Famille", icon: Home },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) {
      toast({
        title: "Type de compte requis",
        description: "Veuillez sélectionner un type de compte",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Compte créé avec succès",
      description: "Vous allez être redirigé vers la page d'accueil",
    });
    
    navigate("/success");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-manamind p-8 md:p-12 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <h2 className="text-4xl font-bold text-black mb-12">Créez et animez vos parcours</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="lastName" className="text-black text-lg uppercase">
                Nom
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="bg-white/90 backdrop-blur-sm border-0 h-12 text-lg"
                placeholder="OTMANI"
              />
            </div>
            
            <div>
              <Label htmlFor="firstName" className="text-black text-lg uppercase">
                Prénom
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="bg-white/90 backdrop-blur-sm border-0 h-12 text-lg"
                placeholder="Yanis"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-black text-lg uppercase">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/90 backdrop-blur-sm border-0 h-12 text-lg"
                placeholder="hello@reallygreatsite.com"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 h-12 text-lg font-medium">
            Je crée mon compte
          </Button>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-black p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-white mb-12">
            Choisis le type de compte qui te correspond
          </h2>
          
          <RadioGroup
            value={accountType}
            onValueChange={setAccountType}
            className="grid grid-cols-2 gap-4"
          >
            {accountTypes.map(({ id, icon: Icon }) => (
              <div
                key={id}
                className="relative"
              >
                <RadioGroupItem
                  value={id}
                  id={id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={id}
                  className="flex flex-col items-center justify-center p-4 bg-manamind/20 hover:bg-manamind/30 rounded-lg cursor-pointer transition-all peer-checked:bg-manamind peer-checked:text-black"
                >
                  <Icon className="h-12 w-12 mb-2 text-white peer-checked:text-black" />
                  <span className="text-center font-medium text-white peer-checked:text-black">{id}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};