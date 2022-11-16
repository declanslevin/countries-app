import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmptySearch = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}
    >
      <View style={{ alignItems: 'center', padding: 24 }}>
        <MaterialIcons
          name="search-off"
          size={40}
          color="black"
          style={{ marginBottom: 24 }}
        />
        <Text style={{ textAlign: 'center' }}>
          No countries found that match your search!
        </Text>
      </View>
    </View>
  );
};

export { EmptySearch };
