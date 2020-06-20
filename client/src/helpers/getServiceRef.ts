import { db } from '../fbConfig';
const getCurrentServiceRef = () => {
  const year = new Date().getFullYear();
  return db
    .collection('sagre')
    .doc(String(year))
    .collection('services')
    .where('end', '==', null)
    .limit(1);
};

export default getCurrentServiceRef;
