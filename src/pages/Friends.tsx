import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Users, UserPlus, Clock } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { SearchUsers } from '@/components/SearchUsers';
import { FriendRequests } from '@/components/FriendRequests';
import { FriendsList } from '@/components/FriendsList';

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
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Mis Amigos
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Buscar
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Solicitudes
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="friends" className="space-y-4">
                <FriendsList />
              </TabsContent>

              <TabsContent value="search" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Buscar Nuevos Amigos</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Encuentra otros usuarios por nombre o email para agregar a tu lista de amigos.
                    </p>
                  </div>
                  <SearchUsers />
                </div>
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gestionar Solicitudes</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Revisa las solicitudes de amistad que has enviado y recibido.
                    </p>
                  </div>
                  <FriendRequests />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}