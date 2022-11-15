import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NoCountriesProps {
  screen: 'Visited' | 'Wishlist';
}

const NoCountries = ({ screen }: NoCountriesProps) => {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          padding: 24,
        }}
      >
        <Ionicons
          name="sad-outline"
          size={40}
          color="black"
          style={{ marginBottom: 24 }}
        />
        <Text style={{ textAlign: 'center', marginBottom: 12 }}>
          You haven't added any countries to your{' '}
          {screen === 'Visited' ? 'Visited countries list' : 'Wishlist'}.
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Try adding some from the Countries tab!
        </Text>
      </View>
    </View>
  );
};

export { NoCountries };
