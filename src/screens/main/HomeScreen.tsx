import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import { addToCart } from '../../store/slices/cartSlice';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

const banners = [
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2',
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { medicines } = useAppSelector((state) => state.products);
  const [query, setQuery] = useState('');
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  const filtered = useMemo(
    () => medicines.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()) || m.category.toLowerCase().includes(query.toLowerCase())),
    [medicines, query]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Find Your Medicine</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search medicines..."
        placeholderTextColor={colors.muted}
        style={[styles.search, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
      />

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.bannerWrap}>
        {banners.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.banner} />
        ))}
      </ScrollView>

      <View style={styles.categoryRow}>
        {['Pain Relief', 'Cold & Flu', 'Supplements', 'Diabetes'].map((cat) => (
          <Pressable key={cat} style={[styles.chip, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingBottom: 18 }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('MedicineDetails', { medicineId: item.id })}
            onAdd={() => dispatch(addToCart(item))}
          />
        )}
        ListEmptyComponent={<EmptyState title="No medicines found" subtitle="Try a different keyword." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  search: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, height: 44, marginBottom: 14 },
  bannerWrap: { marginBottom: 14 },
  banner: { width: 320, height: 140, marginRight: 10, borderRadius: 14 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
});
