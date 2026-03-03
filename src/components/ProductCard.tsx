import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Medicine } from '../types';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { themeColors } from '../theme/colors';

type Props = {
  item: Medicine;
  onPress: () => void;
  onAdd: () => void;
};

export default function ProductCard({ item, onPress, onAdd }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={{ color: colors.muted }}>{item.category}</Text>
      <View style={styles.row}>
        <Text style={[styles.price, { color: colors.primary }]}>Rs {item.price}</Text>
        <Pressable onPress={onAdd} style={[styles.add, { backgroundColor: colors.primary }]}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  add: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
  },
});
