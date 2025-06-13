import { ActionIcon, Autocomplete, Box, Loader, NumberFormatter, NumberInput, TextInput } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { comboboxProps } from '~/lib/comboboxProps';
import { useTRPC } from '~/lib/trpc/client';
import { DragHandle } from './DragHandle';
import classes from './InvoiceItem.module.css';
import type { DraggableProvided } from '@hello-pangea/dnd';
import type { UseFormReturnType } from '@mantine/form';
import type { InvoiceSaveSchema } from '~/validation/invoiceSaveSchema';

export type InvoiceItemProps = {
  provided: DraggableProvided;
  form: UseFormReturnType<InvoiceSaveSchema>;
  index: number;
  onTotalChange: () => void;
};

export function InvoiceItem({ provided, form, index, onTotalChange }: InvoiceItemProps) {
  const trpc = useTRPC();
  const [unitComboOpened, setUnitComboOpened] = useState(false);
  const unitOptions = useQuery({ ...trpc.invoices.listUnits.queryOptions(), enabled: unitComboOpened });

  const { quantity, unitPrice } = form.getValues().items[index];
  const [total, setTotal] = useState(quantity * unitPrice);

  const isMounted = useMounted();

  form.watch(`items.${index}.quantity`, ({ value }) => {
    setTotal(value * form.getValues().items[index].unitPrice);
    onTotalChange();
  });

  form.watch(`items.${index}.unitPrice`, ({ value }) => {
    setTotal(form.getValues().items[index].quantity * value);
    onTotalChange();
  });

  const handleDeleteClick = () => {
    form.removeListItem('items', index);
    onTotalChange();
  };

  return (
    <div ref={provided.innerRef} className={classes.root} {...provided.draggableProps}>
      <DragHandle provided={provided} />
      <div className={classes.fields}>
        <TextInput
          className={clsx(classes.field, classes.description)}
          title="Description"
          placeholder="Description"
          key={form.key(`items.${index}.description`)}
          {...form.getInputProps(`items.${index}.description`)}
        />
        <NumberInput
          className={classes.field}
          title="Quantity"
          placeholder="Quantity"
          key={form.key(`items.${index}.quantity`)}
          {...form.getInputProps(`items.${index}.quantity`)}
          decimalScale={2}
          fixedDecimalScale
          hideControls
        />
        <Autocomplete
          comboboxProps={{
            ...comboboxProps,
            onOpen: () => setUnitComboOpened(true),
            onClose: () => setUnitComboOpened(false),
          }}
          className={classes.field}
          title="Unit"
          placeholder="Unit"
          key={form.key(`items.${index}.unit`)}
          {...form.getInputProps(`items.${index}.unit`)}
          data={unitOptions.data}
          rightSection={isMounted && unitOptions.isFetching && <Loader size="xs" />}
        />
        <NumberInput
          className={classes.field}
          title="Unit price"
          placeholder="Unit price"
          key={form.key(`items.${index}.unitPrice`)}
          {...form.getInputProps(`items.${index}.unitPrice`)}
          decimalScale={2}
          fixedDecimalScale
          hideControls
        />
        <Box className={clsx(classes.field, classes.total)} title="Total">
          <NumberFormatter value={total} thousandSeparator decimalScale={2} fixedDecimalScale />
        </Box>
      </div>
      <ActionIcon variant="light" size="input-sm" color="red" onClick={handleDeleteClick} title="Delete item">
        <TbTrash />
      </ActionIcon>
    </div>
  );
}
