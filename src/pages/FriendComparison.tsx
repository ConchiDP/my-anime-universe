import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FriendComparison } from '@/components/FriendComparison';
import { useAuth } from '@/hooks/useAuth';
import { useFriends } from '@/hooks/useFriends';
import { ArrowLeft, Users } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function FriendComparisonPage() {
  const { friendId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: friendships, isLoading: friendsLoading } = useFriends();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || friendsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // Encontrar el amigo por ID
  const friendship = friendships?.find(f => 
    (f.requester?.user_id === friendId) || (f.addressee?.user_id === friendId)
  );

  if (!friendship) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/friends" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver a Amigos
              </Link>
            </Button>
          </div>
          
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <div className="p-6 bg-muted/50 rounded-full">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Amigo no encontrado</h2>
            <p className="text-muted-foreground">
              No se pudo encontrar este amigo en tu lista.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Obtener información del amigo (no del usuario actual)
  const friend = friendship.requester?.user_id === user.id 
    ? friendship.addressee 
    : friendship.requester;

  if (!friend) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Error al cargar información del amigo.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/friends" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a Amigos
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Comparar Listas</h1>
        </div>

        <FriendComparison friend={friend} />
      </main>
      <Footer />
    </div>
  );
}