import { useMemo } from 'react';
import useModalContext from './useModalContext';
import { useMergeRefs } from '@floating-ui/react';

export default function useModalTrigger({ ref: outerRef }) {
  const context = useModalContext();

  const { setReference, getReferenceProps } = context;

  if (!getReferenceProps) {
    throw new Error('getReferenceProps is not defined in the context.');
  }

  const ref = useMergeRefs([setReference, outerRef]);

  return useMemo(
    () => ({
      ref,
      getReferenceProps,
    }),
    [getReferenceProps, ref]
  );
}
//useModalTrigger:
// Приймає outerRef як пропс і поєднує його з setReference з контексту модалки через useMergeRefs.
// Повертає об'єкт із ref (злитим посиланням) і функцією getReferenceProps, яку передаємо елементу (в нашому випадку кнопці).
