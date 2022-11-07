import { Button, Card, Container, Grid, Row, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { GymCard } from './gym-card';

export const LocationsPage = () => {
  const navigateTo = useNavigate();

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
        <Grid.Container gap={4} justify="center" css={{ pt: '48px' }}>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <GymCard
              gymName={'P. Mindaugo 34, Kaunas'}
              imageUrl={process.env.PUBLIC_URL + './gym.jpg'}
              onClick={() => navigateTo('/')}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </div>
  );
};
