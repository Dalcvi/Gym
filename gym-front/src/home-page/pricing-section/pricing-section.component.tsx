import { Button, Col, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Plan } from '../../admin-dashboard-page/plans-table/plans-table.types';
import { useModal } from '../../modals';
import { CreatePricingPlanModal } from '../../modals/create-pricing-plan-modal';
import { EditPricingPlanModal } from '../../modals/edit-pricing-plan-modal';
import { User, useUser } from '../../user';
import { PricingItem } from './pricing-item';

export const PricingSection = () => {
  const [pricingSection, setPricingSection] = useState<HTMLElement | null>();
  const location = useLocation();
  const { user, roles, token, setUser } = useUser();
  const openModal = useModal();

  const plans = useQuery<Plan[]>(`plans`, async () => {
    const benefitsResponse = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/plans`)).json();
    return benefitsResponse as Plan[];
  });

  const isAdmin = user.type === 'AUTHORIZED' && roles.includes('admin');
  const userCanGetPlan = user.type === 'AUTHORIZED' && user.data.planId === null;

  const onActivateClick = async (planId: number) => {
    if (user.type !== 'AUTHORIZED' || !token) {
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${user.data.id}`, {
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
          ...user.data,
          planId,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }

      setUser({ type: 'AUTHORIZED', data: (await response.json()) as User });
    } catch (e) {}
  };

  const onEditClick = (plan: Plan) => {
    openModal((close, key) => <EditPricingPlanModal close={close} key={key} plan={plan} onEdit={plans.refetch} />);
  };

  const onDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/plans/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'manual',
      });
      if (response.status >= 400) {
        throw new Error();
      }
      plans.refetch();
    } catch (e) {}
  };

  useEffect(() => {
    if (location.hash.includes('pricing') && pricingSection) {
      pricingSection.scrollIntoView();
    }
  }, [location, pricingSection]);

  const allBenefits =
    plans.status === 'success'
      ? plans.data
          .map((plans) => plans.benefits)
          .reduce((benefits, planBenefits) => [...benefits, ...planBenefits], [])
          .filter((benefit, index, allBenefits) => allBenefits.findIndex((ben) => ben.id === benefit.id) === index)
      : [];

  return (
    <section id="pricing" ref={setPricingSection}>
      <Container css={{ height: `calc(100vh - 76px)`, mb: 48 }}>
        <Row justify="center" align="center" css={{ pt: `${48 + 76}px` }}>
          <header>
            <Text h2 b>
              Pricing
            </Text>
          </header>
        </Row>
        {isAdmin && (
          <Row justify="flex-end">
            <Button
              auto
              color="gradient"
              onClick={() => {
                openModal((close, key) => <CreatePricingPlanModal close={close} key={key} onCreate={plans.refetch} />);
              }}
            >
              Create new pricing plan
            </Button>
          </Row>
        )}
        <Grid.Container justify="center" css={{ mt: '60px' }} gap={2}>
          {plans.status === 'idle' || plans.status === 'loading' ? (
            <Loading />
          ) : plans.status === 'error' ? (
            <Text>Sorry there was an error!</Text>
          ) : (
            plans.data.map((plan) => {
              console.log(plan.benefits, allBenefits);
              return (
                <Grid xs={12} sm={6} md={4}>
                  <PricingItem
                    key={plan.id}
                    origPrice={plan.originalPrice}
                    curPrice={plan.currentPrice}
                    title={plan.title}
                    availableBenefits={plan.benefits}
                    allBenefits={allBenefits}
                    onActivateClick={userCanGetPlan ? () => onActivateClick(plan.id) : undefined}
                    onEditClick={isAdmin ? () => onEditClick(plan) : undefined}
                    onDeleteClick={isAdmin ? () => onDeleteClick(plan.id) : undefined}
                  />
                </Grid>
              );
            })
          )}
        </Grid.Container>
      </Container>
    </section>
  );
};
