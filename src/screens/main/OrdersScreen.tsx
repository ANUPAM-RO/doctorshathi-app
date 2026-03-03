import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import EmptyState from '../../components/EmptyState';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

export default function OrdersScreen() {
  const { orders } = useAppSelector((state) => state.orders);
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState title="No orders yet" subtitle="Your orders will appear here." />}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{item.id}</Text>
            <Text style={{ color: colors.muted }}>Date: {item.date}</Text>
            <Text style={{ color: colors.muted }}>Total: Rs {item.totalAmount}</Text>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 },
});
