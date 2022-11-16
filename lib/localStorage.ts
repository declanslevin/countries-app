import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryType } from '../types';

const storeData = async (key: string, value: CountryType[]) => {
  let result;
  try {
    const jsonValue = JSON.stringify(value);
    result = await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    result = null;
    console.log('storeData failed', err);
  } finally {
    return result;
  }
};

const getData = async (key: string) => {
  let result;
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    result = jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    result = null;
    console.log('getData failed', err);
  } finally {
    return result;
  }
};

const storeAllCountries = (countries: CountryType[]) => {
  return storeData('allCountries', countries);
};

const getAllCountries = () => {
  return getData('allCountries');
};

const storeVisitedCountries = (countries: CountryType[]) => {
  return storeData('visitedCountries', countries);
};

const getVisitedCountries = () => {
  return getData('visitedCountries');
};

const storeWishlistCountries = (countries: CountryType[]) => {
  return storeData('wishlistCountries', countries);
};

const getWishlistCountries = () => {
  return getData('wishlistCountries');
};

export {
  getAllCountries,
  getVisitedCountries,
  getWishlistCountries,
  storeAllCountries,
  storeVisitedCountries,
  storeWishlistCountries,
};
