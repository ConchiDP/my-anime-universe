
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import AnimeDetails from "./pages/AnimeDetails";
import Friends from "./pages/Friends";
import FriendComparison from "./pages/FriendComparison";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Contacto from "./pages/Contacto";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosServicio from "./pages/TerminosServicio";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaCookies from "./pages/PoliticaCookies";
import RGPD from "./pages/RGPD";
import Accesibilidad from "./pages/Accesibilidad";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="anime-tracker-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/search" element={<Search />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/friends/compare/:friendId" element={<FriendComparison />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos-servicio" element={<TerminosServicio />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/politica-cookies" element={<PoliticaCookies />} />
              <Route path="/rgpd" element={<RGPD />} />
              <Route path="/accesibilidad" element={<Accesibilidad />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
