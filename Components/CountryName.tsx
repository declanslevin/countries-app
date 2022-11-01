import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { fetchCountryByName } from '../lib/requests';

const CountryName = ({ name }: { name: string }) => {
  const [country, setCountry] = useState('');

  const getCountry = async (name: string) => {
    const result = await fetchCountryByName(name);
    setCountry(result);
    // try {
    //   const result = await fetchCountryByName(name);
    //   setCountry(result);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  useEffect(() => {
    getCountry(name);
  });
  return (
    <Text>
      {typeof country === 'string' ? country : "Couldn't get country"}
    </Text>
  );
};

export { CountryName };
