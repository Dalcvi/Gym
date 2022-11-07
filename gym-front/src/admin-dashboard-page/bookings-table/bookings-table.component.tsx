import { Loading, Table, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { Booking } from './bookings.types';

export const BookingTable = () => {
  const bookingsQuery = useQuery<Booking[]>('bookings', async () => {
    const bookings = await (await fetch('https://localhost:7030/api/bookings')).json();
    return bookings as Booking[];
  });

  if (bookingsQuery.status === 'loading' || bookingsQuery.status === 'idle') {
    return <Loading />;
  }

  if (bookingsQuery.status === 'error') {
    const errorText =
      typeof bookingsQuery.error === 'string' ? bookingsQuery.error : 'Error occured';
    return <Text color="danger">{errorText}</Text>;
  }

  return (
    <>
      <Text h2>Bookings</Text>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>DATE FROM</Table.Column>
          <Table.Column>DATE TO</Table.Column>
          <Table.Column>CLIENT ID</Table.Column>
          <Table.Column>TRAINER ID</Table.Column>
        </Table.Header>
        <Table.Body>
          {bookingsQuery.data.map((booking) => (
            <Table.Row key={booking.id}>
              <Table.Cell>{booking.id}</Table.Cell>
              <Table.Cell>{new Date(booking.dateFrom).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{new Date(booking.dateTo).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{booking.clientId}</Table.Cell>
              <Table.Cell>{booking.trainerId}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
