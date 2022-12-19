import { Button, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Gym } from '../admin-dashboard-page/gyms-table/gyms-table.types';
import { CreateGymModal, EditGymModal, useModal } from '../modals';
import { RouteNames } from '../router';
import { useUser } from '../user';
import { ActionCard } from '../action-card';

export const LocationsPage = () => {
  const navigateTo = useNavigate();
  const { roles } = useUser();
  const openModal = useModal();
  const gymsQuery = useQuery<Gym[]>('gyms', async () => {
    const gyms = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms`)).json();
    return gyms as Gym[];
  });

  const onLocationEditClick = (gym: Gym) =>
    openModal((close, key) => <EditGymModal close={close} key={key} onUpdate={() => gymsQuery.refetch()} gym={gym} />);
  const onDelete = async (id: number) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms/${id}`, {
      method: 'DELETE',
    });
    gymsQuery.refetch();
  };

  if (gymsQuery.status === 'idle' || gymsQuery.status === 'loading') {
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
  if (gymsQuery.status === 'error') {
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
          <Text h2>Gym Locations</Text>
        </Row>
        {roles.includes('admin') && (
          <Row justify="flex-end" css={{ mt: '24px' }}>
            <Button
              auto
              color="gradient"
              onClick={() =>
                openModal((close, key) => (
                  <CreateGymModal close={close} key={key} onCreate={() => gymsQuery.refetch()} />
                ))
              }
            >
              Create location
            </Button>
          </Row>
        )}
        <Grid.Container gap={4} justify="center" css={{ pt: '48px' }}>
          {gymsQuery.data.map((gym) => (
            <Grid xs={12} sm={4} key={gym.id}>
              <ActionCard
                item={{
                  title: gym.address,
                  imageUrl: gym.imageUrl,
                }}
                onDrillInClick={() => navigateTo(RouteNames.Locations.children.Trainers.getFullPath(gym.id))}
                onEditClick={() => onLocationEditClick(gym)}
                onDeleteClick={() => onDelete(gym.id)}
                mainActionText="See trainers"
              />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </div>
  );
};
