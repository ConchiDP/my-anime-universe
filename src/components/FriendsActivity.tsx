import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Play, CheckCircle, Pause, X, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useFriendsActivity, FriendActivity } from '@/hooks/useFriendsActivity';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'watching':
      return { label: 'Viendo', icon: Play, color: 'bg-blue-500' };
    case 'completed':
      return { label: 'Completado', icon: CheckCircle, color: 'bg-green-500' };
    case 'on_hold':
      return { label: 'En pausa', icon: Pause, color: 'bg-yellow-500' };
    case 'dropped':
      return { label: 'Abandonado', icon: X, color: 'bg-red-500' };
    case 'plan_to_watch':
      return { label: 'Planea ver', icon: PlusCircle, color: 'bg-gray-500' };
    default:
      return { label: status, icon: Play, color: 'bg-gray-500' };
  }
};

const ActivityItem = ({ activity }: { activity: FriendActivity }) => {
  const statusInfo = getStatusInfo(activity.status);
  const StatusIcon = statusInfo.icon;
  
  const timeAgo = formatDistanceToNow(new Date(activity.updated_at), {
    addSuffix: true,
    locale: es
  });

  return (
    <div className="flex items-start gap-3 p-4 border-b border-border/50 last:border-b-0">
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {activity.profiles.display_name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground">
            {activity.profiles.display_name}
          </span>
          <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
          <span className="text-sm text-muted-foreground">
            {statusInfo.label.toLowerCase()}
          </span>
        </div>
        
        <Link 
          to={`/anime/${activity.animes.mal_id}`}
          className="block hover:text-primary transition-colors"
        >
          <div className="flex items-start gap-3">
            {activity.animes.image_url && (
              <img
                src={activity.animes.image_url}
                alt={activity.animes.title}
                className="w-12 h-16 object-cover rounded border"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground line-clamp-2 leading-tight">
                {activity.animes.title_english || activity.animes.title}
              </h4>
              
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <StatusIcon className="w-3 h-3" />
                  <span>{statusInfo.label}</span>
                </div>
                
                {activity.episodes_watched > 0 && (
                  <span>Ep. {activity.episodes_watched}</span>
                )}
                
                {activity.score && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{activity.score}/10</span>
                  </div>
                )}
                
                {activity.animes.type && (
                  <Badge variant="secondary" className="text-xs">
                    {activity.animes.type}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Link>
        
        <p className="text-xs text-muted-foreground mt-2">
          <Clock className="w-3 h-3 inline mr-1" />
          {timeAgo}
        </p>
      </div>
    </div>
  );
};

export const FriendsActivity = () => {
  const { data: activities, isLoading, error } = useFriendsActivity();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Actividad de Amigos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-4 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="flex gap-3">
                    <div className="w-12 h-16 bg-muted rounded" />
                    <div className="flex-1">
                      <div className="h-3 bg-muted rounded w-3/4 mb-1" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Actividad de Amigos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Error al cargar la actividad de amigos
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Actividad de Amigos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hay actividad reciente de tus amigos
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Agrega amigos para ver su actividad aquí
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Actividad de Amigos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
        
        {activities.length >= 20 && (
          <div className="p-4 text-center">
            <Link 
              to="/friends" 
              className="text-sm text-primary hover:underline"
            >
              Ver más actividad
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};