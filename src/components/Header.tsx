import { useState } from 'react';
import { Menu, X, Search, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AT</span>
            </div>
            <span className="hidden font-bold sm:inline-block bg-gradient-hero bg-clip-text text-transparent">
              AnimeTracker
            </span>
          </a>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a
            href="/"
            className="transition-colors hover:text-primary text-foreground/80"
          >
            Inicio
          </a>
          <a
            href="/search"
            className="transition-colors hover:text-primary text-foreground/60"
          >
            Buscar
          </a>
          <a
            href="/trending"
            className="transition-colors hover:text-primary text-foreground/60"
          >
            Tendencias
          </a>
          <a
            href="/my-list"
            className="transition-colors hover:text-primary text-foreground/60"
          >
            Mi Lista
          </a>
          <a
            href="/friends"
            className="transition-colors hover:text-primary text-foreground/60"
          >
            Amigos
          </a>
        </nav>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearch} className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar anime..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="/auth">Iniciar Sesión</a>
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                <a href="/auth">Registrarse</a>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
            >
              Inicio
            </a>
            <a
              href="/search"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-primary hover:bg-accent rounded-md"
            >
              Buscar
            </a>
            <a
              href="/trending"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-primary hover:bg-accent rounded-md"
            >
              Tendencias
            </a>
            <a
              href="/my-list"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-primary hover:bg-accent rounded-md"
            >
              Mi Lista
            </a>
            <a
              href="/friends"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-primary hover:bg-accent rounded-md"
            >
              Amigos
            </a>
            {!isAuthenticated && (
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/auth">Iniciar Sesión</a>
                </Button>
                <Button className="w-full bg-gradient-primary hover:opacity-90" asChild>
                  <a href="/auth">Registrarse</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}