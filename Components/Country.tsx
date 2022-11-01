import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, Pressable, Text, View } from 'react-native';
// import { Flag } from './Flag';

import { CountryType as CountryProps, RootStackParamList } from '../types';

const Country = ({
  name,
  flag,
  official,
  population,
  capital,
  continents,
  map,
}: CountryProps) => {
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() =>
        nav.navigate('Country', {
          name,
          flag,
          official,
          population,
          capital,
          continents,
          map,
        })
      }
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <Image
          source={{ uri: flag }}
          style={{
            height: 50,
            width: 75,
            marginRight: 8,
            borderColor: 'black',
            borderWidth: 1,
            resizeMode: 'contain',
          }}
        />
        {/* <Flag source={flag} avatar /> */}
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

export { Country, CountryProps };
