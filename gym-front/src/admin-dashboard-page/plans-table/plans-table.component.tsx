import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { Plan } from './plans-table.types';

export const PlansTable = () => {
  const plansQuery = useQuery<Plan[]>('plans', async () => {
    const plans = await (await fetch('https://localhost:7030/api/plans')).json();
    return plans as Plan[];
  });

  if (plansQuery.status === 'loading' || plansQuery.status === 'idle') {
    return <Loading />;
  }

  if (plansQuery.status === 'error') {
    const errorText = typeof plansQuery.error === 'string' ? plansQuery.error : 'Error occured';
    return <Text color="danger">{errorText}</Text>;
  }

  return (
    <>
      <Text h2>Plans</Text>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>ORIGINAL PRICE</Table.Column>
          <Table.Column>CURRENT PRICE</Table.Column>
        </Table.Header>
        <Table.Body>
          {plansQuery.data.map((plan) => (
            <Table.Row key={plan.id}>
              <Table.Cell>{plan.id}</Table.Cell>
              <Table.Cell>{plan.originalPrice}</Table.Cell>
              <Table.Cell>{plan.currentPrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
