//useModal.js
import { useFloating, useClick, useDismiss, useRole, useInteractions } from '@floating-ui/react';
import { useMemo, useState } from 'react';

export default function useModal({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({ open, onOpenChange: setOpen });
  const context = data.context;

  const click = useClick(context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown', escapeKey: true });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  );
}
