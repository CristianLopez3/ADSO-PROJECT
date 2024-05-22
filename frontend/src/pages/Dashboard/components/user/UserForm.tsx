import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/Input";
import { User, USER_ROLES } from "@/utils/types/User";
import { AppDispatch } from "@/service/store/store";

import {
  createUserAction,
  getAllUsersAction,
  updateUserAction,
} from "@/service/store/user";
import { type UserFormTypes, userSchema } from "@/utils/types/User";
import styles from "./styles.module.css";
import Button from "@/components/Button";

type UserFormProps = {
  handleUpdateModal?: () => void;
  handleCreateUser?: () => void;
  mode: "update" | "create";
} & Partial<UserFormTypes>;

const UserForm: React.FC<UserFormProps> = ({
  handleUpdateModal,
  handleCreateUser,
  mode,
  id,
  name,
  email,
  role,
  cellphone,
  identification,
  lastname,
}) => {
  const title = mode === "update" ? "Update User" : "Create User";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormTypes>({
    defaultValues: {
      id,
      name,
      lastname,
      email,
      identification,
      cellphone,
      role,
    },
    resolver: zodResolver(userSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const renderErrorMessage = (error: { message?: string }) => {
    return error && <p className="p-1 text-red-700">{error.message}</p>;
  };

  const onSubmit: SubmitHandler<UserFormTypes> = useCallback(
    async (data) => {
      try {
        const user: User = {
          id: data.id ? data.id : null,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password!,
          identification: data.identification,
          cellphone: data.cellphone,
          role: data.role,
        };

        if (mode == "create") {
          await dispatch(createUserAction(user));
        } else {
          console.log("update user", user);
          await dispatch(updateUserAction(user));
        }

        await dispatch(getAllUsersAction());

        handleCreateUser?.() || handleUpdateModal?.();
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, handleCreateUser, handleUpdateModal, mode]
  );

  return (
    <div className={styles.form_container}>
      <h3 className={styles.form_h3}>{title}</h3>

      <div className={styles.form_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField {...register("id")} type="hidden" />
          {mode === "update" && (
            <>
              <InputField
                {...register("email")}
                placeholder="email"
                type="hidden"
              />
              {renderErrorMessage(errors.email!)}

              <InputField {...register("password")} type="hidden" />
              {renderErrorMessage(errors.password!)}

              <select {...register("role")} className="hidden">
                {!role && <option value="x">Select a role please...</option>}
                <option value={USER_ROLES.ADMIN}>Administrador</option>
                <option value={USER_ROLES.SUB_ADMIN}>
                  {" "}
                  Sub Administrator{" "}
                </option>
                <option value={USER_ROLES.WAITRESS}>Waitress </option>
                <option value={USER_ROLES.COOK}>Cook</option>
                <option value={USER_ROLES.BARTENDER}>Bartender</option>
              </select>
              {renderErrorMessage(errors.role!)}
            </>
          )}
          <div className={styles.form_input_flex}>
            <div className={`block ${styles.input_flex}`}>
              <InputField {...register("name")} />
              {renderErrorMessage(errors.name!)}
            </div>
            <div className={styles.input_flex}>
              <InputField {...register("lastname")} type="text" />
              {renderErrorMessage(errors.lastname!)}
            </div>
          </div>

          {mode !== "update" && (
            <>
              <InputField
                {...register("email")}
                placeholder="email"
                type="email"
              />
              {renderErrorMessage(errors.email!)}
              {mode === "create" && (
                <>
                  <InputField {...register("password")} type="password" />
                  {renderErrorMessage(errors.password!)}
                </>
              )}
              <select {...register("role")}>
                {!role && <option value="x">Select a role please...</option>}
                <option value={USER_ROLES.ADMIN}>Administrador</option>
                <option value={USER_ROLES.SUB_ADMIN}>
                  {" "}
                  Sub Administrator{" "}
                </option>
                <option value={USER_ROLES.WAITRESS}>Waitress </option>
                <option value={USER_ROLES.COOK}>Cook</option>
                <option value={USER_ROLES.BARTENDER}>Bartender</option>
              </select>
              {renderErrorMessage(errors.role!)}
            </>
          )}

          <div className="md:flex md:flex-row  gap-x-6">
            <div className="w-full">
              <InputField {...register("cellphone")} type="number" />
              {renderErrorMessage(errors.cellphone!)}
            </div>
            <div className="w-full">
              <InputField {...register("identification")} />
              {renderErrorMessage(errors.identification!)}
            </div>
          </div>

          <div className={styles.form_buttons}>
            <Button variant="dark" type="submit" className="uppercase">
              {mode}
            </Button>
            <Button
              content="Cancel"
              variant="light"
              className="border border-zinc-500 uppercase"
              onClick={() => {
                if (mode === "create") {
                  handleCreateUser?.();
                } else {
                  handleUpdateModal?.();
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
