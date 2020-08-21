export const hasRoles = (roles: string[], reqRoles: string[]) => {
  return roles.some(role => reqRoles.includes(role));
};
