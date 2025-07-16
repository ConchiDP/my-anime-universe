import { PlayCircle, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in">
            Descubre y rastrea tu
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              anime favorito
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Únete a la comunidad de amantes del anime. Descubre nuevos títulos, 
            rastrea tu progreso y comparte tus recomendaciones con amigos.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5"
            >
              <Star className="mr-2 h-5 w-5" />
              Explorar Anime
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Cards */}
      <div className="container relative z-10 mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Descubre Tendencias</h3>
              <p className="text-sm text-muted-foreground">
                Mantente al día con los animes más populares y próximos lanzamientos
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-secondary text-accent-foreground group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rastrea tu Progreso</h3>
              <p className="text-sm text-muted-foreground">
                Lleva un registro de los animes que has visto y los que estás viendo
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conecta con Amigos</h3>
              <p className="text-sm text-muted-foreground">
                Comparte recomendaciones y descubre qué están viendo tus amigos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Popular Anime Preview */}
      <div className="container relative z-10 mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Animes Populares</h2>
          <p className="text-muted-foreground">Explora los títulos más valorados por la comunidad</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="group cursor-pointer hover:scale-105 transition-transform duration-300">
              <CardContent className="p-2">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-2 flex items-center justify-center">
                  <PlayCircle className="h-8 w-8 text-primary/60" />
                </div>
                <h4 className="text-sm font-medium truncate">Anime Título #{item}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">9.{item}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}