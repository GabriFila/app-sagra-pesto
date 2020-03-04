const claimsToRoles = (claims: { [key: string]: any }) =>
  Object.entries(claims).map(pair => pair[0]);

export default claimsToRoles;
