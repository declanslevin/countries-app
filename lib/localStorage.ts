import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryType } from '../types';

const storeData = async (key: string, value: CountryType[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
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
