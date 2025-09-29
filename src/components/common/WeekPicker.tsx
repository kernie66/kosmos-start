import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getDay, isInWeekRange } from '~/lib/utils/dayjsUtils';
import classes from './WeekPicker.module.css';
import type { CalendarProps } from '@mantine/dates';

export default function WeekPicker() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const weekSelectHandler = (date: string) => {
    setValue(date);
  };

  const getDayProps: CalendarProps['getDayProps'] = (date) => {
    const isHovered = isInWeekRange(date, hovered);
    const isSelected = isInWeekRange(date, value);
    const isInRange = isHovered || isSelected;
    const day = dayjs(date).date();
    const today = dayjs().date();
    const weekDay = getDay(date);

    // Add custom class depending on if today is a weekday or a weekend
    const dayClass = day === today ? (weekDay > 4 ? classes.weekend : classes.weekday) : undefined;

    return {
      onMouseEnter: () => setHovered(date),
      onMouseLeave: () => setHovered(null),
      inRange: isInRange,
      firstInRange: isInRange && new Date(date).getDay() === 1,
      lastInRange: isInRange && new Date(date).getDay() === 0,
      selected: isSelected,
      onClick: () => weekSelectHandler(date),
      className: dayClass,
    };
  };

  return <Calendar withCellSpacing={false} withWeekNumbers size="md" getDayProps={getDayProps} />;
}
