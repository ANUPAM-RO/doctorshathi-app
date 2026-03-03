import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { themeColors } from '../theme/colors';

export default function LoadingOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator color={themeColors.light.primary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
