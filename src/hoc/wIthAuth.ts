const withAuth = (Component: any): any => {
  if (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('iubh-user') === null
  ) {
    if (typeof window !== 'undefined') {
      window.location.assign('/login');
    }
  }
  return Component;
};

export default withAuth;
