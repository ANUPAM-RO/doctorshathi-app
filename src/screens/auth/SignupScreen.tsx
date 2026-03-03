import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppDispatch } from '../../store/hooks';
import { authSuccess, startAuthLoading } from '../../store/slices/authSlice';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const onSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    setError(null);
    setLoading(true);
    dispatch(startAuthLoading());
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    dispatch(authSuccess());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
      <Input label="Full name" value={form.name} onChangeText={(name) => setForm((s) => ({ ...s, name }))} />
      <Input label="Email" value={form.email} onChangeText={(email) => setForm((s) => ({ ...s, email }))} autoCapitalize="none" />
      <Input label="Password" value={form.password} onChangeText={(password) => setForm((s) => ({ ...s, password }))} secureTextEntry />
      {!!error && <Text style={{ color: colors.danger, marginBottom: 10 }}>{error}</Text>}
      <Button title="Signup" onPress={onSignup} loading={loading} />
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={[styles.link, { color: colors.primary }]}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 18 },
  link: { textAlign: 'center', marginTop: 14, fontWeight: '600' },
});
