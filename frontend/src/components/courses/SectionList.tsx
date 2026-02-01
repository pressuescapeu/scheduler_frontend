import { useState } from 'react';
import { SectionCard } from './SectionCard';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SectionWithDetails } from '@/types';

interface SectionListProps {
  sections: SectionWithDetails[];
  selectedSectionIds: number[];
  onAddSection: (section: SectionWithDetails) => void;
}

export const SectionList = ({ sections, selectedSectionIds, onAddSection }: SectionListProps) => {
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set(['Lecture']));

  const groupedSections = sections.reduce((acc, section) => {
    const type = section.section_type || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(section);
    return acc;
  }, {} as Record<string, SectionWithDetails[]>);

  const sectionTypeOrder = ['Lecture', 'Lab', 'Recitation', 'Other'];
  const sortedTypes = Object.keys(groupedSections).sort(
    (a, b) => sectionTypeOrder.indexOf(a) - sectionTypeOrder.indexOf(b)
  );

  const toggleExpanded = (type: string) => {
    setExpandedTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {sortedTypes.map((type) => {
        const isExpanded = expandedTypes.has(type);
        const typeSections = groupedSections[type];

        return (
          <div key={type} className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => toggleExpanded(type)}
            >
              <span className="font-semibold">
                {type}s ({typeSections.length})
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {isExpanded && (
              <div className="space-y-2 pl-2">
                {typeSections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    onAdd={() => onAddSection(section)}
                    isSelected={selectedSectionIds.includes(section.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
