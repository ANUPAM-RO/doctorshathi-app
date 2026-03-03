import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { themeColors } from '../theme/colors';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: error ? colors.danger : colors.border,
            backgroundColor: colors.card,
          },
        ]}
        placeholderTextColor={colors.muted}
      />
      {!!error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
