import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  const onSubmit = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email');
      return;
    }
    setMessage('Reset link sent to your email');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Forgot password</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      {!!message && <Text style={{ color: message.includes('sent') ? colors.primary : colors.danger, marginBottom: 10 }}>{message}</Text>}
      <Button title="Send reset link" onPress={onSubmit} />
      <Button title="Back to login" onPress={() => navigation.goBack()} variant="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', gap: 12 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 14 },
});
