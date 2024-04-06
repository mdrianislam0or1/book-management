import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useRegisterMutation } from '../redux/features/auth/authApi';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const [registerUser] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const toastId = toast.loading('Registering');

    try {
      registerUser(userInfo).unwrap();
      toast.success('Registered successfully', { id: toastId, duration: 2000 });
      navigate(`/login`);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="mx-auto container my-20">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button
          htmlType="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Register
        </Button>
        <div className="mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
