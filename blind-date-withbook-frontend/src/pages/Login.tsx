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
    console.log(data);
    const toastId = toast.loading("Logging in");

    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.token);
    console.log("lookign for", user);

    dispatch(setUser({ user: user, token: res.data.token }));
    toast.success("Logged in", { id: toastId, duration: 2000 });
    navigate(`/${(user as { role: string }).role}/dashboard`);
  };

  return (
    <div className="mx-auto container my-20">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
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
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="text"
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
        if you are not registered yet, please{" "}
        <Link to="/register">register</Link>
      </form>
    </div>
  );
};

export default Login;
