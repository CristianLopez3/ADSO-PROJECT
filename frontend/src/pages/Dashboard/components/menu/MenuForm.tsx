import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/service/store/store";
import { formStyles } from "./constants";

import {
  addMenuAction,
  getAllMenusAction,
  updateMenuAction,
} from "@/service/store/menus";
import { getAllCategories } from "@/service/store/menus/CategoryReducer";
import { MenuPost } from "@/utils/types/Menu";

import { type MenuForm, menuSchema } from "@/utils/types/Menu";

import { PiPencil } from "react-icons/pi";
import { InputField } from "@/components/Input";
import Button from "@/components/Button";

import styles from "./styles.module.css";

type MenuFormProps = {
  mode: "create" | "update";
  handleModal: () => void;
} & Partial<MenuForm>;

const options = ["Choose an state", "Active", "Desactive"];

const fetchCategories = async (dispatch: AppDispatch) => {
  try {
    dispatch(getAllCategories());
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

const MenuForm = ({
  handleModal,
  id,
  title,
  description,
  price,
  state,
  idCategory,
  mode,
}: MenuFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuForm>({
    defaultValues: {
      id,
      title,
      price,
      state,
      description,
      idCategory,
    },
    resolver: zodResolver(menuSchema),
  });

  const text = mode === "update" ? "Update Menu" : "Create Menu";
  const buttonText = mode === "update" ? "Update" : "Create";

  useEffect(() => {
    reset({
      id,
      title,
      price,
      state,
      description,
      idCategory,
    });
  }, [id, title, price, state, description, idCategory, reset]);

  const onSubmit: SubmitHandler<MenuForm> = useCallback(
    async (data) => {
      const formData = new FormData();
      try {
        data.id = data.id === "" || data.id === null ? null : data.id;
        const menu: MenuPost = {
          id: data.id,
          title: data.title,
          description: data.description,
          price:
            typeof data.price === "string"
              ? parseFloat(data.price)
              : data.price,
          state: data.state === "Desactive" ? false : true,
          idCategory:
            typeof data.idCategory === "string"
              ? parseInt(data.idCategory)
              : data.idCategory,
        };

        formData.append("image", image!);
        formData.append("menu", JSON.stringify(menu));

        if (mode === "update" && menu.id !== null) {
          await dispatch(updateMenuAction(menu));
        } else {
          console.log(formData);
          await dispatch(addMenuAction(formData));
        }
        dispatch(getAllMenusAction());
        handleModal();
      } catch (error) {
        throw new Error("Error creating or updating menu");
      }
    },
    [dispatch, handleModal, mode, image]
  );

  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  const renderErrorMessage = (error: { message?: string }) => {
    return error && <p className="p-1 text-red-700">{error.message}</p>;
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_pencil}>
        <PiPencil size={52} color={mode === "update" ? "orange" : "green"} />
      </div>
      <h3 className={styles.form_title}>{text}</h3>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mx-auto w-32 h-32 border mt-6"
            />
          )}

          <InputField
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files![0] ? e.target.files![0] : null)
            }
          />

          <InputField {...register("id")} type="hidden" />
          {renderErrorMessage(errors.id!)}

          <InputField {...register("title")} type="text" />
          {renderErrorMessage(errors.title!)}

          <textarea
            {...register("description")}
            className="block w-full py-3 pl-1 pr-4  outline-none text-sm text-black border rounded-md my-2 border-zinc-400"
          />
          {renderErrorMessage(errors.description!)}

          <InputField {...register("price")} type="number" />
          {renderErrorMessage(errors.price!)}

          <div className="md:flex md:flex-row gap-x-6">
            <select {...register("state")}>
              {options.map((option) => (
                <option
                  key={option.toString()}
                  value={option}
                  defaultValue={"active"}
                >
                  {option}
                </option>
              ))}
            </select>
            {renderErrorMessage(errors.state!)}
            {categories.isLoading ? (
              <p>Loading...</p>
            ) : categories.isError ? (
              <p>Error fetching categories</p>
            ) : (
              <select {...register("idCategory")}>
                <option value="">Select a category: </option>
                {categories.data.map((category) => (
                  <option
                    key={category.id.toString()}
                    value={category.id}
                    defaultValue={1}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {renderErrorMessage(errors.idCategory!)}

          <div className={formStyles.buttons}>
            <Button
              variant="dark"
              className="w-full uppercase"
              content={buttonText}
            />
            <Button
              variant="light"
              className="w-full border border-zinc-500"
              content="CANCEL"
              onClick={handleModal}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
