import { RoleName } from './Routes';

export interface IRoleRouteInfo {
  requiredRole: RoleName;
  path: string;
  component: React.FunctionComponent;
  title: string;
}
