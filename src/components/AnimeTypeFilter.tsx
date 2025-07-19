import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { animeTypeConfig } from '@/lib/jikan-api';
import { Filter } from 'lucide-react';

interface AnimeTypeFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  showCounts?: boolean;
  counts?: Record<string, number>;
}

export const AnimeTypeFilter = ({ 
  value, 
  onValueChange, 
  showCounts = false, 
  counts = {} 
}: AnimeTypeFilterProps) => {
  
  const getDisplayValue = () => {
    if (value === 'ALL') return 'Todos los tipos';
    const config = animeTypeConfig[value as keyof typeof animeTypeConfig];
    return config?.label || value;
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <SelectValue placeholder="Filtrar por tipo">
            {getDisplayValue()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">
          <div className="flex items-center justify-between w-full">
            <span>Todos los tipos</span>
            {showCounts && counts.ALL && (
              <Badge variant="outline" className="ml-2">
                {counts.ALL}
              </Badge>
            )}
          </div>
        </SelectItem>
        
        {Object.entries(animeTypeConfig).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                <span>{config.label}</span>
              </div>
              {showCounts && counts[key] && (
                <Badge variant="outline" className="ml-2">
                  {counts[key]}
                </Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};