import { useMemo } from 'react';
import { hasConflict, getConflictingSections } from '@/utils/conflictDetection';
import type { SectionWithDetails } from '@/types';

export const useConflictDetection = (
  scheduleSections: SectionWithDetails[],
  candidateSection: SectionWithDetails | null
) => {
  const hasTimeConflict = useMemo(() => {
    if (!candidateSection) return false;
    return hasConflict(scheduleSections, candidateSection);
  }, [scheduleSections, candidateSection]);

  const conflictingSections = useMemo(() => {
    if (!candidateSection) return [];
    return getConflictingSections(scheduleSections, candidateSection);
  }, [scheduleSections, candidateSection]);

  return { hasTimeConflict, conflictingSections };
};
