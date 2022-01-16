import axios from "../../../Utils/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/authContext";
import { memo, useContext } from "react";
const SingUp = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !e.target?.email?.value ||
      !e.target?.username?.value ||
      !e.target?.password?.value
    ) {
      return;
    }
    const user = {
      username: e.target?.username?.value,
      email: e.target?.email.value,
      password: e.target?.password.value,
    };
    try {
      await axios.post("/users/create", user, {
        headers: {
          "Content-Types": "application/json",
        },
      });

      const user_response = await axios.post(
        "/users",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Types": "application/json",
          },
        }
      );
      localStorage.setItem("token", user_response.data?.token);

      setUser((preUser) => {
        return { ...preUser, ...user_response.data.user };
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.teahub.io/photos/full/242-2424579_nature-wallpaper-tree.jpg')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center w-full min-h-screen"
    >
      <div
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
        }}
        className="rounded-md text-white shadow-2xl px-6 py-14"
      >
        <h1 className="text-center text-2xl font-bold leading-10 mb-6">
          Telegram
        </h1>
        <form
          onSubmit={onSubmit}
          className="w-420 h-auto flex flex-col justify-center items-center space-y-3"
        >
          <input
            className="w-full px-3 py-1 focus:outline-none text white rounded"
            type="text"
            name="email"
            required={true}
            placeholder="Email"
          />
          <input
            className="w-full px-3 py-1 focus:outline-none text white rounded"
            type="text"
            name="username"
            required={true}
            placeholder="Username"
          />
          <input
            className="w-full px-3 py-1 focus:outline-none text white rounded"
            type="password"
            name="password"
            required={true}
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 text-gray-200 bg-green-600 hover:bg-green-800 rounded font-semibold"
          >
            Submit
          </button>
          <div className="flex justify-center items-center space-x-2">
            <i className="text-sm font-light">Have a account ? </i>
            <Link
              to="/sign-in"
              className="hover:underline text-gray-500 hover:text-gray-200"
            >
              Sign Up Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(SingUp);
