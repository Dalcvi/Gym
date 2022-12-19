import { Button, Dropdown, Input, Loading, Modal, Row, Spacer, Text } from '@nextui-org/react';
import { Key, useState } from 'react';
import { useQuery } from 'react-query';
import { Benefit } from '../../admin-dashboard-page/benefits-table/benefits-table.types';
import { Plan } from '../../admin-dashboard-page/plans-table/plans-table.types';
import { useUser } from '../../user';
import { CreateBenefitsModal } from '../create-benefits-modal';
import { useModal } from '../use-modal.hook';

export const EditPricingPlanModal = ({
  close,
  onEdit,
  plan,
}: {
  close: () => void;
  onEdit: () => void;
  plan: Plan;
}) => {
  const [title, setTitle] = useState(plan.title);
  const [originalPrice, setOriginalPrice] = useState(plan.originalPrice);
  const [currentPrice, setCurrentPrice] = useState(plan.currentPrice);
  const [benefits, setBenefits] = useState<Set<Key>>(new Set(plan.benefits.map((benefit) => benefit.id.toString())));
  const openModal = useModal();

  const benefitsQuery = useQuery<Benefit[]>(`benefits`, async () => {
    const benefitsResponse = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/benefits`)).json();
    return benefitsResponse as Benefit[];
  });

  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const disableSubmit = title.length === 0 || isLoading;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/plans/${plan.id}`, {
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
          title,
          originalPrice,
          currentPrice,
        }),
      });
      if (response.status >= 400) {
        throw new Error();
      }
      const benefitsList = [...benefits];
      const newBenefits = benefitsList.filter(
        (newBenefit) => !plan.benefits.map((ben) => ben.id.toString()).includes(newBenefit.toString()),
      );
      const addRequests = newBenefits.map((benefitId) =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/plans/${plan.id}/benefits/${benefitId}`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          redirect: 'manual',
        }),
      );
      const removedBenefits = plan.benefits.filter((prevBenefit) => !benefitsList.includes(prevBenefit.id.toString()));
      console.log(plan.benefits, benefitsList, newBenefits, removedBenefits, 'rem');
      const removeRequests = removedBenefits.map((benefit) =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/plans/${plan.id}/benefits/${benefit.id}`, {
          method: 'DELETE',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          redirect: 'manual',
        }),
      );

      await Promise.all([...addRequests, ...removeRequests]);
      onEdit();
      setIsLoading(false);
      close();
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (benefitsQuery.status === 'error') {
    close();
  }

  return (
    <Modal open={true} onClose={close} width="fit-content" preventClose>
      <Modal.Header>
        <Text b size={18}>
          Edit pricing plan
        </Text>
      </Modal.Header>
      {benefitsQuery.status === 'idle' || benefitsQuery.status === 'loading' || benefitsQuery.status === 'error' ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit}>
          <Modal.Body>
            <Input
              bordered
              fullWidth
              aria-label="Pricing plan title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              status="primary"
              size="lg"
              label="Title"
              placeholder="Pricing plan title"
              required
            />
            <Input
              bordered
              fullWidth
              aria-label="Original price"
              type="text"
              onChange={(e) => {
                setOriginalPrice(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
              }}
              label="Original price"
              value={originalPrice}
              status="primary"
              size="lg"
              placeholder="Original price"
              required
            />
            <Input
              bordered
              fullWidth
              aria-label="Current price"
              type="number"
              onChange={(e) => {
                setCurrentPrice(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
              }}
              value={currentPrice}
              status="primary"
              label="Current price"
              size="lg"
              placeholder="Current price"
              required
            />
            <Dropdown>
              <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize', mb: 6, width: '100%' }}>
                Select benefits
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Multiple selection actions"
                color="secondary"
                items={benefitsQuery.data}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={benefits}
                onSelectionChange={(e) => {
                  setBenefits(new Set(e));
                }}
              >
                {(item) => <Dropdown.Item key={(item as Benefit).id}>{(item as Benefit).name}</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
            <Row justify="center">
              <Button
                light
                color="primary"
                css={{ width: '100%' }}
                onClick={() => {
                  openModal((close, key) => (
                    <CreateBenefitsModal close={close} key={key} onCreate={benefitsQuery.refetch} />
                  ));
                }}
              >
                Create new benefit
              </Button>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={close}>
              Close
            </Button>
            <Button type="submit" auto disabled={disableSubmit}>
              Edit
            </Button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};
