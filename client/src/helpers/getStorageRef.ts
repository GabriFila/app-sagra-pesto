import { db } from '../fbConfig';
const getCurrentStorageRef = () => {
  const year = new Date().getFullYear();
  return db
    .collection('sagre')
    .doc(String(year))
    .collection('storage')
    .doc('storage');
};

export default getCurrentStorageRef;
