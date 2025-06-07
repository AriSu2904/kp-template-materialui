export const mappingError = (error: any) => {
  const { message } = error;
  switch (message) {
    case 'TOKEN DECODE ERROR':
      return 'Invalid token!';
    case 'INVALID TOKEN FORMAT':
      return 'Invalid token format!'
    case 'UNKNOWN TOKEN':
      return 'Unkown Token!';
    case 'TOKEN INTEGRITY INVALID':
      return 'Invalid Token Owner!'
    default:
      return `Error occurred: ${message}`;
  }
}
