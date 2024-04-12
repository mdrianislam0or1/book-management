import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: { email: string; password: string }) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const toastId = toast.loading("Logging in");

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token);

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${(user as { role: string }).role}/dashboard`);
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md bg-white rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button
          htmlType="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </Button>
        <p className="text-center text-sm text-gray-600 mt-4">
          If you are not registered yet, please{" "}
          <Link to="/register" className="text-blue-500">
            register
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;
