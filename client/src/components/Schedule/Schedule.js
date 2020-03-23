import React, { useState, useEffect } from 'react';
import {
  compareAsc,
  parse,
  isSameHour,
} from 'date-fns';
import {
  format,
  utcToZonedTime
} from 'date-fns-tz';

// Components
import { ReminderTable } from '../../components/ReminderTable/ReminderTable';

export const Schedule = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props)
  }, [props]);

  console.log(nameState.reminders)

  const fullDay = [];
  let parsedDate = ''

  for (let i = 0; i < 24; i++) {
    parsedDate = parse(i, 'H', props.date);
    fullDay.push(
      <div key={i} className='date-schedule'>
        <div>{format(parsedDate, 'HH:mm')}</div>
        { // Get reminders for a specific hour
          (nameState.reminders) ? nameState.reminders
            .sort(
              (a, b) => compareAsc(
                utcToZonedTime(a.datetime, 'America/Panama'),
                utcToZonedTime(b.datetime, 'America/Panama')
              )
            )
            .filter(
              (reminder) => isSameHour(
                parsedDate,
                utcToZonedTime(reminder.datetime, 'America/Panama')
              )
            )
            .map((reminder, index) =>
              <ReminderTable
                key={index}
                id={reminder._id}
                description={reminder.description}
                color={reminder.color}
                datetime={utcToZonedTime(reminder.datetime, 'America/Panama')}
                city={reminder.city}
              />
            ) : null
        }
      </div>
    );
  }

  return (
    <section className='full-day'>
      <header>
        <div>Time</div>
        <div>City</div>
        <div>Reminder</div>
      </header>
      <body>
        {fullDay}
      </body> 
    </section>
  )
}
