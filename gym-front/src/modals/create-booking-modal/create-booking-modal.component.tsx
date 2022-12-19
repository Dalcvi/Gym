import { Button, Card, Image, Input, Loading, Modal, Row, Spacer, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Booking } from '../../admin-dashboard-page/bookings-table/bookings.types';
import { useUser } from '../../user';

function isIntersecting(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return !(start1 > end2 || end1 < start2);
}

export const CreateBookingModal = ({
  close,
  onCreate,
  currentBookings,
  startHour,
  endHour,
  clientId,
  trainerId,
}: {
  close: () => void;
  onCreate: () => void;
  currentBookings: Booking[];
  startHour: number;
  endHour: number;
  clientId: string;
  trainerId: string;
}) => {
  const [startingDate, setStartingDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const isCurrentDateInterlapping = !!currentBookings.find((booking) => {
    const endingDate = new Date(startingDate);
    endingDate.setHours(endingDate.getHours() + 1);
    endingDate.setMinutes(endingDate.getMinutes() + 30);

    return isIntersecting(startingDate, endingDate, new Date(booking.dateFrom), new Date(booking.dateTo));
  });
  const isOverTime =
    (startingDate.getHours() === endHour - 3 && startingDate.getMinutes() > 30) || startingDate.getHours() > endHour;

  const disableSubmit = isCurrentDateInterlapping || isLoading || isOverTime;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSubmit) {
      return;
    }

    setIsLoading(true);
    try {
      const endingDate = new Date(startingDate);
      endingDate.setHours(endingDate.getHours() + 1);
      endingDate.setMinutes(endingDate.getMinutes() + 30);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/bookings`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'manual',
        body: JSON.stringify({
          dateFrom: startingDate,
          dateTo: endingDate,
          clientId,
          trainerId,
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
  const currentDate = new Date();

  return (
    <Modal open={true} onClose={close} width="fit-content">
      <Modal.Header>
        <Text b size={18}>
          Book time
        </Text>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <Text size={16} css={{ mb: 6 }}>
            Starting time
          </Text>
          <Row>
            <Input
              bordered
              fullWidth
              aria-label="Starting date"
              type="date"
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                newDate.setHours(startingDate.getHours());
                newDate.setMinutes(startingDate.getMinutes());
                setStartingDate(newDate);
              }}
              value={startingDate.toISOString().split('T')[0]}
              status="primary"
              size="lg"
              placeholder="Starting date"
              required
              min={currentDate.toISOString().split('T')[0]}
            />
            <Spacer x={1} />
            <Input
              bordered
              fullWidth
              aria-label="Starting hour"
              type="time"
              size="lg"
              min={(() => {
                if (
                  currentDate.getFullYear() === startingDate.getFullYear() &&
                  currentDate.getMonth() === startingDate.getMonth() &&
                  currentDate.getDate() === startingDate.getDate() &&
                  currentDate.getHours() >= startHour
                ) {
                  return `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`;
                }

                return `${startHour.toString().padStart(2, '0')}:00`;
              })()}
              max={`${endHour - 3}:30`}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':');
                const newDate = new Date(startingDate);
                newDate.setHours(parseInt(hours));
                newDate.setMinutes(parseInt(minutes));
                setStartingDate(newDate);
              }}
              required
              placeholder="Starting hour"
              status="primary"
              value={`${startingDate.getHours().toString().padStart(2, '0')}:${startingDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
            />
          </Row>
          <Text size={16} css={{ mb: 6 }}>
            Ending time
          </Text>
          <Row>
            <Input
              bordered
              fullWidth
              aria-label="Starting date"
              type="date"
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                newDate.setHours(startingDate.getHours());
                newDate.setMinutes(startingDate.getMinutes());
                setStartingDate(newDate);
              }}
              value={startingDate.toISOString().split('T')[0]}
              status="primary"
              size="lg"
              disabled={true}
              placeholder="Starting date"
              required
              min={startingDate.toISOString().split('T')[0]}
            />
            <Spacer x={1} />
            <Input
              bordered
              fullWidth
              aria-label="Starting hour"
              type="time"
              size="lg"
              min={(() => {
                if (
                  currentDate.getFullYear() === startingDate.getFullYear() &&
                  currentDate.getMonth() === startingDate.getMonth() &&
                  currentDate.getDate() === startingDate.getDate() &&
                  currentDate.getHours() >= startHour
                ) {
                  return `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`;
                }

                return `${startHour.toString().padStart(2, '0')}:00`;
              })()}
              max={`${endHour}:00`}
              disabled={true}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':');
                const newDate = new Date(startingDate);
                newDate.setHours(parseInt(hours));
                newDate.setMinutes(parseInt(minutes));
                setStartingDate(newDate);
              }}
              required
              placeholder="Starting hour"
              status="primary"
              value={(() => {
                const endingDate = new Date(startingDate);
                endingDate.setHours(endingDate.getHours() + 1);
                endingDate.setMinutes(endingDate.getMinutes() + 30);
                return `${endingDate.getHours().toString().padStart(2, '0')}:${endingDate
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}`;
              })()}
            />
          </Row>
          {/* <Input
            bordered
            fullWidth
            aria-label="Ending date"
            type="datetime-local"
            value={endingDate
              .toLocaleString('lt-LT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(' ', 'T')}
            disabled={true}
            status="primary"
            size="lg"
            placeholder="Ending date"
            required
          /> */}
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
