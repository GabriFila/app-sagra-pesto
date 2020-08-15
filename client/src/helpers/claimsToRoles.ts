import { ROUTE_ROLES } from '../Routes';
import { IRoleRouteInfo } from '../clientTypes';

const claimsToRoles = (claims: { [key: string]: any }): IRoleRouteInfo[] => {
  return ROUTE_ROLES.filter(role =>
    Object.entries(claims)
      .map(pair => pair[0])
      .includes(role.requiredRole)
  );
};
export default claimsToRoles;
