import { Card, Text, Button } from '@nextui-org/react';

export const GymCard = ({
  gymName,
  onClick,
  imageUrl,
}: {
  gymName: string;
  onClick: () => void;
  imageUrl: string;
}) => {
  return (
    <Card variant="bordered">
      <Card.Image src={imageUrl} objectFit="cover" />
      <Card.Body>
        <Text size="$2xl" b>
          {gymName}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button
          color={'success'}
          css={{ width: '100%', minWidth: '100px' }}
          size="md"
          shadow
          onClick={onClick}
        >
          <Text
            b
            transform="uppercase"
            css={{
              '@xs': {
                fontSize: '$lg',
              },
              '@md': {
                fontSize: '$xl',
              },
            }}
          >
            See trainers
          </Text>
        </Button>
      </Card.Footer>
    </Card>
  );
};
