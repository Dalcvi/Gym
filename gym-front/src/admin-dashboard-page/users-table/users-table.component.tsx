import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { GymUser } from './users-table.types';

export const UsersTable = () => {
  const usersQuery = useQuery<GymUser[]>('users', async () => {
    const users = await (await fetch('https://localhost:7030/api/users')).json();
    return users as GymUser[];
  });

  if (usersQuery.status === 'loading' || usersQuery.status === 'idle') {
    return <Loading />;
  }

  if (usersQuery.status === 'error') {
    const errorText = typeof usersQuery.error === 'string' ? usersQuery.error : 'Error occured';
    return <Text color="danger">{errorText}</Text>;
  }

  return (
    <>
      <Text h2>Users</Text>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>EMAIL</Table.Column>
          <Table.Column>FIRST NAME</Table.Column>
          <Table.Column>LAST NAME</Table.Column>
          <Table.Column>AGE</Table.Column>
        </Table.Header>
        <Table.Body>
          {usersQuery.data.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
