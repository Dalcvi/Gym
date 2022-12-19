import { Text, Navbar, Button, Dropdown, Avatar } from '@nextui-org/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RegisterModal, useModal } from '../modals';
import { RouteNames } from '../router';
import { useUser } from '../user';

export const NavBar = () => {
  const currentLocation = useLocation();
  const openModal = useModal();
  const { user, logout } = useUser();
  const navigateTo = useNavigate();

  return (
    <Navbar variant="sticky" disableShadow isBordered maxWidth="fluid">
      <Navbar.Brand>
        <Text h1 size="$3xl" css={{ mb: '0' }} b color="inherit" hideIn="xs">
          HabibiGym
        </Text>
      </Navbar.Brand>
      <Navbar.Content activeColor={'success'} hideIn="xs" variant={'underline'}>
        <Navbar.Link
          to="/"
          as={Link}
          isActive={currentLocation.pathname === RouteNames.Home.path && currentLocation.hash === ''}
        >
          Home
        </Navbar.Link>
        <Navbar.Link isActive={currentLocation.pathname.includes(RouteNames.Locations.path)} as={Link} to="/locations">
          Locations
        </Navbar.Link>
        <Navbar.Link
          to="/admin-dashboard"
          isActive={currentLocation.pathname.includes(RouteNames.AdminDashboard.path)}
          as={Link}
        >
          Admin dashboard
        </Navbar.Link>

        <Navbar.Link
          to="/#pricing"
          as={Link}
          isActive={currentLocation.pathname === RouteNames.Home.path && currentLocation.hash === '#pricing'}
          onClick={() => {}}
        >
          Pricing
        </Navbar.Link>
        {user.type === 'GUEST' && (
          <Button
            auto
            color="success"
            shadow
            onPress={() => {
              openModal((close, key) => <RegisterModal close={close} key={key} />);
            }}
          >
            Join us!
          </Button>
        )}
        {user.type === 'AUTHORIZED' && (
          <Dropdown>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                src={user.data.avatarUrl ?? undefined}
                text={`${user.data.firstName[0].toUpperCase()}${user.data.lastName[0].toUpperCase()}`}
                textColor="white"
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              onAction={(key) => {
                switch (key) {
                  case 'profile':
                    navigateTo('/profile');
                    break;
                  case 'logout':
                    logout();
                    break;
                  default:
                    throw new Error('Unreachable');
                }
              }}
              color="secondary"
              aria-label="Profile actions"
            >
              <Dropdown.Item key="profile" aria-label="Profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="logout" aria-label="Logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Content>
    </Navbar>
  );
};
