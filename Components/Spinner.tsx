import { View, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="skyblue" />
    </View>
  );
};

export { Spinner };
