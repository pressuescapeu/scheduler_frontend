import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CreditsCounterProps {
  totalCredits: number;
}

export const CreditsCounter = ({ totalCredits }: CreditsCounterProps) => {
  const getColorClass = () => {
    if (totalCredits >= 15 && totalCredits <= 18) {
      return 'bg-green-500/20 text-green-500 border-green-500/50';
    } else if ((totalCredits >= 12 && totalCredits < 15) || (totalCredits > 18 && totalCredits <= 21)) {
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
    } else if (totalCredits < 12 || totalCredits > 21) {
      return 'bg-red-500/20 text-red-500 border-red-500/50';
    }
    return 'bg-muted text-muted-foreground';
  };

  const getLabel = () => {
    if (totalCredits === 0) return 'No credits';
    if (totalCredits >= 15 && totalCredits <= 18) return 'Optimal load';
    if ((totalCredits >= 12 && totalCredits < 15) || (totalCredits > 18 && totalCredits <= 21)) return 'Warning';
    return 'Overload';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Total Credits:</span>
      <Badge variant="outline" className={cn('font-semibold', getColorClass())}>
        {totalCredits} credits
      </Badge>
      <span className="text-xs text-muted-foreground">{getLabel()}</span>
    </div>
  );
};
