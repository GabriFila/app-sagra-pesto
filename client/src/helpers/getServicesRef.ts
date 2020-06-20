import { db } from '../fbConfig';

const getServicesRef = () => {
  const year = new Date().getFullYear();
  return db.collection('sagre').doc(String(year)).collection('services');
};

export default getServicesRef;
