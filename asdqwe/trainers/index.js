(() => {
  const calendarElement = document.querySelector('.calendar');
  const days = 7;
  const workHours = 16;

  const createDaysListElement = (days, hours) => {
    const hoursElement = Array.from({ length: hours })
      .map(() => '<li class="calendar__hour"></li>')
      .join('');

    const hoursListElement = `<ul class="calendar__hours">
        ${hoursElement}
    </ul>`;

    const daysElement = Array.from({ length: days })
      .map(() => `<li class="calendar__day">${hoursListElement}</li>`)
      .join('');

    const calendarDaysListElement = document.createElement(`ul`);
    calendarDaysListElement.classList.add('calendar__days');
    calendarDaysListElement.innerHTML = `${daysElement}`;
    return calendarDaysListElement;
  };

  const createAsideHoursElement = (hours) => {
    const hoursElement = Array.from({ length: hours })
      .map((_, index) => `<li class="calendar-aside__hour">${index + 22 - hours}</li>`)
      .join('');

    const hoursListElement = document.createElement(`ul`);
    hoursListElement.classList.add('calendar-aside');
    hoursListElement.innerHTML = `${hoursElement}`;

    return hoursListElement;
  };

  const asideHoursElement = createAsideHoursElement(workHours);
  const daysListElement = createDaysListElement(days, workHours);

  calendarElement.append(asideHoursElement);
  calendarElement.append(daysListElement);

  const unavailability = [
    {
      // should put up actual day
      date: 0,
      timesTaken: [
        {
          start: '6:45',
          end: '7:30',
        },
        {
          start: '7:30',
          end: '10:00',
        },
        {
          start: '12:20',
          end: '14:30',
        },
      ],
    },
    {
      // should put up actual day
      date: 4,
      timesTaken: [
        {
          start: '12:00',
          end: '13:30',
        },
        {
          start: '15:20',
          end: '19:00',
        },
        {
          start: '19:30',
          end: '22:00',
        },
      ],
    },
  ];

  const convertTimeToPixels = (time, hourHeight) => {
    const [hour, minutes] = time.split(':');
    const hoursAdjusted = Number(hour) - (22 - workHours);
    return hoursAdjusted * hourHeight + (hourHeight / 60) * Number(minutes);
  };

  const createUnavailableTimeElement = (time) => {
    const element = document.createElement('div');
    element.classList.add('calendar__unavailable-time');
    element.style.top = `${time.start}px`;
    element.style.height = `${time.end - time.start}px`;

    return element;
  };

  unavailability.forEach((day) => {
    const { date, timesTaken } = day;

    const dateDayElement = document.querySelectorAll('.calendar__day')[date];
    const combinedTimesTaken = timesTaken.reduce((newTimesTaken, currentTime) => {
      const cannotBeCombined = !newTimesTaken.find((newTime) => newTime.end === currentTime.start);
      if (cannotBeCombined) {
        return [...newTimesTaken, currentTime];
      }

      return newTimesTaken.map((newTime) => {
        if (newTime.end !== currentTime.start) {
          return newTime;
        }

        return {
          start: newTime.start,
          end: currentTime.end,
        };
      });
    }, []);

    const hourHeight = document.querySelector('.calendar__hour').offsetHeight;

    combinedTimesTaken
      .map((time) => ({
        start: convertTimeToPixels(time.start, hourHeight),
        end: convertTimeToPixels(time.end, hourHeight),
      }))
      .forEach((time) => {
        const element = createUnavailableTimeElement(time);
        dateDayElement.appendChild(element);
      });
  });
})();
