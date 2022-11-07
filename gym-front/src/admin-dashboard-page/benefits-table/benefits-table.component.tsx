import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { Benefit } from './benefits-table.types';

export const BenefitsTable = () => {
  const benefitsQuery = useQuery<Benefit[]>('benefits', async () => {
    const benefits = await (await fetch('https://localhost:7030/api/benefits')).json();
    return benefits as Benefit[];
  });

  if (benefitsQuery.status === 'loading' || benefitsQuery.status === 'idle') {
    return <Loading />;
  }

  if (benefitsQuery.status === 'error') {
    const errorText =
      typeof benefitsQuery.error === 'string' ? benefitsQuery.error : 'Error occured';
    return <Text color="danger">{errorText}</Text>;
  }

  return (
    <>
      <Text h2>Benefits</Text>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>NAME</Table.Column>
        </Table.Header>
        <Table.Body>
          {benefitsQuery.data.map((benefit) => (
            <Table.Row key={benefit.id}>
              <Table.Cell>{benefit.id}</Table.Cell>
              <Table.Cell>{benefit.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
