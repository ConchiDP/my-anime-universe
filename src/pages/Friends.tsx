import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Users, UserPlus } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function Friends() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Mis Amigos</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20 space-y-6">
            <div className="flex justify-center">
              <div className="p-6 bg-muted/50 rounded-full">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Sistema de Amigos</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Conecta con otros usuarios, comparte tus listas de anime y descubre nuevas recomendaciones.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                🚧 Esta funcionalidad está en desarrollo
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2" disabled>
                  <UserPlus className="w-4 h-4" />
                  Buscar Amigos
                </Button>
                
                <Button variant="outline" disabled>
                  Ver Solicitudes
                </Button>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-xs text-muted-foreground">
                Próximamente: Buscar usuarios, enviar solicitudes de amistad, 
                ver listas de amigos y recibir recomendaciones personalizadas.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}