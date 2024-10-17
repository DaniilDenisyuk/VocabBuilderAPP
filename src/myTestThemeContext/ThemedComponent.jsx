import { useTheme } from './ThemeContext';

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      <h2>Themed Component</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;

// Покрокове керівництво:
// Використовуючи useTheme()хук, ви можете отримати доступ до споживання контексту теми. Пам’ятайте, що ми передали themeфункцію toggleThemeв ThemeContext.Provider.
// Стиль компонента динамічно змінюється залежно від поточної теми. Це показує, як компоненти можуть адаптуватися до глобальних змін стану, керованих контекстом.
// Кнопка запускає toggleThemeфункцію перемикання між світлим і темним режимами.
