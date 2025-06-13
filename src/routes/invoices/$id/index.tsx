import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardSection,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  InputLabel,
  Loader,
  NumberInput,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Form, useForm } from '@mantine/form';
import { upperFirst, useMounted } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useRef, useState } from 'react';
import { TbArrowBackUp, TbCloudUpload, TbEdit, TbPlus, TbRestore } from 'react-icons/tb';
import { proxy } from 'valtio';
import { GrandTotal } from '~/components/invoices/GrandTotal';
import { InvoiceField } from '~/components/invoices/InvoiceField';
import { InvoiceItem } from '~/components/invoices/InvoiceItem';
import { Timestamps } from '~/components/invoices/Timestamps';
import { InvoiceStatus } from '~/database/InvoiceStatus';
import { loadInvoice } from '~/fns/loadInvoice';
import { saveInvoice } from '~/fns/saveInvoice';
import { useFn } from '~/hooks/useFn';
import { comboboxProps } from '~/lib/comboboxProps';
import { useTRPC } from '~/lib/trpc/client';
import { invoiceSaveSchema } from '~/validation/invoiceSaveSchema';
import type { OnDragEndResponder } from '@hello-pangea/dnd';
import type { InvoiceSaveSchema } from '~/validation/invoiceSaveSchema';

const STATUS_OPTIONS = InvoiceStatus.map((status) => ({ value: status, label: upperFirst(status) }));

