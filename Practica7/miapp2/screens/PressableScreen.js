import { View, Text, StyleSheet } from 'react-native';

export default function PressableScreen() {
  return (
    <View style={styles.container}>
      <Text>Pressable & Switch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
