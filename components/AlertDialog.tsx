import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "./Modal";
import { Button } from "./Button";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  /** Tailwind / NativeWind classes applied to the dialog container (ModalContent). */
  contentClassName?: string;
  /**
   * Extra props forwarded to the confirm button (e.g. className, disabled, loading).
   */
  confirmButtonProps?: Partial<React.ComponentProps<typeof Button>>;
  /**
   * Extra props forwarded to the cancel button.
   */
  cancelButtonProps?: Partial<React.ComponentProps<typeof Button>>;
}

const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  contentClassName,
  confirmButtonProps,
  cancelButtonProps,
}: AlertDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className={contentClassName}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button
            variant="outline"
            label={cancelText}
            onPress={handleCancel}
            {...cancelButtonProps}
          />
          <Button
            variant="destructive"
            label={confirmText}
            onPress={handleConfirm}
            {...confirmButtonProps}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AlertDialog };
