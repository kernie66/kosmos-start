import { Group, TableTh } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { TbArrowUp, TbArrowsUpDown } from 'react-icons/tb';
import classes from './SortableTableTh.module.css';
import type { TableThProps } from '@mantine/core';

export type SortableTableThProps = {
  field: 'issueDate' | 'dueDate' | 'to';
  label: string;
  ta?: TableThProps['ta'];
  pageSize: number;
  sortBy: string;
  sortOrder: string;
};

export function SortableTableTh({ field, label, ta, pageSize, sortBy, sortOrder }: SortableTableThProps) {
  const navigate = useNavigate();

  return (
    <TableTh
      className={classes.root}
      title={`Sort ${sortBy === field && sortOrder === 'asc' ? 'descending' : 'ascending'}`}
      ta={ta}
      onClick={() =>
        navigate({
          to: '/invoices',
          search: {
            page: 1,
            pageSize,
            sortBy: field,
            sortOrder: sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc',
          },
        })
      }
    >
      <Group className={classes.content}>
        <div className={classes.label}>{label}</div>
        {sortBy === field ? (
          <TbArrowUp className={clsx(classes.sortedIcon, { [classes.desc]: sortOrder === 'desc' })} />
        ) : (
          <TbArrowsUpDown className={classes.unsortedIcon} size={12} />
        )}
      </Group>
    </TableTh>
  );
}
