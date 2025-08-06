import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Contacto</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:conchidiazprogramacion@gmail.com" className="text-primary hover:underline">
                      conchidiazprogramacion@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-muted-foreground">España</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soporte Técnico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Si tienes algún problema técnico, pregunta sobre la aplicación o sugerencia de mejora, 
                  no dudes en contactarnos.
                </p>
                <p className="text-sm text-muted-foreground">
                  Tiempo de respuesta habitual: 24-48 horas
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Sobre AnimeTracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AnimeTracker es una plataforma desarrollada con pasión para la comunidad anime. 
                Nuestro objetivo es proporcionar la mejor experiencia para descubrir, rastrear y 
                compartir tu amor por el anime.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;