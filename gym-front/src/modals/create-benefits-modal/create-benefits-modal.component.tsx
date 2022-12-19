import { Button, Input, Modal, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useUser } from '../../user';

export const CreateBenefitsModal = ({ close, onCreate }: { close: () => void; onCreate: () => void }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const disableSubmit = title.length === 0 || isLoading;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/benefits`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'manual',
        body: JSON.stringify({
          name: title,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      onCreate();
      setIsLoading(false);
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={close} width="fit-content">
      <Modal.Header>
        <Text b size={18}>
          Create benefit
        </Text>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            aria-label="Benefit name"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            status="primary"
            size="lg"
            placeholder="Benefit name"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={close}>
            Close
          </Button>
          <Button type="submit" auto disabled={disableSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
