import { View, Text, StyleSheet } from 'react-native';

export default function ImageScreen() {
  return (
    <View style={styles.container}>
      <Text>ImageBackground & SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
