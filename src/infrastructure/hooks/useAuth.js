import { useSelector } from 'react-redux';
import {
  selectAuthUser,
  selectIsLogin,
  selectIsRefreshing,
} from '../../features/auth/redux/authSlice';

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectAuthUser);
  // console.log('useAuth hook:', { isLogin, isRefreshing, user });

  return {
    isLogin,
    isRefreshing,
    user,
  };
};
export default useAuth;
