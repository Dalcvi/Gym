import classes from './user-greeting.module.scss';
import { Button, Text } from '@nextui-org/react';

export const UserGreeting = () => {
  return (
    <div className={classes.background}>
      <div className={classes.textContainer}>
        <Text h2 b css={{ mb: '0' }}>
          Better than everyone
        </Text>
        <Text css={{ lh: '1' }}>And we aren't even lying</Text>
        <Button
          size="lg"
          animated
          shadow
          color="success"
          css={{ br: 0, maxWidth: '307px', width: `90%`, minWidth: '100px', mt: '30px' }}
        >
          JOIN NOW!
        </Button>
      </div>
    </div>
  );
};
