import { Heart, Github, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AT</span>
              </div>
              <span className="font-bold bg-gradient-hero bg-clip-text text-transparent">
                AnimeTracker
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              La plataforma definitiva para los amantes del anime. 
              Descubre, rastrea y comparte tu pasión por el anime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Buscar Anime
                </a>
              </li>
              <li>
                <a href="/my-list" className="text-muted-foreground hover:text-primary transition-colors">
                  Mi Lista
                </a>
              </li>
              <li>
                <a href="/friends" className="text-muted-foreground hover:text-primary transition-colors">
                  Amigos
                </a>
              </li>
              <li>
                <a href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Mi Perfil
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/politica-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos-servicio" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/politica-cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/rgpd" className="text-muted-foreground hover:text-primary transition-colors">
                  Información RGPD
                </a>
              </li>
              <li>
                <a href="/accesibilidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Accesibilidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 AnimeTracker. Hecho con</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para la comunidad anime</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}