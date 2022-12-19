import { useMemo, useState } from 'react';
import { Booking } from '../../admin-dashboard-page/bookings-table/bookings.types';
import classes from './time-table.module.scss';
import { Button, Popover, Text } from '@nextui-org/react';
import classnames from 'classnames';
import { useUser } from '../../user';

const days = 7;
const startHour = 6;
const endHour = 22;
const hours = endHour - startHour;

type PositionedBooking = Booking & {
  position: Position;
};

type Position = { y: number; length: number; column: number };

const getFirstDayOfTheWeek = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - newDate.getDay());
  return newDate;
};

const getDayDiff = (date1: Date, date2: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
};

export const TimeTable = ({
  bookings,
  userId,
  onDelete,
}: {
  bookings: Booking[];
  userId: string | undefined;
  onDelete: () => void;
}) => {
  const startOfTheWeek = useMemo(() => getFirstDayOfTheWeek(new Date()), []);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const columnCells = useMemo(
    () => Array.from({ length: hours }).map((_, key) => <div className={classes.cell} key={key} />),
    [],
  );

  const columns = useMemo(
    () =>
      Array.from({ length: days }).map((_, key) => (
        <div className={classes.column} key={key}>
          {columnCells}
        </div>
      )),
    [columnCells],
  );

  const calculatePosition = (booking: Booking): Position => {
    const startingDate = new Date(booking.dateFrom);
    const endingDate = new Date(booking.dateTo);
    const getDayTimeInMinutes = (date: Date) => (date.getHours() * 60 + date.getMinutes() - startHour * 60) / 2;
    const startingAtMinutes = getDayTimeInMinutes(startingDate);
    const length = getDayTimeInMinutes(endingDate) - startingAtMinutes;
    console.log(booking);
    return {
      y: startingAtMinutes,
      column: getDayDiff(startingDate, startOfTheWeek),
      length,
    };
  };

  const onRemove = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/bookings/${id}`, {
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
      onDelete();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const bookingsWithPosition = bookings
    .filter((booking) => {
      const dateFrom = new Date(booking.dateFrom);
      const dateTo = new Date(booking.dateTo);

      const dayDiff = getDayDiff(new Date(booking.dateFrom), startOfTheWeek);
      return dayDiff >= 0 && dayDiff <= 6 && dateFrom.getHours() >= startHour && dateTo.getHours() <= endHour;
    })
    .map(
      (booking) =>
        ({
          ...booking,
          position: calculatePosition(booking),
        } as PositionedBooking),
    );

  const columnTitles = Array.from({ length: days }).map((_, index) => {
    const day = new Date(startOfTheWeek);
    day.setDate(day.getDate() + index);
    return (
      <li key={day.toDateString()}>
        <Text>
          {day.getFullYear()}-{day.getMonth()}-{day.getDate()}
        </Text>
      </li>
    );
  });

  const isUserContent = (booking: Booking) => booking.client.id === userId || booking.trainer.id === userId;

  return (
    <div className={classes.timeTable}>
      <ul className={classes.dates}>{columnTitles}</ul>
      <div className={classes.grid}>
        {columns}
        <ul className={classes.hoursContainer}>
          {Array.from({ length: hours }).map((_, index) => (
            <li className={classes.hour} key={index}>
              {index + startHour}
            </li>
          ))}
        </ul>
        <>
          {bookingsWithPosition.map((booking) =>
            isUserContent(booking) ? (
              <Popover>
                <Popover.Trigger>
                  <div
                    key={booking.id}
                    className={classnames(classes.floatingTime, classes.clickableTime)}
                    style={{
                      width: `calc(100% / ${days} - 1px)`,
                      top: `${booking.position.y}px`,
                      left: `calc(100% / ${days} * ${booking.position.column})`,
                      height: `${booking.position.length}px`,
                    }}
                  />
                </Popover.Trigger>
                <Popover.Content css={{ px: '$4', py: '$2', pt: '12px', pb: '12px', pr: '18px', pl: '18px' }}>
                  <Button disabled={isLoading} auto color={'error'} onClick={() => onRemove(booking.id)}>
                    Remove booking
                  </Button>
                </Popover.Content>
              </Popover>
            ) : (
              <div
                key={booking.id}
                className={classnames(classes.floatingTime)}
                style={{
                  width: `calc(100% / ${days} - 1px)`,
                  top: `${booking.position.y}px`,
                  left: `calc(100% / ${days} * ${booking.position.column})`,
                  height: `${booking.position.length}px`,
                }}
              />
            ),
          )}
        </>
      </div>
    </div>
  );
};
