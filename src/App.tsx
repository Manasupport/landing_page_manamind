import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

import Index from "./pages/Index";
import { CreateAccount } from "./components/CreateAccount";
import { Success } from "./pages/Success";
import AboutPage from "./pages/About";
import Ressources from "./pages/ressources"; // <-- AJOUT

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ressources" element={<Ressources />} /> {/* <-- AJOUT */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <Analytics /> {/* Ajout de Vercel Analytics ici */}
  </QueryClientProvider>
);

export default App;
