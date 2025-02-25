const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
  authenticated: () => window.localStorage.getItem('auth') !== null,
  unauthenticated: () => window.localStorage.getItem('auth') === null,
  // define your custom audiences here as needed
};

export default function getAudiences() {
  return AUDIENCES;
}

export function getActiveAudiences() {
  const activeAudiences = [];
  const audiences = Object.keys(AUDIENCES);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < audiences.length; index++) {
    const audience = audiences[index];
    if (AUDIENCES[audience]()) {
      activeAudiences.push(audience);
    }
  }

  return activeAudiences;
}
