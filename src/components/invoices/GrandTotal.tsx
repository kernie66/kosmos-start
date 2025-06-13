import { NumberFormatter } from '@mantine/core';
import { useSnapshot } from 'valtio';
import type { RefObject } from 'react';

export type GrandTotalProps = {
  data: RefObject<{ amount: number; currencyCode: string }>;
};

export function GrandTotal({ data }: GrandTotalProps) {
  const { amount, currencyCode } = useSnapshot(data.current);
  return (
    <NumberFormatter value={amount} suffix={` ${currencyCode}`} thousandSeparator decimalScale={2} fixedDecimalScale />
  );
}
