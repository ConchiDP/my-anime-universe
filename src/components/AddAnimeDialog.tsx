import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StarRating } from '@/components/StarRating';
import { Plus } from 'lucide-react';
import { useAddAnimeToList, AnimeStatus } from '@/hooks/useUserAnimeList';
import { AnimeSearchResult } from '@/lib/jikan-api';

interface AddAnimeDialogProps {
  anime: AnimeSearchResult;
  trigger?: React.ReactNode;
}

export const AddAnimeDialog = ({ anime, trigger }: AddAnimeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AnimeStatus>('plan_to_watch');
  const [rating, setRating] = useState(0);
  const addAnimeToList = useAddAnimeToList();

  const handleAddToList = () => {
    addAnimeToList.mutate(
      { 
        anime, 
        status: selectedStatus,
        score: rating > 0 ? rating : undefined 
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setRating(0);
          setSelectedStatus('plan_to_watch');
        }
      }
    );
  };

  const statusOptions = [
    { value: 'watching', label: 'Viendo' },
    { value: 'completed', label: 'Completado' },
    { value: 'on_hold', label: 'En pausa' },
    { value: 'dropped', label: 'Abandonado' },
    { value: 'plan_to_watch', label: 'Planeo ver' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar a Lista
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar {anime.title_english || anime.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Estado:</label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as AnimeStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Calificación (opcional):
            </label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              size="md"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToList}
              disabled={addAnimeToList.isPending}
              className="flex-1"
            >
              {addAnimeToList.isPending ? 'Agregando...' : 'Agregar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};