import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  const toggleDarkMode = (state: boolean) => {
    document.documentElement.classList.toggle('dark-mode', state);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      toggleDarkMode(true);
      setTheme('dark');
    } else {
      toggleDarkMode(false);
      setTheme('light');
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      toggleDarkMode(true);
    } else {
      setTheme('light');
      toggleDarkMode(false);
    }
  }, []);

  return { theme, toggleTheme };
}
