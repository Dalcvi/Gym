import { Card, Text } from '@nextui-org/react';
import { PricingItemProps } from './pricing-item.types';

export const PricingItem = ({ title, availableBenefits, allBenefits }: PricingItemProps) => {
  return (
    <Card variant="bordered" css={{ borderRadius: 0 }}>
      <Card.Body css={{ textAlign: 'center' }}>
        <Text h3 transform="uppercase">
          {title}
        </Text>
      </Card.Body>
      {allBenefits.map((benefit) => {
        const hasBenefit = availableBenefits.includes(benefit);
        const symbol = hasBenefit ? <>&#10003;</> : <>&minus;</>;
        return (
          <>
            <Card.Divider />
            <Card.Body
              css={{ display: 'flex', gap: '24px', flexDirection: 'row', alignItems: 'center' }}
            >
              {/* <Text>{hasBenefit ? <>&plus;</> : <>&minus;</>}</Text> */}
              <Text b size="$2xl" color={hasBenefit ? 'success' : 'error'} css={{ lh: 1 }}>
                {symbol}
              </Text>

              <Text css={{ lh: 1 }}>{benefit}</Text>
            </Card.Body>
          </>
        );
      })}
    </Card>
  );
};
