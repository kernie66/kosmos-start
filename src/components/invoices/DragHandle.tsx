import { Center } from '@mantine/core';
import { TbGripVertical } from 'react-icons/tb';
import classes from './DragHandle.module.css';
import type { DraggableProvided } from '@hello-pangea/dnd';

export type DragHandleProps = {
  provided: DraggableProvided;
};

export function DragHandle({ provided }: DragHandleProps) {
  return (
    <Center className={classes.root} {...provided.dragHandleProps}>
      <TbGripVertical />
    </Center>
  );
}
