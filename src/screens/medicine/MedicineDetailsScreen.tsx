import React, { useMemo, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '../../components/Button';
import { addToCart } from '../../store/slices/cartSlice';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'MedicineDetails'>;

export default function MedicineDetailsScreen({ route }: Props) {
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;
  const { medicines } = useAppSelector((state) => state.products);
  const [uploadedUri, setUploadedUri] = useState<string | null>(null);

  const medicine = useMemo(() => medicines.find((m) => m.id === route.params.medicineId), [medicines, route.params.medicineId]);

  if (!medicine) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Medicine not found.</Text>
      </View>
    );
  }

  const handleUpload = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow gallery access to upload prescription.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setUploadedUri(result.assets[0].uri);
      Alert.alert('Success', 'Prescription uploaded successfully');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: medicine.image }} style={styles.image} />
      <Text style={[styles.name, { color: colors.text }]}>{medicine.name}</Text>
      <Text style={[styles.price, { color: colors.primary }]}>Rs {medicine.price}</Text>
      <Text style={{ color: colors.muted, marginBottom: 8 }}>{medicine.description}</Text>
      <Text style={{ color: medicine.stock > 0 ? colors.primary : colors.danger, marginBottom: 14 }}>
        {medicine.stock > 0 ? `In stock: ${medicine.stock}` : 'Out of stock'}
      </Text>

      <Button title="Add to Cart" onPress={() => dispatch(addToCart(medicine))} />

      {medicine.requiresPrescription ? (
        <View style={{ marginTop: 12 }}>
          <Button title="Upload Prescription" onPress={handleUpload} variant="outline" />
          {!!uploadedUri && <Image source={{ uri: uploadedUri }} style={styles.preview} />}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 14, marginBottom: 14 },
  name: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  price: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  preview: { width: 120, height: 120, borderRadius: 10, marginTop: 10 },
});
