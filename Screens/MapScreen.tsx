import MapView, { PROVIDER_GOOGLE, Marker, Geojson } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Pressable, Text } from 'react-native';
import * as countriesGeojson from '../lib/countries.json';
import * as mapStyle from '../lib/mapStyle.json';
import { CountryType, RootStackParamList } from '../types';
import { useSavedCountries } from '../lib/countriesState';
import { FeatureCollection } from 'geojson';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// interface FeaturesInterface {
//   type: "FeatureCollection";
//   features: {
//     type: "Feature";
//     properties: {
//       ADMIN: string;
//       ISO_A3: string;
//     }
//     geometry: {
//       type: string;
//       coordinates: number[][][];
//     }
//   }[]
// }

const MapScreen = () => {
  const { getCountryFromAll, visitedCountries, wishlistCountries } =
    useSavedCountries();
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const getGeojson = (countries: CountryType[]): FeatureCollection[] => {
    const countryNames = countries.map((country) => country.name);
    const data = countriesGeojson.features
      .filter((feature) => countryNames.includes(feature.properties['ADMIN']))
      .map((item) => ({
        type: 'FeatureCollection',
        features: [
          {
            ...item,
          },
        ],
      }));
    return data;
  };

  const visitedGeo = getGeojson(visitedCountries);
  const wishlistGeo = getGeojson(wishlistCountries);

  return (
    <SafeAreaView>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        customMapStyle={mapStyle}
      >
        {visitedGeo.map((data, i) => (
          <Geojson
            geojson={data}
            strokeColor="darkgreen"
            fillColor="green"
            strokeWidth={2}
            key={`visited-geo-key-${i}`}
          />
        ))}
        {wishlistGeo.map((data, i) => (
          <Geojson
            geojson={data}
            strokeColor="F3C7BE"
            fillColor="F3B1B5"
            strokeWidth={2}
            key={`wishlist-geo-key-${i}`}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export { MapScreen };
