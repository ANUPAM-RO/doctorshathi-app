export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  MedicineDetails: { medicineId: string };
};
