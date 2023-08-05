import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Calendar() {
  const router = useRouter();

  const [update, setUpdate] = useState(
    {} as {
      start: string;
      end: string;
      backgroundColor: string;
      title?: string;
    }
  );

  const start = new Date();
  const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

  const data = [
    {
      title: 'sala 1',
      start,
      end,
      backgroundColor: 'green',
      extendedProps: { id: 1 },
    },
    {
      title: 'sala 2',
      start: new Date(new Date().setHours(start.getHours() + 1)),
      end: new Date(new Date().setHours(start.getHours() + 2)),
      backgroundColor: 'purple',
      extendedProps: { id: 2 },
    },
    {
      title: 'sala 3',
      start: new Date(new Date().setHours(start.getHours() + 2)),
      end: new Date(new Date().setHours(start.getHours() + 3)),
      backgroundColor: '#000',
      extendedProps: { id: 3 },
    },
  ];

  const [events, setEvents] = useState(data);

  const calendarRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

  const initialView = isMobile ? 'dayGridMonth' : 'timeGridWeek';
  const leftToolbar = isMobile
    ? 'dayGridMonth,timeGridDay'
    : 'dayGridMonth,timeGridWeek,timeGridDay';
  const rightToolbar = isMobile
    ? 'today prev,next'
    : 'today prevYear,prev,next,nextYear';

  useEffect(() => {
    console.log('----useEffect----');
    console.log('====useEffect====');
    // @ts-ignore
    setEvents((event) => {
      const newId = events[events.length - 1].extendedProps.id + 1;

      return [
        ...event,
        {
          title: `sala ${newId}`,
          extendedProps: { id: newId },
          ...update,
        },
      ];
    });
  }, [update]);

  return (
    <div className='container' style={{ padding: 20 }}>
      <FullCalendar
        height={'80vh'}
        nowIndicator={true}
        eventClick={(info: any) =>
          console.log(info.event.extendedProps, info.event.title)
        }
        editable={true}
        views={{
          dayGrid: {
            selectable: true,
          },
          timeGrid: {
            selectable: true,
          },
          dayGridMonth: {
            selectable: false,
          },
        }}
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          bootstrap5Plugin,
          listPlugin,
        ]}
        initialView={initialView}
        eventDrop={(info: any) => {
          const eventFiltered = events.filter(
            (event) => event.extendedProps.id !== info.event.extendedProps.id
          ) as any;
          setEvents([
            ...eventFiltered,
            {
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
              backgroundColor: info.event.backgroundColor,
              extendedProps: { id: info.event.extendedProps.id },
            },
          ]);
          alert('Dropped ' + info.event.title);
        }}
        eventResize={(info: any) => {
          const eventFiltered = events.filter(
            (event) => event.extendedProps.id !== info.event.extendedProps.id
          ) as any;
          setEvents([
            ...eventFiltered,
            {
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
              backgroundColor: info.event.backgroundColor,
              extendedProps: { id: info.event.extendedProps.id },
            },
          ]);
          alert('Resized ' + info.event.title);
        }}
        select={(info: any) => {
          // @ts-ignore
          //   setEvents((event) => {
          //     const newId = events[events.length - 1].extendedProps.id + 1;
          //     return [
          //       ...event,
          // {
          //   title: `sala ${newId}`,
          //   start: info.startStr,
          //   end: info.endStr,
          //   backgroundColor: 'gray',
          //   extendedProps: { id: newId },
          // },
          //     ];
          //   });

          setUpdate({
            // title: `sala ${newId}`,
            start: info.startStr,
            end: info.endStr,
            backgroundColor: 'gray',
            // extendedProps: { id: newId },
          });

          console.log('----00----');
          console.log('====00====');
          alert('selected ' + info.startStr + ' to ' + info.endStr);
        }}
        events={events}
        locale={'en'}
        timeZone={'Europe/London'}
        titleFormat={{ year: 'numeric', month: 'long' }}
        allDayText={'24h'}
        allDaySlot={false}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          list: 'list',
        }}
        // customButtons={{
        //   custom1: {
        //     text: 'custom 1',
        //     // hint: "Next 2022",
        //     click: () => {
        //       // calendar.changeView( 'resourceTimelineWeek' );
        //       // calendar.incrementDate( { days: -7 } );
        //       //   console.log(
        //       //     calendarRef.current.calendar.currentData.dateProfile
        //       //       .currentRange
        //       //   );
        //     },
        //   },
        //   custom2: {
        //     text: 'About page',
        //     click: function () {
        //       router.push('/about');
        //     },
        //   },
        // }}
        headerToolbar={{
          left: leftToolbar,
          center: 'title',
          right: rightToolbar,
        }}
      />
    </div>
  );
}
