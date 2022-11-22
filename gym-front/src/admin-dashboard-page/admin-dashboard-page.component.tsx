import { Button, Container, Loading } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    fetch('https://localhost:7030/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: '!TheFirstAdminPassword1',
      }),
    }).then(async (data) => {
      setAccessToken((await data.json()).accessToken);
      setIsLoading(false);
    });
  }, []);

  const navigateToAdminPage = (page: string) => navigateTo(`/admin-dashboard/${page}`);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Container css={{ maxWidth: '90%', mt: '60px' }}>
        <Button.Group color="gradient" bordered>
          <Button onClick={() => navigateToAdminPage('users')}>Users</Button>
          <Button onClick={() => navigateToAdminPage('gym-trainers')}>Gym trainers</Button>
          <Button onClick={() => navigateToAdminPage('plans')}>Plans</Button>
          <Button onClick={() => navigateToAdminPage('plan-benefits')}>Plans benefits</Button>
          <Button onClick={() => navigateToAdminPage('benefits')}>Benefits</Button>
          <Button onClick={() => navigateToAdminPage('gyms')}>Gyms</Button>
          <Button onClick={() => navigateToAdminPage('bookings')}>Bookings</Button>
          <Button onClick={() => navigateToAdminPage('user-bookings')}>User bookings</Button>
        </Button.Group>
        <Outlet context={{ accessToken }} />
      </Container>
    </div>
  );
};
