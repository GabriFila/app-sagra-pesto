import { IRoleRouteInfo } from '../../../types';
import { ROUTE_ROLES } from '../Routes';

const claimsToRoles = (claims: { [key: string]: any }): IRoleRouteInfo[] => {
  return ROUTE_ROLES.filter(role =>
    Object.entries(claims)
      .map(pair => pair[0])
      .includes(role.requiredRole)
  );
};
export default claimsToRoles;
