const rolesToClaims = (roles: string[]) => {
  return roles.reduce((acc, val) => {
    return { ...acc, [val.toString()]: true };
  }, {});
};

export default rolesToClaims;
