import {
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useFloating,
  arrow,
  autoUpdate,
} from '@floating-ui/react';
import { useMemo, useRef, useState } from 'react';

export default function usePopover({ middleware = [], placement = 'bottom' }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const arrowRef = useRef(null);

  const floatingData = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware: [...middleware, arrow({ element: arrowRef })],
    placement,
    //Функція autoUpdate викликається, коли поповер відкритий, і забезпечує його правильне позиціонування під час таких подій, як:
    // зміна розміру вікна (resize),
    // прокрутка сторінки (scroll),
    // зміна розміру тригера або інших елементів
    whileElementsMounted: autoUpdate,
  });

  const { refs, floatingStyles, context } = floatingData;

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
      refs,
      floatingStyles,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      arrowRef,
      context,
    }),
    [isPopoverOpen, refs, floatingStyles, interactions]
  );
}
