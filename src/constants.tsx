export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://immense-scrubland-11716.herokuapp.com'