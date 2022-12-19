import { Avatar, Button, Dropdown, Loading, Modal, Row, Text } from '@nextui-org/react';
import { Key, useState } from 'react';
import { useQuery } from 'react-query';
import { User, useUser } from '../../user';

export const CreateTrainerModal = ({
  close,
  gymId,
  gymTrainers,
  onAdd,
}: {
  close: () => void;
  gymId: number;
  gymTrainers: User[];
  onAdd: () => void;
}) => {
  const { roles, token } = useUser();
  const [selectedUser, setSelectedUser] = useState<'all' | Set<Key> | undefined>(undefined);
  const usersQuery = useQuery<User[]>('users', async () => {
    const response = await (
      await fetch('https://localhost:7030/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    return (response as User[]).filter((user) => {
      return !gymTrainers.find((gymTrainer) => gymTrainer.id === user.id);
    });
  });
  const [isLoading, setIsLoading] = useState(false);

  const disableSubmit = isLoading || selectedUser === undefined || selectedUser === 'all';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }
    const [userToAdd] = selectedUser;
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms/${gymId}/trainers/${userToAdd}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'manual',
      });
      if (response.status >= 400) {
        throw new Error();
      }
      setIsLoading(false);
      onAdd();
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (!roles.includes('admin') || usersQuery.status === 'error') {
    close();
  }

  return (
    <Modal open={true} onClose={close}>
      <Modal.Header>
        <Text b size={18}>
          Add a trainer
        </Text>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          {usersQuery.status === 'idle' || usersQuery.status === 'loading' || usersQuery.status === 'error' ? (
            <Row justify="center" css={{ h: '48px' }}>
              <Loading />
            </Row>
          ) : (
            <Dropdown>
              <Dropdown.Button color="primary">Select user</Dropdown.Button>
              <Dropdown.Menu
                color="secondary"
                aria-label="users"
                selectionMode="single"
                selectedKeys={selectedUser}
                onSelectionChange={setSelectedUser}
              >
                {usersQuery.data.map((user) => {
                  return (
                    <Dropdown.Item
                      key={user.id}
                      icon={
                        <Avatar
                          size="xs"
                          src={user.avatarUrl ?? undefined}
                          text={`${user.firstName[0].toUpperCase}${user.lastName[0].toUpperCase}`}
                        />
                      }
                    >
                      {user.firstName} {user.lastName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
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
