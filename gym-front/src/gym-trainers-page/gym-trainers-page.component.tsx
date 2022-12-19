import { Button, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Gym } from '../admin-dashboard-page/gyms-table/gyms-table.types';
import { RouteNames } from '../router';
import { User, useUser } from '../user';
import { ActionCard } from '../action-card';
import { useModal } from '../modals';
import { CreateTrainerModal } from '../modals/create-trainer-modal';

export const GymTrainersPage = () => {
  const navigateTo = useNavigate();
  const { locationId } = useParams();
  const { roles } = useUser();
  const openModal = useModal();

  const gymQuery = useQuery<Gym>(`gyms-${locationId}`, async () => {
    const gym = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms/${locationId}`)).json();
    return gym as Gym;
  });

  const gymTrainersQuery = useQuery<User[]>(`trainers-${locationId}`, async () => {
    const trainers = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms/${locationId}/trainers`)).json();
    return trainers as User[];
  });

  const onDelete = async (id: string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms/${locationId}/trainers/${id}`, {
      method: 'DELETE',
    });
    gymTrainersQuery.refetch();
  };

  if (
    gymQuery.status === 'idle' ||
    gymQuery.status === 'loading' ||
    gymTrainersQuery.status === 'loading' ||
    gymTrainersQuery.status === 'idle'
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

  if (gymQuery.status === 'error' || gymTrainersQuery.status === 'error') {
    return (
      <Container css={{ height: 'calc(100vh - 76px)', width: '100vw' }} justify="center" alignItems="center">
        <Text h2>Sorry, an error accured, please try again later</Text>
      </Container>
    );
  }

  return (
    <div>
      <Container
        css={{
          padding: '0 5%',
          '@xs': {
            padding: `0 min(60px, 5%)`,
          },
          '@sm': {
            padding: `0 60px`,
          },
          '@md': {
            maxW: '1400px',
          },
        }}
      >
        <Row justify="center" css={{ pt: '48px' }}>
          <Text h2>{gymQuery.data.address} trainers</Text>
        </Row>
        {roles.includes('admin') && (
          <Row justify="flex-end" css={{ mt: '24px' }}>
            <Button
              auto
              color="gradient"
              onClick={() =>
                openModal((close, key) => (
                  <CreateTrainerModal
                    close={close}
                    onAdd={() => gymTrainersQuery.refetch()}
                    key={key}
                    gymId={gymQuery.data.id}
                    gymTrainers={gymTrainersQuery.data}
                  />
                ))
              }
            >
              Add new trainer
            </Button>
          </Row>
        )}
        <Grid.Container gap={4} justify="center" css={{ pt: '48px' }}>
          {gymTrainersQuery.data.length === 0 && (
            <Row css={{ pt: '48px', gap: '12px', flexDirection: 'column', alignItems: 'center' }}>
              <Text>This gym currently doesn't have any assigned trainers</Text>
              <Text>Please check later</Text>
            </Row>
          )}
          {gymTrainersQuery.data.map((trainer) => (
            <Grid xs={12} sm={4} key={trainer.id}>
              <ActionCard
                item={{
                  title: `${trainer.firstName} ${trainer.lastName}`,
                  imageUrl: trainer.avatarUrl,
                }}
                onDrillInClick={() => navigateTo(RouteNames.Trainer.getFullPath(trainer.id))}
                onDeleteClick={() => onDelete(trainer.id)}
                mainActionText="Check trainer"
              />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </div>
  );
};
