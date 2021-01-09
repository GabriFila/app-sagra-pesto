import { db } from '../fbConfig';
const getCurrentStorageRef = (year?: number) => {
  if (year === undefined) year = new Date().getFullYear();
  return (
    db
      .collection('sagre')
      .doc(String(year))
      // .doc(String(year))
      .collection('storage')
      .doc('storage')
  );
};

export default getCurrentStorageRef;
