import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { updateProfile } from '../../store/slices/profileSlice';
import { logout } from '../../store/slices/authSlice';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { themeColors } from '../../theme/colors';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  const save = () => {
    dispatch(updateProfile(form));
    setEditing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Input label="Name" value={form.name} editable={editing} onChangeText={(name) => setForm((s) => ({ ...s, name }))} />
      <Input label="Email" value={form.email} editable={editing} onChangeText={(email) => setForm((s) => ({ ...s, email }))} />
      <Input label="Phone" value={form.phone} editable={editing} onChangeText={(phone) => setForm((s) => ({ ...s, phone }))} />
      <Input label="Address" value={form.address} editable={editing} onChangeText={(address) => setForm((s) => ({ ...s, address }))} />

      {!editing ? (
        <Button title="Edit Profile" onPress={() => setEditing(true)} />
      ) : (
        <Button title="Save Changes" onPress={save} />
      )}
      <Button title="Logout" onPress={() => dispatch(logout())} variant="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 4 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
});
