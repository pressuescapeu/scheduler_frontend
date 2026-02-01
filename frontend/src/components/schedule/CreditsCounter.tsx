import { Badge } from '@/components/ui/badge';

interface CreditsCounterProps {
  totalCredits: number;
}

export const CreditsCounter = ({ totalCredits }: CreditsCounterProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Total Credits:</span>
      <Badge variant="outline" className="font-semibold">
        {totalCredits}
      </Badge>
    </div>
  );
};
