import PublicLayout from '@/components/layout/public-layout';
import FormLogin from './component/form-login';

const Login = () => {
  return (
    <PublicLayout>
      <div className="h-screen flex items-center justify-center">
        <FormLogin />
      </div>
    </PublicLayout>
  )
}

export default Login
