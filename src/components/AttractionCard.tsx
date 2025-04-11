
import { Attraction } from '@/types/attraction';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface AttractionCardProps {
  attraction: Attraction;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onEdit, onDelete }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return format(date, 'h:mm a');
  };

  const getScheduleDisplay = (schedule: { openTime: string; closeTime?: string }) => {
    const open = formatTime(schedule.openTime);
    if (!schedule.closeTime) return open;
    const close = formatTime(schedule.closeTime);
    return `${open} - ${close}`;
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      {attraction.image && (
        <div className="relative w-full h-48">
          <img 
            src={attraction.image} 
            alt={attraction.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="flex-1 p-5">
        <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{attraction.location}</span>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {attraction.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="font-medium">Schedules:</span>
          </div>
          <div className="ml-6 space-y-1">
            {attraction.schedules.map((schedule) => (
              <Badge 
                key={schedule.id} 
                variant="outline" 
                className="mr-1 bg-primary/10"
              >
                {getScheduleDisplay(schedule)}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      {(onEdit || onDelete) && (
        <CardFooter className="p-3 pt-0 flex justify-end gap-2">
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="px-3 py-1 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-colors"
            >
              Delete
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default AttractionCard;
