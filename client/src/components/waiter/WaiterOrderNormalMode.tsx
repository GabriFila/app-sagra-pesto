import React, { useContext } from 'react';
import { IDBCourse } from '../../../../types';
import WaiterCourse from './WaiterCourse';
import { ServiceContext } from '../../context/ServiceContext';
import WaiterOrderNoteSection from './WaiterOrderNoteSection';

interface IWaiterOrderNormalModeProps {
  courses: IDBCourse[];
  note?: string;
  orderId: string;
}

const WaiterOrderNormalMode: React.FunctionComponent<IWaiterOrderNormalModeProps> = props => {
  const { courses, note, orderId } = props;
  const { serviceRef } = useContext(ServiceContext);

  return (
    <>
      {courses.map(({ courseName, dishes, status, courseId }) => (
        <WaiterCourse
          key={courseName}
          courseName={courseName}
          dishes={dishes}
          status={status}
          courseId={courseId}
        />
      ))}
      <WaiterOrderNoteSection
        orderId={orderId}
        serviceRef={serviceRef}
        note={note}
      />
    </>
  );
};

export default React.memo(WaiterOrderNormalMode);
