import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

const data = ['Pain Relief', 'Cold & Flu', 'Supplements', 'Skin Care', 'Diabetes', 'Heart Care', 'Women Care', 'Baby Care'];

export default function CategoriesScreen() {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  card: { flex: 1, borderWidth: 1, borderRadius: 12, padding: 14, minHeight: 100, justifyContent: 'center' },
});
