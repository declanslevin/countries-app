import { trackPromise } from 'react-promise-tracker';

const fetchAllCountries = async () => {
  const request = new Request('https://restcountries.com/v3.1/all');
  const result = trackPromise(
    fetch(request)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log('fetchAllCountries failed', err))
  );
  return result;
};

const fetchCountryByName = async (name: string) => {
  const request = new Request(`https://restcountries.com/v3.1/name/${name}`);
  const result = fetch(request)
    .then((res) => res.json())
    .then((data) => {
      return data[0].name.common;
    })
    .catch((err) => console.log(err));
  return result;
};

export { fetchAllCountries, fetchCountryByName };
