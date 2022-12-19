import { Button, Input, Link, Loading, Modal, Row, Text } from '@nextui-org/react';
import { useState } from 'react';
import { getPasswordError, useAge, useEmail, useName, usePassword, getAgeError } from '../../input-logic';
import { LoginModal } from '../login-modal';
import { useModal } from '../use-modal.hook';

export const RegisterModal = ({ close }: { close: () => void }) => {
  const [email, setEmail, isEmailValid, isEmailEmpty, isTypingEmail] = useEmail();
  const [password, setPassword, isPasswordValid, isPasswordEmpty, isTypingPassword] = usePassword();
  const [firstName, setFirstName, isFirstNameValid, isFirstNameEmpty, isTypingFirstName] = useName();
  const [lastName, setLastName, isLastNameValid, isLastNameEmpty, isTypingLastName] = useName();
  const [age, setAge, isAgeValid, isAgeEmpty, isTypingAge] = useAge();
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModal();

  const isAnyValueEmpty = isEmailEmpty || isPasswordEmpty || isAgeEmpty || isFirstNameEmpty || isLastNameEmpty;
  const isAnyDataInvalid = !isEmailValid || !isPasswordValid || !isAgeValid || !isFirstNameValid || !isLastNameValid;
  const isTypingAnyInput = isTypingEmail || isTypingPassword || isTypingAge || isTypingFirstName || isTypingLastName;

  const disableSubmit = isAnyDataInvalid || isAnyValueEmpty || isTypingAnyInput || isLoading;

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
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
          firstName,
          lastName,
          age,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      setIsLoading(false);
      openModal((close, key) => <LoginModal close={close} key={key} />);
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={close}>
      <Modal.Header>
        <Text b size={18}>
          Register
        </Text>
      </Modal.Header>
      <form onSubmit={onRegister}>
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
          <Input
            bordered
            fullWidth
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
            fullWidth
            type="text"
            aria-label="Last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            status={isLastNameValid || isLastNameEmpty ? 'primary' : 'error'}
            size="lg"
            placeholder="Last name"
          />
          <Input
            bordered
            fullWidth
            type="number"
            aria-label="Age"
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
              marginBottom: isAgeValid ? '16px' : '6px',
            }}
          />
          {!isAgeValid && age !== null && getAgeError(age) !== undefined && (
            <Row
              css={{
                marginBottom: '6px',
              }}
            >
              <Text size={12} color="error">
                {getAgeError(age)}
              </Text>
            </Row>
          )}
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
            <Text size={16}>
              Already have an account?{' '}
              <Link
                href="#"
                css={{ display: 'inline' }}
                onClick={() => {
                  close();
                  openModal((close, key) => <LoginModal close={close} key={key} />);
                }}
              >
                Log In
              </Link>
            </Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={close}>
            Close
          </Button>
          <Button auto type="submit" disabled={disableSubmit}>
            {isLoading ? <Loading type="points" color="currentColor" size="sm" /> : 'Sign up'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
