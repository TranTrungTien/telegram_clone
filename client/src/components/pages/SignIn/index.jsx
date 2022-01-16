import { memo, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/authContext";
import axios from "../../../Utils/axiosConfig";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("signin useEffect re-re-render");
    if (localStorage.getItem("token")) {
      console.log({ token: localStorage.getItem("token") });
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("value :", e.target);
    const user = {
      email: e.target.email?.value,
      password: e.target.password?.value,
    };
    console.log({ user });
    try {
      const data = await axios.post("/users", user, {
        headers: {
          "Content-Types": "application/json",
        },
      });

      console.log({ data: data.data });
      if (data.data && setUser) {
        localStorage.setItem("token", data.data.token);
        // socket.auth = {
        //   token: data.data?.token,
        // };
        setUser((preUser) => {
          return { ...preUser, ...data.data.user };
        });
        navigate("/");
      }
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
            name="password"
            required={true}
            min={4}
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 text-gray-200 bg-green-600 hover:bg-green-800 rounded font-semibold"
          >
            Submit
          </button>
          <div className="flex justify-center items-center space-x-2">
            <i className="text-sm font-light">Don't have a account ? </i>
            <Link
              to="/sign-up"
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

export default memo(SignIn);
