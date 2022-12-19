import { Button, Card, Row, Text } from '@nextui-org/react';
import React from 'react';
import { PricingItemProps } from './pricing-item.types';

export const PricingItem = ({
  title,
  origPrice,
  curPrice,
  availableBenefits,
  allBenefits,
  onActivateClick,
  onDeleteClick,
  onEditClick,
}: PricingItemProps) => {
  const isMissmatchingPrices = origPrice !== curPrice;

  return (
    <Card variant="bordered" css={{ borderRadius: 0 }}>
      <Card.Header css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Text h3 transform="uppercase">
          {title}
        </Text>
        <Text del={isMissmatchingPrices} size={isMissmatchingPrices ? 12 : 20}>
          {origPrice}$
        </Text>
        {isMissmatchingPrices && <Text size={20}>{curPrice}$</Text>}
      </Card.Header>
      <Card.Body css={{ textAlign: 'center', p: 0 }}>
        {allBenefits.map((benefit) => {
          const hasBenefit =
            availableBenefits.findIndex((availableBenefit) => availableBenefit.id === benefit.id) !== -1;
          const symbol = hasBenefit ? <>&#10003;</> : <>&minus;</>;
          return (
            <React.Fragment key={benefit.id}>
              <Card.Divider />
              <Row
                css={{
                  p: 12,
                  pr: 24,
                  pl: 24,
                  display: 'flex',
                  gap: '24px',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text b size="$2xl" color={hasBenefit ? 'success' : 'error'} css={{ lh: 1 }}>
                  {symbol}
                </Text>

                <Text css={{ lh: 1 }}>{benefit.name}</Text>
              </Row>
            </React.Fragment>
          );
        })}
        {(onActivateClick || onEditClick || onDeleteClick) && <Card.Divider />}
      </Card.Body>
      {(onActivateClick || onEditClick || onDeleteClick) && (
        <Card.Footer css={{ flexDirection: 'column', gap: 6 }}>
          {onActivateClick && (
            <Button css={{ width: '100%' }} color="success" onClick={onActivateClick}>
              Activate
            </Button>
          )}
          {onEditClick && (
            <Button css={{ width: '100%' }} color="secondary" onClick={onEditClick}>
              Edit
            </Button>
          )}
          {onDeleteClick && (
            <Button css={{ width: '100%' }} color="error" onClick={onDeleteClick}>
              Delete
            </Button>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};
