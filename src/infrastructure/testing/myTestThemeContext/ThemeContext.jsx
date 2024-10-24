import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };

// Покрокове керівництво:
// Ми почали зі створення контексту ( createContext()) і призначення ThemeContextйому змінної, яка діятиме як сховище для даних теми.
// У ThemeProvider компоненті ми використовували useStateхук для керування поточною темою, а також створили перемикач, який допоможе перемикатися між світлим і темним режимами.
// Огортає <ThemeContext.Provider>дочірні елементи, роблячи передані йому атрибути доступними для кожного компонента в його піддереві.
// Компонент useTheme— це спеціальний хук, який використовує useContext()контекст ThemeContext.
