import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { AdminDashboardContext } from '../admin-dashboard-context.types';
import { Plan } from './plans-table.types';

export const PlansTable = () => {
  const { accessToken } = useOutletContext<AdminDashboardContext>();
  const plansQuery = useQuery<Plan[]>('plans', async () => {
    const plans = await (
      await fetch('https://localhost:7030/api/plans', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();
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
