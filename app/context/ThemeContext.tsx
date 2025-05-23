import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#3B82F6',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  border: '#E5E7EB',
  secondary: '#6B7280',
  danger: '#DC2626',
  success: '#059669',
  gray: '#9CA3AF',
  textSecondary: '#4B5563',
  completedText: '#9CA3AF',
  modalOverlay: 'rgba(17, 24, 39, 0.3)',
};

const darkColors = {
  primary: '#60A5FA',
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  border: '#374151',
  secondary: '#9CA3AF',
  danger: '#EF4444',
  success: '#10B981',
  gray: '#6B7280',
  textSecondary: '#D1D5DB',
  completedText: '#6B7280',
  modalOverlay: 'rgba(17, 24, 39, 0.7)',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: lightColors,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(deviceTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    setTheme(deviceTheme === 'dark' ? 'dark' : 'light');
  }, [deviceTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
