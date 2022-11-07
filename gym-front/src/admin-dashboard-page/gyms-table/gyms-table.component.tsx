import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { Gym } from './gyms-table.types';

export const GymsTable = () => {
  const gymsQuery = useQuery<Gym[]>('gyms', async () => {
    const gyms = await (await fetch('https://localhost:7030/api/gyms')).json();
    return gyms as Gym[];
  });

  if (gymsQuery.status === 'loading' || gymsQuery.status === 'idle') {
    return <Loading />;
  }

  if (gymsQuery.status === 'error') {
    const errorText = typeof gymsQuery.error === 'string' ? gymsQuery.error : 'Error occured';
    return <Text color="danger">{errorText}</Text>;
  }

  return (
    <>
      <Text h2>Gyms</Text>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>ADDRESS</Table.Column>
        </Table.Header>
        <Table.Body>
          {gymsQuery.data.map((gym) => (
            <Table.Row key={gym.id}>
              <Table.Cell>{gym.id}</Table.Cell>
              <Table.Cell>{gym.address}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