export const Route = createFileRoute('/invoices/$id/')({
  loader: ({ params: { id } }) =>
    id === 'new'
      ? {
          id: null,
          series: '',
          number: '' as unknown as number,
          issueDate: '',
          dueDate: '',
          currencyCode: '',
          status: 'draft' as const,
          from: '',
          to: '',
          fromFields: [],
          toFields: [],
          items: [],
        }
      : loadInvoice({ data: id }),
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const [seriesComboOpened, setSeriesComboOpened] = useState(false);
  const seriesOptions = useQuery({ ...trpc.invoices.listOptions.queryOptions('series'), enabled: seriesComboOpened });

  const [currencyCodeComboOpened, setCurrencyCodeComboOpened] = useState(false);
  const currencyCodeOptions = useQuery({
    ...trpc.invoices.listOptions.queryOptions('currencyCode'),
    enabled: currencyCodeComboOpened,
  });

  const [fromComboOpened, setFromComboOpened] = useState(false);
  const fromOptions = useQuery({ ...trpc.invoices.listOptions.queryOptions('from'), enabled: fromComboOpened });

  const [toComboOpened, setToComboOpened] = useState(false);
  const toOptions = useQuery({ ...trpc.invoices.listOptions.queryOptions('to'), enabled: toComboOpened });

  const initialValues = Route.useLoaderData();

  const form = useForm<InvoiceSaveSchema>({
    mode: 'uncontrolled',
    validate: zodResolver(invoiceSaveSchema),
    initialValues,
  });

  const grandTotal = useRef(
    proxy({
      amount: initialValues.items.reduce((acc, r) => acc + r.quantity * r.unitPrice, 0),
      currencyCode: initialValues.currencyCode,
    }),
  );

  form.watch('currencyCode', ({ value }) => {
    grandTotal.current.currencyCode = value;
  });

  const handleItemTotalChange = () => {
    grandTotal.current.amount = form.getValues().items.reduce((acc, r) => acc + r.quantity * r.unitPrice, 0);
  };

  const { execute: save, isExecuting: isSaving } = useFn(saveInvoice, {
    onSuccess: () => history.back(),
  });

  const handleFieldAddClick = (type: 'fromFields' | 'toFields') => () => {
    form.insertListItem(type, { id: null, name: '', value: '', tmp_id: Date.now() });
    requestAnimationFrame(() => {
      const node = form.getInputNode(`${type}.${form.getValues()[type].length - 1}.name`);
      node?.focus();
    });
  };

  const handleItemAddClick = () => {
    form.insertListItem('items', {
      id: null,
      description: '',
      unit: '',
      unitPrice: '',
      quantity: '',
      tmp_id: Date.now(),
    });
    requestAnimationFrame(() => {
      const node = form.getInputNode(`items.${form.getValues().items.length - 1}.description`);
      node?.focus();
    });
  };

  const handleFieldsDragEnd =
    (type: 'fromFields' | 'toFields'): OnDragEndResponder<string> =>
    ({ destination, source }) => {
      if (!destination || destination.index === source.index) return;
      form.reorderListItem(type, { from: source.index, to: destination.index });
    };

  const handleItemsDragEnd: OnDragEndResponder<string> = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return;
    form.reorderListItem('items', { from: source.index, to: destination.index });
  };

  const getFields = (type: 'fromFields' | 'toFields') => {
    return form.getValues()[type].map(({ id, tmp_id }, index) => (
      <Draggable key={id || tmp_id} index={index} draggableId={id || String(tmp_id)}>
        {(provided) => <InvoiceField provided={provided} form={form} type={type} index={index} />}
      </Draggable>
    ));
  };

  const isPristine = !form.isDirty();
  const isMounted = useMounted();

  return (
    <Card withBorder radius="sm">
      <CardSection withBorder px="md" py="xs" mb="md">
        <Group gap="xs">
          <TbEdit size={18} />
          <Title order={2} fz="h4" mb={-2}>
            {initialValues.id ? `Invoice ${initialValues.series}-${initialValues.number}` : 'New invoice'}
          </Title>
        </Group>
      </CardSection>
      <Form form={form} onSubmit={(values) => save({ data: values })}>
        <Grid>
          <GridCol span={{ md: 2 }}>
            <Autocomplete
              comboboxProps={{
                ...comboboxProps,
                onOpen: () => setSeriesComboOpened(true),
                onClose: () => setSeriesComboOpened(false),
              }}
              label="Series"
              key={form.key('series')}
              {...form.getInputProps('series')}
              data={seriesOptions.data}
              rightSection={isMounted && seriesOptions.isFetching && <Loader size="xs" />}
            />
          </GridCol>
          <GridCol span={{ md: 2 }}>
            <NumberInput
              label="Number"
              key={form.key('number')}
              {...form.getInputProps('number')}
              allowDecimal={false}
              allowNegative={false}
              hideControls
            />
          </GridCol>
          <GridCol span={{ md: 2 }}>
            <DateInput
              popoverProps={{ ...comboboxProps, arrowPosition: 'center' }}
              label="Issue date"
              key={form.key('issueDate')}
              {...form.getInputProps('issueDate')}
              valueFormat="MMM D YYYY"
            />
          </GridCol>
          <GridCol span={{ md: 2 }}>
            <DateInput
              popoverProps={{ ...comboboxProps, arrowPosition: 'center' }}
              label="Due date"
              key={form.key('dueDate')}
              {...form.getInputProps('dueDate')}
              valueFormat="MMM D YYYY"
            />
          </GridCol>
          <GridCol span={{ md: 2 }}>
            <Autocomplete
              comboboxProps={{
                ...comboboxProps,
                onOpen: () => setCurrencyCodeComboOpened(true),
                onClose: () => setCurrencyCodeComboOpened(false),
              }}
              label="Currency"
              key={form.key('currencyCode')}
              {...form.getInputProps('currencyCode')}
              data={currencyCodeOptions.data}
              rightSection={isMounted && currencyCodeOptions.isFetching && <Loader size="xs" />}
            />
          </GridCol>
          <GridCol span={{ md: 2 }}>
            <Select
              comboboxProps={comboboxProps}
              label="Status"
              key={form.key('status')}
              {...form.getInputProps('status')}
              data={STATUS_OPTIONS}
              checkIconPosition="right"
              allowDeselect={false}
            />
          </GridCol>
        </Grid>
        <Divider mt="md" mx="-md" />
        <Flex mt="md" direction={{ base: 'column', md: 'row' }} gap="md">
          <Stack flex={1} gap={4}>
            <Autocomplete
              comboboxProps={{
                ...comboboxProps,
                onOpen: () => setFromComboOpened(true),
                onClose: () => setFromComboOpened(false),
              }}
              label="From"
              key={form.key('from')}
              {...form.getInputProps('from')}
              data={fromOptions.data}
              rightSection={isMounted && fromOptions.isFetching && <Loader size="xs" />}
            />
            <DragDropContext onDragEnd={handleFieldsDragEnd('fromFields')}>
              <Droppable droppableId="fromFields" direction="vertical">
                {(provided) => (
                  <Box mt={-4} {...provided.droppableProps} ref={provided.innerRef}>
                    {getFields('fromFields')}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <Button variant="default" onClick={handleFieldAddClick('fromFields')} leftSection={<TbPlus />}>
              Add field
            </Button>
          </Stack>
          <Divider hiddenFrom="md" />
          <Divider visibleFrom="md" orientation="vertical" my="-md" />
          <Stack flex={1} gap={4}>
            <Autocomplete
              comboboxProps={{
                ...comboboxProps,
                onOpen: () => setToComboOpened(true),
                onClose: () => setToComboOpened(false),
              }}
              label="To"
              key={form.key('to')}
              {...form.getInputProps('to')}
              data={toOptions.data}
              rightSection={isMounted && toOptions.isFetching && <Loader size="xs" />}
            />
            <DragDropContext onDragEnd={handleFieldsDragEnd('toFields')}>
              <Droppable droppableId="toFields" direction="vertical">
                {(provided) => (
                  <Box mt={-4} {...provided.droppableProps} ref={provided.innerRef}>
                    {getFields('toFields')}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <Button variant="default" onClick={handleFieldAddClick('toFields')} leftSection={<TbPlus />}>
              Add field
            </Button>
          </Stack>
        </Flex>
        <Divider mt="md" mx="-md" />
        <Stack mt="xs" gap={4}>
          <InputLabel>Billed items</InputLabel>
          <DragDropContext onDragEnd={handleItemsDragEnd}>
            <Droppable droppableId="items" direction="vertical">
              {(provided) => (
                <Box mt={-4} {...provided.droppableProps} ref={provided.innerRef}>
                  {form.getValues().items.map(({ id, tmp_id }, index) => (
                    <Draggable key={id || tmp_id} index={index} draggableId={id || String(tmp_id)}>
                      {(provided) => (
                        <InvoiceItem
                          provided={provided}
                          form={form}
                          index={index}
                          onTotalChange={handleItemTotalChange}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Button variant="default" onClick={handleItemAddClick} leftSection={<TbPlus />}>
            Add item
          </Button>
        </Stack>
        <Divider mt="md" mx="-md" />
        <Flex mt="lg" direction={{ base: 'column', md: 'row' }} align="center" gap="md" justify="space-between">
          <Box fz="sm" c="dimmed" fw="bold" ta={{ base: 'center', xs: 'initial' }}>
            Total: <GrandTotal data={grandTotal} /> <Timestamps data={initialValues} />
          </Box>
          <Flex justify="center" wrap={{ base: 'wrap', xs: 'nowrap' }} gap="xs">
            <Button variant="default" leftSection={<TbArrowBackUp />} onClick={() => history.back()}>
              Cancel
            </Button>
            <Button variant="default" leftSection={<TbRestore />} disabled={isPristine} onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" leftSection={<TbCloudUpload />} disabled={isPristine} loading={isSaving}>
              Save
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Card>
  );
}
