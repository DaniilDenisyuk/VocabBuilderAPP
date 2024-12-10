import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import SchoolManagement from '../../school/pages/homePage';

export default function TestPage() {
  return (
    <Provider store={store}>
      <SchoolManagement />
    </Provider>
  );
}
