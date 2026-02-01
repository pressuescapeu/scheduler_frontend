import { parse } from 'date-fns';
import type { SectionWithDetails } from '@/types';

/**
 * Check if two time ranges overlap
 */
const timesOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const s1 = parse(start1.substring(0, 5), 'HH:mm', new Date());
  const e1 = parse(end1.substring(0, 5), 'HH:mm', new Date());
  const s2 = parse(start2.substring(0, 5), 'HH:mm', new Date());
  const e2 = parse(end2.substring(0, 5), 'HH:mm', new Date());

  return s1 < e2 && s2 < e1;
};

/**
 * Check if adding a section would create a conflict
 */
export const hasConflict = (
  existingSections: SectionWithDetails[],
  newSection: SectionWithDetails
): boolean => {
  for (const existingSection of existingSections) {
    for (const existingMeeting of existingSection.meetings) {
      for (const newMeeting of newSection.meetings) {
        if (existingMeeting.day_of_week === newMeeting.day_of_week) {
          if (
            timesOverlap(
              existingMeeting.start_time,
              existingMeeting.end_time,
              newMeeting.start_time,
              newMeeting.end_time
            )
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

/**
 * Get list of conflicting sections
 */
export const getConflictingSections = (
  sections: SectionWithDetails[],
  targetSection: SectionWithDetails
): SectionWithDetails[] => {
  const conflicts: SectionWithDetails[] = [];

  for (const section of sections) {
    if (section.id === targetSection.id) continue;

    for (const meeting of section.meetings) {
      for (const targetMeeting of targetSection.meetings) {
        if (meeting.day_of_week === targetMeeting.day_of_week) {
          if (
            timesOverlap(
              meeting.start_time,
              meeting.end_time,
              targetMeeting.start_time,
              targetMeeting.end_time
            )
          ) {
            conflicts.push(section);
            break;
          }
        }
      }
    }
  }

  return conflicts;
};
