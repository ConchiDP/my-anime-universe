import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Loader2, Mail, Send } from 'lucide-react';
import { useSearchUsersAndEmails, useSendEmailInvitation } from '@/hooks/useInvitations';
import { useSendFriendRequest } from '@/hooks/useFriends';

export const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResult, isLoading } = useSearchUsersAndEmails(searchTerm);
  const sendRequest = useSendFriendRequest();
  const sendInvitation = useSendEmailInvitation();

  const handleSendRequest = (userId: string) => {
    sendRequest.mutate(userId);
  };

  const handleSendInvitation = (email: string) => {
    sendInvitation.mutate(email);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, email o invitar por email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {searchTerm.length >= 2 && (
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : searchResult?.isEmail && !searchResult.emailExists ? (
            // Mostrar opción de invitación por email
            <Card className="border-dashed border-2 border-primary/20">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{searchResult.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Esta persona no tiene cuenta. ¡Invítala!
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleSendInvitation(searchResult.email!)}
                  disabled={sendInvitation.isPending}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Invitación
                </Button>
              </CardContent>
            </Card>
          ) : searchResult?.users && searchResult.users.length > 0 ? (
            // Mostrar usuarios existentes
            searchResult.users.map((user) => (
              <Card key={user.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.display_name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      {searchResult.isEmail && (
                        <Badge variant="secondary" className="mt-1">
                          Usuario existente
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSendRequest(user.user_id)}
                    disabled={sendRequest.isPending}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Agregar
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            // No se encontraron resultados
            <p className="text-center text-muted-foreground py-4">
              {searchResult?.isEmail 
                ? "No se encontró usuario con este email" 
                : "No se encontraron usuarios"
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
};