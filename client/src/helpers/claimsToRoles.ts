import { IRole } from '../../../types';
import { ROLES } from './constants';
const claimsToRoles = (claims: { [key: string]: any }): IRole[] => {
  return ROLES.filter(role =>
    Object.entries(claims)
      .map(pair => pair[0])
      .includes(role.name)
  );
};
export default claimsToRoles;
