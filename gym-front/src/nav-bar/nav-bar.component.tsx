import { Text, Navbar } from '@nextui-org/react';
import classes from './nav-bar.module.scss';

export const NavBar = () => {
  return (
    // <div className={classes.container}>
    <Navbar variant="sticky" disableShadow isBordered maxWidth="fluid">
      <Navbar.Brand>
        <Text h1 size="$3xl" css={{ mb: '0' }} b color="inherit" hideIn="xs">
          HabibiGym
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor={'success'}
        hideIn="xs"
        variant={'underline'}
      >
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link isActive href="/locations">
          Locations
        </Navbar.Link>
        <Navbar.Link href="/trainers">Trainers</Navbar.Link>
        <Navbar.Link href="/admin-dashboard">Admin</Navbar.Link>

        <Navbar.Link href="/#pricing">Pricing</Navbar.Link>
        <Navbar.Item>
          <Text>Join us!</Text>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
    // </div>
  );
};
