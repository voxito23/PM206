import { View, Text, StyleSheet } from 'react-native';

export default function ListasScreen() {
  return (
    <View style={styles.container}>
      <Text>FlatList & SectionList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
