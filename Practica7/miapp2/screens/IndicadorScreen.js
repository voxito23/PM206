import { View, Text, StyleSheet } from 'react-native';

export default function IndicadorScreen() {
  return (
    <View style={styles.container}>
      <Text>ActivityIndicator & KeyboardAvoidingView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
