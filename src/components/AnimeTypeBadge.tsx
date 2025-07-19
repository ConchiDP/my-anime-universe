import { Badge } from '@/components/ui/badge';
import { animeTypeConfig } from '@/lib/jikan-api';

interface AnimeTypeBadgeProps {
  type: string;
  className?: string;
}

export const AnimeTypeBadge = ({ type, className = "" }: AnimeTypeBadgeProps) => {
  const typeKey = type.toUpperCase() as keyof typeof animeTypeConfig;
  const config = animeTypeConfig[typeKey];
  
  if (!config) {
    return (
      <Badge variant="secondary" className={className}>
        {type}
      </Badge>
    );
  }
  
  return (
    <Badge 
      variant="secondary" 
      className={`${className} text-white ${config.color}`}
      title={config.description}
    >
      {config.label}
    </Badge>
  );
};