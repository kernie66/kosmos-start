import {
  ActionIcon,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  Select,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  TbCancel,
  TbDotsVertical,
  TbEdit,
  TbFileDots,
  TbInfoHexagon,
  TbMailForward,
  TbRosetteDiscountCheck,
  TbTrash,
} from 'react-icons/tb';
import { deleteInvoice } from '~/fns/deleteInvoice';
import { listInvoices } from '~/fns/listInvoices';
import { useFn } from '~/hooks/useFn';
import { formatDate } from '~/lib/utils/formatDate';
import { invoiceListSchema } from '~/validation/invoiceListSchema';
import { SortableTableTh } from '../../components/invoices/SortableTableTh';
import classes from './index.module.css';

const PAGE_SIZES = [10, 20, 50, 100].map((pageSize) => {
  const value = pageSize.toString();
  return { value, label: value };
});

const STATUS_ICONS = {
  draft: <TbFileDots />,
  sent: <TbMailForward />,
  collected: <TbRosetteDiscountCheck />,
  cancelled: <TbCancel />,
};

export const Route = createFileRoute('/invoices/')({
  validateSearch: invoiceListSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => listInvoices({ data: deps }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();

  const { rows, total } = Route.useLoaderData();

  const { execute: executeDeleteInvoice, isExecuting: isDeletingInvoice } = useFn(deleteInvoice);

  const handleDelete = (id: string) => () => {
    modals.openConfirmModal({
      title: 'Delete invoice',
      children: <Text size="sm">Are you sure you want to delete this invoice?</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        executeDeleteInvoice(
          { data: id },
          {
            onSuccess: () => {
              modals.closeAll();
              if (rows.length === 1 && search.page > 1) {
                navigate({ to: '/invoices', search: { ...search, page: search.page - 1 } });
              } else {
                router.invalidate();
              }
            },
          },
        );
      },
    });
  };

  const start = (search.page - 1) * search.pageSize + 1;
  const end = Math.min(start + search.pageSize - 1, total);

  return (
    <>
      <TableScrollContainer
        minWidth={500}
        scrollAreaProps={{ offsetScrollbars: false, classNames: { scrollbar: classes.scrollbar } }}
        className={classes.scrollContainer}
        classNames={{ scrollContainerInner: classes.scrollContainerInner }}
      >
        <LoadingOverlay visible={isDeletingInvoice} />
        <Table withColumnBorders stickyHeader striped>
          <TableThead className={classes.tableHeader}>
            <TableTr>
              <TableTh>Invoice</TableTh>
              <SortableTableTh field="to" label="To" {...search} />
              <SortableTableTh field="issueDate" label="Issue date" ta="right" {...search} />
              <SortableTableTh field="dueDate" label="Due date" ta="right" {...search} />
              <TableTh ta="right">Amount</TableTh>
              <TableTh title="Status">
                <Center>
                  <TbInfoHexagon />
                </Center>
              </TableTh>
              <TableTh title="Actions" w={0}>
                <Center>
                  <TbDotsVertical />
                </Center>
              </TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {rows.map(({ id, series, number, issueDate, to, dueDate, amount, currencyCode, status }) => (
              <TableTr key={id}>
                <TableTd>
                  {series}-{number}
                </TableTd>
                <TableTd>{to}</TableTd>
                <TableTd ta="right">{formatDate(issueDate)}</TableTd>
                <TableTd ta="right">{formatDate(dueDate)}</TableTd>
                <TableTd ta="right">
                  <NumberFormatter value={amount} suffix={` ${currencyCode}`} thousandSeparator decimalScale={2} />
                </TableTd>
                <TableTd title={upperFirst(status)}>
                  <Center>{STATUS_ICONS[status]}</Center>
                </TableTd>
                <TableTd>
                  <Group gap="xs" wrap="nowrap">
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      title="Edit"
                      onClick={() => navigate({ to: '/invoices/$id', params: { id } })}
                    >
                      <TbEdit />
                    </ActionIcon>
                    <ActionIcon size="xs" color="red" variant="transparent" title="Delete" onClick={handleDelete(id)}>
                      <TbTrash />
                    </ActionIcon>
                  </Group>
                </TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </TableScrollContainer>
      <Flex mt="md" direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" rowGap="sm">
        <Text size="sm">
          {start} - {end} / {total} invoices
        </Text>
        <Pagination
          classNames={{ control: classes.paginationControl, dots: classes.paginationDots }}
          total={Math.ceil(total / search.pageSize)}
          value={search.page}
          onChange={(page) => navigate({ to: '/invoices', search: { ...search, page } })}
        />
        <Group gap="xs">
          <Text size="sm">Page size</Text>
          <Select
            w={66}
            comboboxProps={{ width: 80, withArrow: true }}
            classNames={{ wrapper: classes.selectWrapper }}
            checkIconPosition="right"
            value={search.pageSize.toString()}
            onChange={(pageSize) =>
              navigate({ to: '/invoices', search: { ...search, page: 1, pageSize: Number(pageSize) } })
            }
            data={PAGE_SIZES}
          />
        </Group>
      </Flex>
    </>
  );
}
