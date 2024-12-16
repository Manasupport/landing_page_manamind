import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";

export const CreateAccount = () => {
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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
    
    // Here you would typically handle the account creation
    toast({
      title: "Compte créé avec succès",
      description: "Vous allez être redirigé vers la page d'accueil",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 bg-manamind p-8 md:p-12 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-white mb-8">Créer votre compte</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="lastName" className="text-white">
                Nom
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="bg-white"
              />
            </div>
            
            <div>
              <Label htmlFor="firstName" className="text-white">
                Prénom
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="bg-white"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100">
            Je crée mon compte
          </Button>
        </form>
      </div>

      {/* Right side - Account Type Selection */}
      <div className="w-full md:w-1/2 bg-black p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-8">Type de compte</h2>
          
          <RadioGroup
            value={accountType}
            onValueChange={setAccountType}
            className="space-y-4"
          >
            {["Enseignant", "Directeur de Master", "Étudiant", "Famille"].map((type) => (
              <div
                key={type}
                className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <RadioGroupItem value={type} id={type} className="text-white" />
                <Label htmlFor={type} className="text-white cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};