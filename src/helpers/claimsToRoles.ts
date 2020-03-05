import { ROLES } from './constants';
const claimsToRoles = (claims: { [key: string]: any }) =>
  Object.entries(claims)
    .map(pair => pair[0])
    .filter(role => ROLES.includes(role));

export default claimsToRoles;
