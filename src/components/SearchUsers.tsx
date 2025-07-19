import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, UserPlus, Loader2 } from 'lucide-react';
import { useSearchUsers, useSendFriendRequest } from '@/hooks/useFriends';

export const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users = [], isLoading } = useSearchUsers(searchTerm);
  const sendRequest = useSendFriendRequest();

  const handleSendRequest = (userId: string) => {
    sendRequest.mutate(userId);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar usuarios por nombre o email..."
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
          ) : users.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No se encontraron usuarios
            </p>
          ) : (
            users.map((user) => (
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
          )}
        </div>
      )}
    </div>
  );
};