import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { themeColors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'solid' | 'outline';
};

export default function Button({ title, onPress, loading = false, variant = 'solid' }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === 'solid'
          ? { backgroundColor: colors.primary }
          : { backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 1 },
      ]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'solid' ? '#fff' : colors.primary} />
      ) : (
        <Text style={[styles.text, variant === 'solid' ? { color: '#fff' } : { color: colors.primary }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
