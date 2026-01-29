import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthForm from '../components/User/AuthForm';
import { loginApi } from '../services/login';

const DEFAULT_EMAIL = 'maneesha.k@doctutorials.com';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const adminData = await loginApi(email, password);

      if (!adminData || !adminData.adminId) {
        alert("Login succeeded but admin data is incomplete.");
        return;
      }


      // Navigate to Home screen directly
      navigation.replace('Home');

    } catch (err) {
      alert(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging You In..." />;
  }

  return (
    <AuthForm
      isLogin
      onSubmit={loginHandler}
      credentialsInvalid={{ email: false, password: false }}
      defaultEmail={DEFAULT_EMAIL}
      defaultPassword=""
    />
  );
}

export default LoginScreen;
