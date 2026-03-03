import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { themeColors } from '../theme/colors';

type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
  },
});
