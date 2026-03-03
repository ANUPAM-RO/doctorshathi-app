import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authFailure, authSuccess, clearAuthError, startAuthLoading } from '../../store/slices/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Enter a valid email';
    if (!password.trim()) nextErrors.password = 'Password is required';
    if (password.length < 6) nextErrors.password = 'Minimum 6 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onLogin = async () => {
    dispatch(clearAuthError());
    if (!validate()) return;
    try {
      dispatch(startAuthLoading());
      await new Promise((resolve) => setTimeout(resolve, 700));
      dispatch(authSuccess());
    } catch {
      dispatch(authFailure('Invalid email or password'));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Login to continue ordering medicines.</Text>
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" error={errors.email} />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry error={errors.password} />
      {!!error && <Text style={[styles.errorBanner, { color: colors.danger }]}>{error}</Text>}
      <Button title="Login" onPress={onLogin} loading={loading} />
      <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={[styles.link, { color: colors.primary }]}>Forgot password?</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={[styles.link, { color: colors.primary }]}>Don&apos;t have an account? Signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { marginBottom: 22, fontSize: 14 },
  link: { textAlign: 'center', marginTop: 14, fontWeight: '600' },
  errorBanner: { marginBottom: 10, fontSize: 13, fontWeight: '600' },
});
