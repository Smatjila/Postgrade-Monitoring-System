import { useAuth } from './Backend/AuthContext';
import PageRoutes from './pages/StudentPages/Routes';
import SupRoutes from './pages/SupPages/SupRoutes';
import LoginPage from './pages/Shared/LoginPage';

function App() {
  const { CurrentUser, LoggedInUser, Loading } = useAuth() || {};

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (!LoggedInUser) {
    return <LoginPage />;
  }

  const email = CurrentUser?.email || '';
  const userType = email.startsWith('7') ? 'Supervisor' : email.startsWith('2') ? 'Student' : '';
  console.log(CurrentUser)

  return (
    <>
      {userType === 'Supervisor' && <SupRoutes />}
      {userType === 'Student' && <PageRoutes />}
      {userType === '' && <LoginPage />}
    </>
  );
}

export default App;
