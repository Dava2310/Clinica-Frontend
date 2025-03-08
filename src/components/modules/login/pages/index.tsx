import Logo from "../../../assets/Logo.png";

import Alert from "../../../common/alert/Alert";
import { useLogin } from "../hook/useAuth";

const Login = () => {
  const { register, errors, onSubmit, errorP } = useLogin();
  return (
    <>
      <div className="w-full h-screen">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
              Clínica Frontend
            </a>
            {errorP && <Alert message={errorP} type={"error"} />}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Inicia sesión en tu cuenta
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tu correo electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="micorreo@gmail.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "El correo electrónico es requerido",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message:
                            "El correo no cumple con el formato requerido.",
                        },
                      })}
                    />
                    {errors?.email && (
                      <span className=" w-full text-red-500 text-sm">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "La contraseña es requerida",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                          message:
                            "El contraseña no cumple con el formato requerido.",
                        },
                        min: 8,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors?.password && (
                      <span className=" w-full text-red-500 text-sm">
                        {errors.password?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
