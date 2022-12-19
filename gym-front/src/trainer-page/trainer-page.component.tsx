import { Container, Loading, Row, Text, Image, Spacer, Button } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Booking } from '../admin-dashboard-page/bookings-table/bookings.types';
import { useModal } from '../modals';
import { CreateBookingModal } from '../modals/create-booking-modal';
import { User, useUser } from '../user';
import { TimeTable } from './time-table';

export const TrainerPage = () => {
  const { trainerId } = useParams();
  const { user } = useUser();
  const openModal = useModal();

  const bookingsQuery = useQuery<Booking[]>(`trainer-bookings-${trainerId}`, async () => {
    const bookings = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${trainerId}/bookings`)).json();
    return bookings as Booking[];
  });

  const trainerQuery = useQuery<User>(`trainer-${trainerId}`, async () => {
    const trainer = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${trainerId}`)).json();
    return trainer as User;
  });

  if (
    trainerQuery.status === 'idle' ||
    trainerQuery.status === 'loading' ||
    bookingsQuery.status === 'loading' ||
    bookingsQuery.status === 'idle'
  ) {
    return (
      <Container
        css={{ height: 'calc(100vh - 76px)', width: '100vw' }}
        display="flex"
        justify="center"
        alignItems="center"
      >
        <Loading size="xl" />
      </Container>
    );
  }

  if (trainerQuery.status === 'error' || bookingsQuery.status === 'error') {
    return (
      <Container css={{ height: 'calc(100vh - 76px)', width: '100vw' }} justify="center" alignItems="center">
        <Text h2>Sorry, an error accured, please try again later</Text>
      </Container>
    );
  }

  const userId = user.type === 'AUTHORIZED' ? user.data.id : undefined;

  const trainer = trainerQuery.data;

  return (
    <Container css={{ width: '95vw', maxWidth: '1280px', mt: '48px' }}>
      <Row>
        {trainer.avatarUrl ? (
          <Image src={trainer.avatarUrl} width={400} height={225} showSkeleton />
        ) : (
          <Row css={{ flexShrink: 0, width: '400px', height: '225px', background: '$gray300' }} />
        )}
        <Spacer x={2} />
        <Row>
          <Text b size="$3xl">
            {trainer.firstName} {trainer.lastName}
          </Text>
        </Row>
      </Row>
      {user.type === 'AUTHORIZED' && user.data.id !== trainer.id && (
        <Row justify="flex-end" css={{ mt: '48px' }}>
          <Button
            auto
            color="secondary"
            onClick={() => {
              openModal((close, key) => (
                <CreateBookingModal
                  close={close}
                  key={key}
                  onCreate={() => {
                    bookingsQuery.refetch();
                  }}
                  currentBookings={bookingsQuery.data}
                  startHour={6}
                  endHour={22}
                  trainerId={trainer.id}
                  clientId={user.data.id}
                />
              ));
            }}
          >
            Book time
          </Button>
        </Row>
      )}
      <Row css={{ mt: '48px', mb: '48px' }}>
        <TimeTable
          bookings={bookingsQuery.data}
          userId={userId}
          onDelete={() => {
            bookingsQuery.refetch();
          }}
        />
      </Row>
    </Container>
  );
};
