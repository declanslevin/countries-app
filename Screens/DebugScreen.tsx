import { useEffect, useState } from 'react';
import { SafeAreaView, View, Button } from 'react-native';
import { clearAll } from '../lib/localStorage';

const DebugTab = () => {
  const clickHandler = async () => {
    await clearAll();
  };
  // let initialRender = true;
  // const [press, setPress] = useState(false);

  // const pressHandler = () => {
  //   if (!press) {
  //     clearAll();
  //     setPress
  //   }
  // }

  // useEffect(() => {
  //   if (initialRender) {
  //     initialRender = false;
  //   } else {
  //     clearAll()
  //   }
  // }, [])
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="clear local data" onPress={clickHandler} />
    </View>
    // </SafeAreaView>
  );
};

export { DebugTab };
