import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, UserMinus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFriends, useRemoveFriend } from '@/hooks/useFriends';
import { useAuth } from '@/hooks/useAuth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const FriendsList = () => {
  const { user } = useAuth();
  const { data: friendships = [], isLoading } = useFriends();
  const removeFriend = useRemoveFriend();

  if (isLoading) {
    return <div className="text-center py-4">Cargando amigos...</div>;
  }

  const handleRemoveFriend = (friendshipId: string) => {
    removeFriend.mutate(friendshipId);
  };

  // Obtener información del amigo (no del usuario actual)
  const getFriendInfo = (friendship: any) => {
    if (friendship.requester?.user_id === user?.id) {
      return friendship.addressee;
    }
    return friendship.requester;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Mis Amigos ({friendships.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {friendships.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-muted/50 rounded-full">
                <Users className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Aún no tienes amigos</p>
              <p className="text-sm text-muted-foreground">
                Busca usuarios y envía solicitudes de amistad para comenzar
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {friendships.map((friendship) => {
              const friend = getFriendInfo(friendship);
              
              return (
                <div key={friendship.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {friend?.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend?.display_name}</p>
                      <p className="text-sm text-muted-foreground">{friend?.email}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Amigos desde {new Date(friendship.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1" asChild>
                      <Link to={`/friends/compare/${friend?.user_id}`}>
                        <Eye className="w-3 h-3" />
                        Comparar Listas
                      </Link>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex items-center gap-1 text-destructive hover:text-destructive"
                        >
                          <UserMinus className="w-3 h-3" />
                          Eliminar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar amistad?</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar a {friend?.display_name} de tu lista de amigos?
                            Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveFriend(friendship.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};