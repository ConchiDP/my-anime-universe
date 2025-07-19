import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, Send } from 'lucide-react';
import { usePendingRequests, useRespondToRequest } from '@/hooks/useFriends';

export const FriendRequests = () => {
  const { data: requests, isLoading } = usePendingRequests();
  const respondToRequest = useRespondToRequest();

  if (isLoading) {
    return <div className="text-center py-4">Cargando solicitudes...</div>;
  }

  const handleRespond = (requestId: string, action: 'accepted' | 'declined') => {
    respondToRequest.mutate({ requestId, action });
  };

  return (
    <div className="space-y-6">
      {/* Solicitudes recibidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Solicitudes Recibidas ({requests?.received.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests?.received.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No tienes solicitudes pendientes
            </p>
          ) : (
            <div className="space-y-3">
              {requests?.received.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {request.requester?.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.requester?.display_name}</p>
                      <p className="text-sm text-muted-foreground">{request.requester?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRespond(request.id, 'accepted')}
                      disabled={respondToRequest.isPending}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Aceptar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRespond(request.id, 'declined')}
                      disabled={respondToRequest.isPending}
                      className="flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Solicitudes enviadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Solicitudes Enviadas ({requests?.sent.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests?.sent.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No has enviado solicitudes
            </p>
          ) : (
            <div className="space-y-3">
              {requests?.sent.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {request.addressee?.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.addressee?.display_name}</p>
                      <p className="text-sm text-muted-foreground">{request.addressee?.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pendiente
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};