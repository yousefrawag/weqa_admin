import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import timeGridWeek from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import { useNavigate } from 'react-router-dom';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb';

const AssetsCalnder = () => {
  const { data, isLoading } = useQuerygetiteams("assets", "assets");
 
  const [calendarEvents, setCalendarEvents] = useState([]);
 
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
      setIsMobile(mobileRegex.test(userAgent));
    };

    checkMobile();
  }, []);

  useEffect(() => {
    if (data?.data?.data ) {
      // Format missions for calendar
      const formattedAssets = data?.data?.data.filter((item) => item.nextMaintenanceDate )
        ?.map((item) => ({
          id: item?._id,
          title: item?.assetsName,
          date: item?.nextMaintenanceDate?.split('T')[0],
          extendedProps: {
            type: 'assets',
            estbilshment:item.building?.name,
            addedBy:item.createBy?.username

           
          },
        }))
        

    

 

      setCalendarEvents([...formattedAssets]);
    }
  }, [data]);

  const handleEventClick = (info) => {
    const id = info.event.id;
    const type = info.event.extendedProps.type;
    navigate(`/assetOverview/${id}`)
  };

  return (
    <div className='w-full h-full'>
      <Breadcrumb pageName="التقويم" />

      {/* Section Filter Dropdown */}



      <div className='shadow-md w-full h-full mt-10'>
        <FullCalendar
     plugins={[dayGridPlugin, timeGridWeek, timeGridDay, interactionPlugin]}
     initialView="dayGridMonth"
     headerToolbar={{
       start: 'today prev,next',
       center: 'title',
       end: 'dayGridMonth,timeGridWeek,timeGridDay',
     }}
          height={isMobile ? 'auto' : '90vh'}
          events={calendarEvents}
          locales={allLocales}
          locale="ar"
          eventClick={handleEventClick}
          eventClassNames={() => "cursor-pointer w-full h-full"}
          eventContent={(arg) => {
            const { type , estbilshment  , addedBy} = arg.event.extendedProps;
            return (
              <div className="fc-event-content p-2 w-full h-full">
               
                  <div className='w-full p-2 flex flex-col gap-4'>
                    <span className='w-full text-wrap'>الأصل: {arg.event?.title}</span>
                    <span className='w-full text-wrap'>
                        المنشأه:
                        {
                            estbilshment
                        }
                    </span>
                    <span className='w-full text-wrap'>
                        مضاف من قبل:
                        {
                            addedBy
                        }
                    </span>
                   
                  </div>
              
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default AssetsCalnder;
