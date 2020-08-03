import { IRole } from '../../../types';

export const ROLES: IRole[] = [
  { name: 'admin', route: '/admin' },
  { name: 'cassa', route: '/cassa' },
  { name: 'cassa-istantanea', route: '/cassaBar' },
  { name: 'primi', route: '/cucina/primi' },
  { name: 'secondi', route: '/cucina/secondi' },
  { name: 'bar', route: '/cucina/bar' },
  { name: 'cameriere', route: 'cameriere' },
  { name: 'smazzo', route: 'smazzo' }
];
