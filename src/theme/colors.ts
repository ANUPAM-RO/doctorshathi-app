export const themeColors = {
  light: {
    background: '#F5FFF9',
    card: '#FFFFFF',
    text: '#0E2B1D',
    muted: '#5B6F65',
    primary: '#20B15A',
    border: '#D8EDE0',
    danger: '#E04F5F',
  },
  dark: {
    background: '#0B1710',
    card: '#11221A',
    text: '#E8FFF0',
    muted: '#9EC3AF',
    primary: '#33CC75',
    border: '#1E3A2D',
    danger: '#FF6E7F',
  },
};

export type ThemeMode = keyof typeof themeColors;
