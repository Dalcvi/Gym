import { Button, Card, Image, Input, Loading, Modal, Text } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { Upload } from 'upload-js';
import { useAvatar, useName } from '../../input-logic';
import { useUser } from '../../user';

const upload = Upload({
  apiKey: 'public_kW15azW8UjJ3s4EpcpYQ448bbw5M',
});

export const CreateGymModal = ({ close, onCreate }: { close: () => void; onCreate: () => void }) => {
  const [address, setAddress, _, isAddressEmpty, isTypingAddress] = useName();
  const [imageUrl, setImageUrl, isImageValid, isImageEmpty, isUploading, setIsUploading] = useAvatar();
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useUser();

  const isAnyValueEmpty = isAddressEmpty || isImageEmpty;
  const isTypingAnyInput = isTypingAddress || isUploading;
  console.log(isImageValid, isAnyValueEmpty, isTypingAnyInput, isLoading);
  const disableSubmit = !isImageValid || isAnyValueEmpty || isTypingAnyInput || isLoading;
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setIsUploading(true);
    upload.uploadFile(e.target.files[0]).then(({ fileUrl }) => {
      setImageUrl(fileUrl);
      setIsUploading(false);
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/gyms`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'manual',
        body: JSON.stringify({
          address,
          imageUrl,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      onCreate();
      setIsLoading(false);
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (!roles.includes('admin')) {
    close();
  }

  return (
    <Modal open={true} onClose={close} width="fit-content">
      <Modal.Header>
        <Text b size={18}>
          Create new gym
        </Text>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            aria-label="Address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            status="primary"
            size="lg"
            placeholder="Address"
          />
          {imageUrl ? (
            <Image src={imageUrl} width={400} height={225} showSkeleton />
          ) : (
            <Card css={{ width: '400px', height: '225px', background: '$gray300' }}>
              <></>
            </Card>
          )}
          <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
          <Button auto bordered onPress={() => hiddenFileInput.current?.click()}>
            {isUploading ? <Loading size="sm" /> : 'Change'}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={close}>
            Close
          </Button>
          <Button type="submit" auto disabled={disableSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
