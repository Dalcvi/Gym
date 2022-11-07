import classes from './home-page.module.scss';
import { Button, Text } from '@nextui-org/react';

export const HomePage = () => {
  return (
    <div className={classes.background}>
      <div className={classes.textContainer}>
        <Text h2 b css={{ mb: '0' }}>
          Better than everyone
        </Text>
        <Text>And we aren't even lying</Text>
        <Button></Button>
      </div>
    </div>
  );
};
