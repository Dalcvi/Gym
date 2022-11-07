import { Button, Container } from '@nextui-org/react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const navigateTo = useNavigate();

  const navigateToAdminPage = (page: string) => navigateTo(`/admin-dashboard/${page}`);
  return (
    <div>
      <Container css={{ maxWidth: '90%', mt: '60px' }}>
        <Button.Group color="gradient" bordered>
          <Button onClick={() => navigateToAdminPage('users')}>Users</Button>
          <Button onClick={() => navigateToAdminPage('plans')}>Plans</Button>
          <Button onClick={() => navigateToAdminPage('benefits')}>Benefits</Button>
          <Button onClick={() => navigateToAdminPage('gyms')}>Gyms</Button>
          <Button onClick={() => navigateToAdminPage('bookings')}>Bookings</Button>
        </Button.Group>
        <Outlet />
      </Container>
    </div>
  );
};
