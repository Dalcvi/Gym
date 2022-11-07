import { Card, Col, Container, Row, Text } from '@nextui-org/react';
import { PricingItem } from './pricing-item';

export const PricingSection = () => {
  const title = 'Mini';
  const availableBenefits = ['Dining', 'Mining', 'Flying'];
  const allBenefits = ['Dining', 'Mining', 'Flying', 'Grinding'];

  return (
    <section>
      <Container css={{ height: `100vh` }}>
        <Row justify="center" align="center" css={{ pt: `${48 + 76}px` }}>
          <header>
            <Text h2 b>
              Pricing
            </Text>
          </header>
        </Row>
        <Row justify="center" align="center" css={{ mt: '60px' }} gap={2}>
          <Col span={3}>
            <PricingItem
              title={title}
              availableBenefits={availableBenefits}
              allBenefits={allBenefits}
            />
          </Col>
          <Col span={3}>
            <PricingItem
              title={title}
              availableBenefits={availableBenefits}
              allBenefits={allBenefits}
            />
          </Col>
          <Col span={3}>
            <PricingItem
              title={title}
              availableBenefits={availableBenefits}
              allBenefits={allBenefits}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
