import React from 'react';

import { Button } from '../components/Button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from '../components/Modal';
import DemoPage from './DemoPage';

const ModalDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DemoPage
      title="Modal"
      description="A modal dialog that appears on top of the main content."
    >
      <Button label='Open Modal' onPress={() => setIsOpen(true)} />
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalClose onPress={() => setIsOpen(false)} />
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>
              This is the description of the modal. You can put any content you want here.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" label='Cancel' onPress={() => setIsOpen(false)} />
            <Button label='Confirm' onPress={() => setIsOpen(false)} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DemoPage>
  );
};

export default ModalDemo;
