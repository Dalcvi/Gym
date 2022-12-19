import { Avatar, Button, Container, Divider, Grid, Input, Loading, Row, Spacer, Text } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { Upload } from 'upload-js';
import { getAgeError, useAge, useAvatar, useName } from '../../input-logic';
import { useAuthorizedUser } from '../authortized-page';
import { useUser } from '../use-user.hook';
import { User } from '../user.types';

const upload = Upload({
  apiKey: 'public_kW15azW8UjJ3s4EpcpYQ448bbw5M',
});

export const UserProfile = () => {
  const user = useAuthorizedUser();
  const { setUser, token } = useUser();
  const [firstName, setFirstName, isFirstNameValid, isFirstNameEmpty, isTypingFirstName] = useName(user.firstName);
  const [lastName, setLastName, isLastNameValid, isLastNameEmpty, isTypingLastName] = useName(user.lastName);
  const [age, setAge, isAgeValid, isAgeEmpty, isTypingAge] = useAge(user.age);
  const [avatarUrl, setAvatarUrl, isAvatarUrlValid, _, isUploading, setIsUploading] = useAvatar(
    user.avatarUrl ?? undefined,
  );
  console.log(isAvatarUrlValid);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAnyValueEmpty = isAgeEmpty || isFirstNameEmpty || isLastNameEmpty;
  const isAnyDataInvalid = !isAgeValid || !isFirstNameValid || !isLastNameValid || !isAvatarUrlValid;
  const isTypingAnyInput = isTypingAge || isTypingFirstName || isTypingLastName || isUploading;
  const hasDataChanged =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    age !== user.age ||
    user.avatarUrl !== (avatarUrl ?? null);
  const disableSubmit = isAnyDataInvalid || isAnyValueEmpty || isTypingAnyInput || isLoading || !hasDataChanged;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setIsUploading(true);
    upload.uploadFile(e.target.files[0]).then(({ fileUrl }) => {
      setAvatarUrl(fileUrl);
      setIsUploading(false);
    });
  };

  const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'manual',
        body: JSON.stringify({
          avatarUrl,
          firstName,
          lastName,
          age,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      const updatedUser = (await response.json()) as User;
      setUser({
        type: 'AUTHORIZED',
        data: updatedUser,
      });

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Container css={{ maxWidth: '900px', mt: '60px', width: '90vw' }}>
      <form onSubmit={onUpdate}>
        <Grid.Container>
          <Grid xs={4}>
            <Text h2>{user.firstName} profile</Text>
          </Grid>
          <Grid xs={8} justify="flex-end">
            <Button type="submit" auto color="primary" disabled={disableSubmit}>
              Update
            </Button>
          </Grid>
        </Grid.Container>
        <Divider />
        <Grid.Container css={{ mt: '24px' }}>
          <Grid xs={1} direction="column" alignItems="center">
            <Avatar
              size="xl"
              src={avatarUrl}
              text={`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
              color="secondary"
              textColor={'white'}
            />
            <Spacer y={1} />
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
            <Button auto bordered onPress={() => hiddenFileInput.current?.click()}>
              {isUploading ? <Loading size="sm" /> : 'Change'}
            </Button>
          </Grid>
          <Spacer x={1} />
          <Grid xs={4} direction="column">
            <Text size={18} b>
              {user.email}
            </Text>
            <Text size={14}>
              {user.firstName} {user.lastName}
            </Text>
          </Grid>
          <Grid xs={6} direction="column">
            <Input
              bordered
              fullWidth
              label="First name"
              type="text"
              aria-label="First name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              status={isFirstNameValid || isFirstNameEmpty ? 'primary' : 'error'}
              size="lg"
              placeholder="First name"
            />
            <Input
              bordered
              label="Last name"
              fullWidth
              type="text"
              aria-label="Last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              status={isLastNameValid || isLastNameEmpty ? 'primary' : 'error'}
              size="lg"
              placeholder="Last name"
              css={{
                mt: '12px',
              }}
            />
            <Input
              bordered
              fullWidth
              type="number"
              aria-label="Age"
              label="Age"
              min={12}
              max={150}
              onChange={(e) => {
                const number = parseInt(e.target.value);
                if (isNaN(number)) {
                  return setAge(null);
                }
                setAge(number);
              }}
              value={age === null ? '' : age}
              status={isAgeValid || isAgeEmpty ? 'primary' : 'error'}
              size="lg"
              placeholder="Age"
              css={{
                mt: '12px',
              }}
            />
            {!isAgeValid && age !== null && getAgeError(age) !== undefined && (
              <Row>
                <Text size={12} color="error">
                  {getAgeError(age)}
                </Text>
              </Row>
            )}
          </Grid>
        </Grid.Container>
      </form>
    </Container>
  );
};
