import DashboardLayout from 'components/ui/DashboardLayout';
import LoginForm from 'components/user/LoginForm';
import { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <DashboardLayout>
      <h1>LOGIN</h1>
      <LoginForm />
    </DashboardLayout>
  );
};
export default Dashboard;
