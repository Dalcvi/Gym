import { Button, Checkbox, Input, Modal, Row, Text } from '@nextui-org/react';
import { useState } from 'react';
import { LoginResponse, useUser } from '../../user';
import { getPasswordError, useEmail, usePassword } from '../../input-logic';

export const LoginModal = ({ close }: { close: () => void }) => {
  const [email, setEmail, isEmailValid, isEmailEmpty, isTypingEmail] = useEmail();
  const [password, setPassword, isPasswordValid, isPasswordEmpty, isTypingPassword] = usePassword();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRemember, setShouldRemember] = useState(true);
  const { user, setUser, setToken, setRoles } = useUser();

  const isAnyValueEmpty = isEmailEmpty || isPasswordEmpty;
  const isAnyDataInvalid = !isEmailValid || !isPasswordValid;
  const isTypingAnyInput = isTypingEmail || isTypingPassword;

  const disableSubmit = isAnyDataInvalid || isAnyValueEmpty || isTypingAnyInput || isLoading;

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'manual',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      const { accessToken, user, roles } = (await response.json()) as LoginResponse;

      setToken(accessToken, shouldRemember ? 'local' : 'state');
      setUser({
        type: 'AUTHORIZED',
        data: user,
      });
      setRoles(roles ?? []);

      setIsLoading(false);
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (user.type !== 'GUEST') {
    close();
  }

  return (
    <Modal open={true} onClose={close}>
      <Modal.Header>
        <Text b size={18}>
          Login
        </Text>
      </Modal.Header>
      <form onSubmit={onLogin}>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            aria-label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            status={isEmailValid || isEmailEmpty ? 'primary' : 'error'}
            size="lg"
            placeholder="Email"
          />
          <Input.Password
            bordered
            fullWidth
            aria-label="Password"
            status={isPasswordValid || isPasswordEmpty ? 'primary' : 'error'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            type="password"
            placeholder="Password"
            css={{
              marginBottom: isPasswordValid ? '16px' : '6px',
            }}
          />
          {!isPasswordValid && getPasswordError(password) !== undefined && (
            <Row
              css={{
                marginBottom: '6px',
              }}
            >
              <Text size={12} color="error">
                {getPasswordError(password)}
              </Text>
            </Row>
          )}
          <Row>
            <Checkbox isSelected={shouldRemember} onChange={setShouldRemember}>
              <Text size={14}>Remember me</Text>
            </Checkbox>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={close}>
            Close
          </Button>
          <Button type="submit" auto disabled={disableSubmit}>
            Sign in
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
