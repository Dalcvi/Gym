import { Button, Card, Loading, Row, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useUser } from '../user';

type Item = {
  title: string;
  imageUrl: string | null;
};

export const ActionCard = ({
  item,
  mainActionText,
  onDrillInClick,
  onEditClick,
  onDeleteClick,
}: {
  item: Item;
  mainActionText: string;
  onDrillInClick: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}) => {
  const { roles } = useUser();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  return (
    <Card variant="bordered">
      {item.imageUrl ? (
        <Card.Image src={item.imageUrl} width={400} height={225} showSkeleton />
      ) : (
        <Row css={{ width: '100%', height: '225px', background: '$gray300' }} />
      )}
      <Card.Body>
        <Text size="$2xl" b>
          {item.title}
        </Text>
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Button color={'success'} css={{ width: '100%', minWidth: '100px' }} size="md" shadow onClick={onDrillInClick}>
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
            {mainActionText}
          </Text>
        </Button>
        {roles.includes('admin') && (
          <>
            {onEditClick && (
              <Button
                color={'secondary'}
                css={{ width: '100%', minWidth: '100px' }}
                size="md"
                onClick={onEditClick}
                flat
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
                  Edit
                </Text>
              </Button>
            )}
            {onDeleteClick && (
              <Button
                color={'error'}
                bordered
                css={{ width: '100%', minWidth: '100px' }}
                size="md"
                onClick={async () => {
                  setIsLoadingDelete(true);
                  await onDeleteClick();
                  setIsLoadingDelete(false);
                }}
              >
                {isLoadingDelete ? (
                  <Loading color="error" />
                ) : (
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
                    Delete
                  </Text>
                )}
              </Button>
            )}
          </>
        )}
      </Card.Footer>
    </Card>
  );
};
