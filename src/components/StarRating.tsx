import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md',
  showValue = true 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div 
        className="flex items-center gap-1" 
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
          const isFilled = star <= displayRating;
          const isHalfFilled = star === Math.ceil(displayRating) && displayRating % 1 !== 0;
          
          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              className={cn(
                "relative transition-colors",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors",
                  isFilled 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-muted-foreground"
                )}
              />
              {isHalfFilled && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute top-0 left-0 fill-yellow-400 text-yellow-400",
                    "clip-path-[polygon(0%_0%,50%_0%,50%_100%,0%_100%)]"
                  )}
                  style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      
      {!readonly && rating > 0 && onRatingChange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRatingChange(0)}
          className="h-6 w-6 p-0 hover:bg-destructive/10"
          title="Quitar calificación"
        >
          <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
        </Button>
      )}
      
      {showValue && (
        <span className="text-sm text-muted-foreground">
          {rating > 0 ? `${rating}/10` : 'Sin calificar'}
        </span>
      )}
    </div>
  );
};