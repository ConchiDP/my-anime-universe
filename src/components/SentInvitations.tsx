import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Clock, CheckCircle, XCircle, Mail } from 'lucide-react';
import { useSentInvitations } from '@/hooks/useInvitations';

export const SentInvitations = () => {
  const { data: invitations = [], isLoading } = useSentInvitations();

  if (isLoading) {
    return <div className="text-center py-4">Cargando invitaciones...</div>;
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pendiente', 
          icon: Clock, 
          color: 'bg-yellow-500',
          variant: 'outline' as const 
        };
      case 'accepted':
        return { 
          label: 'Aceptada', 
          icon: CheckCircle, 
          color: 'bg-green-500',
          variant: 'secondary' as const 
        };
      case 'expired':
        return { 
          label: 'Expirada', 
          icon: XCircle, 
          color: 'bg-red-500',
          variant: 'destructive' as const 
        };
      default:
        return { 
          label: status, 
          icon: Clock, 
          color: 'bg-gray-500',
          variant: 'outline' as const 
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Invitaciones Enviadas ({invitations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {invitations.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-muted/50 rounded-full">
                <Mail className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">No has enviado invitaciones</p>
              <p className="text-sm text-muted-foreground">
                Busca por email para invitar a amigos que no tienen la app
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.map((invitation) => {
              const statusInfo = getStatusInfo(invitation.status);
              const Icon = statusInfo.icon;
              const daysSent = Math.floor(
                (new Date().getTime() - new Date(invitation.created_at).getTime()) / 
                (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={invitation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        <Mail className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Enviada hace {daysSent === 0 ? 'hoy' : `${daysSent} día${daysSent > 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    {statusInfo.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};