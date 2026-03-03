import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart, decrementQty, incrementQty, removeFromCart } from '../../store/slices/cartSlice';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  const total = useMemo(() => items.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0), [items]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.medicine.id}
        ListEmptyComponent={<EmptyState title="Your cart is empty" subtitle="Add medicines from Home screen." />}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{item.medicine.name}</Text>
              <Text style={{ color: colors.muted }}>Rs {item.medicine.price} x {item.quantity}</Text>
            </View>
            <View style={styles.qtyWrap}>
              <Pressable onPress={() => dispatch(decrementQty(item.medicine.id))} style={[styles.qtyBtn, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>-</Text>
              </Pressable>
              <Text style={{ color: colors.text, width: 24, textAlign: 'center' }}>{item.quantity}</Text>
              <Pressable onPress={() => dispatch(incrementQty(item.medicine.id))} style={[styles.qtyBtn, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>+</Text>
              </Pressable>
              <Pressable onPress={() => dispatch(removeFromCart(item.medicine.id))}>
                <Text style={{ color: colors.danger, marginLeft: 10 }}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.total, { color: colors.text }]}>Total: Rs {total}</Text>
        <Button title="Checkout" onPress={() => dispatch(clearCart())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  row: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 },
  qtyWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 28, height: 28, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  footer: { borderTopWidth: 1, paddingTop: 12, marginTop: 6 },
  total: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
});
