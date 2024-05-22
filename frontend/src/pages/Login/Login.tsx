import { Link, useNavigate } from "react-router-dom";
import { PiAt, PiKey, PiSignInLight, PiArrowLeft } from "react-icons/pi";
import { useCallback, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/service/store/store";
import { loginAction, TOKEN_COOKIE, USER_COOKIE } from "@/service/store/auth";

import { InputIcon } from "@/components/Input";
import Button from "@/components/Button";
import { ROUTES } from "@/routes/constants";

import Img from "@/assets/bg-mobile.jpg";
import { styles } from "./constants";
import { Auth, AuthTypes, schema } from "@/utils/types/Auth";
import { useQueryParam } from "@/utils/hooks/useQueryParam";
import { removeCookies } from "@/utils/cookies";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const error = useQueryParam("error");
  // console.log(error);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthTypes>({ resolver: zodResolver(schema) });

  useEffect(() => {
    error && setLoginError(error), [error];
    removeCookies(USER_COOKIE);
    removeCookies(TOKEN_COOKIE);
  }, [error]);

  const onSubmit: SubmitHandler<AuthTypes> = useCallback(
    async ({ username, password }) => {
      try {
        const authData: Auth = {
          username,
          password,
        };

        await dispatch(loginAction(authData));
        !authState.isLoading && navigate(ROUTES.DASHBOARD.ROOT);
      } catch (error) {
        setLoginError("Error in the login request");
      } finally {
        reset();
      }
    },
    [navigate, dispatch, reset, authState.isLoading]
  );

  const renderErrorMessage = (error: { message?: string }) => {
    return error && <p className="p-1 text-red-700">{error.message}</p>;
  };

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-20">
          <h2 className="font-mono mb-5 text-4xl font-bold"> Login </h2>
          {loginError !== null ? (
            <div className="block w-full rounded-lg bg-red-100 text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white mb-8">
              <div className="p-6">
                <p className="text-base text-red-600">{loginError}</p>
              </div>
            </div>
          ) : (
            <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
              {"Log in to your account if you are an employee"}
            </p>
          )}

          <InputIcon
            icon={<PiAt />}
            {...register("username")}
            type="email"
            placeholder="Email Address"
            styles="mb-6"
          />
          {renderErrorMessage(errors.username!)}
          <InputIcon
            icon={<PiKey />}
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {renderErrorMessage(errors.password!)}

          <div className="flex flex-col items-center justify-around mt-6 space-y-6 lg:flex-row lg:space-y-0">
            <div className="font-thing text-black">Let's Login</div>
            <Button
              className={`${styles.button} ${
                isSubmitting && "cursor-not-allowed"
              }`}
              type="submit"
              variant="dark"
              content=""
            >
              <span>{isSubmitting ? "Login..." : "Next"}</span>
              <PiSignInLight />
            </Button>
          </div>

          <div className="mt-12 border-b border-b-grayDark"></div>
        </form>

        <img src={Img} alt="image" className="w-[430px] hidden md:block" />

        <Link to="/">
          <PiArrowLeft
            className="absolute top-[27px] left-[20px] md:top-[20px] md:left-[20px]"
            size={28}
          />
        </Link>
      </section>
    </div>
  );
};

export default Login;
