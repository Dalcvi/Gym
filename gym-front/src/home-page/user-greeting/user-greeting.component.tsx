import { Button, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { RegisterModal, useModal } from '../../modals';
import { RouteNames } from '../../router';
import { useUser } from '../../user';
import classes from './user-greeting.module.scss';

export const UserGreeting = () => {
  const openModal = useModal();
  const navigateTo = useNavigate();
  const { user } = useUser();

  return (
    <div className={classes.background}>
      <div className={classes.textContainer}>
        <Text h2 b css={{ mb: '0' }}>
          Better than everyone
        </Text>
        <Text css={{ lh: '1' }}>And we aren't even lying</Text>
        {user.type === 'GUEST' && (
          <Button
            size="lg"
            animated
            shadow
            color="success"
            css={{ br: 0, maxWidth: '307px', width: `90%`, minWidth: '100px', mt: '30px' }}
            onPress={() => {
              openModal((close, key) => <RegisterModal close={close} key={key} />);
            }}
          >
            JOIN NOW!
          </Button>
        )}
        {user.type === 'AUTHORIZED' && (
          <Button
            size="lg"
            animated
            shadow
            color="success"
            css={{ br: 0, maxWidth: '307px', width: `90%`, minWidth: '100px', mt: '30px' }}
            onPress={() => {
              navigateTo(RouteNames.Locations.path);
            }}
          >
            CHECK GYMS
          </Button>
        )}
      </div>
    </div>
  );
};
