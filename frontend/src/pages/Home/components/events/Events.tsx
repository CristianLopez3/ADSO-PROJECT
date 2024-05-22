import Button from "@/components/Button";
import { ROUTES } from "@/routes/constants";
import { getEventAction } from "@/service/store/event";
import { AppDispatch, RootState } from "@/service/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Events = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events);
  const { title, description, discount, url } = events.data;
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await dispatch(getEventAction());
      } catch (error) {
        throw new Error("Error fetching events");
      }
    };
    fetchEvents();
  }, [dispatch]);

  console.log(url)

  return (
    <section className="mt-28 lg:flex justify-between text-zinc-300">
      <article className="text-center lg:text-start lg:max-w-[50%] flex-center flex-col p-4 lg:p-6 lg:pr-12 gap-y-4">
        <h2 className="text-zinc-200 text-2xl lg:text-4xl font-semibold">
          {title}
        </h2>
        <p className="text-base lg:p-8 lg:text-lg ">
          {description}
        </p>
        <div className="flex-center gap-6">
          <p className="text-zinc-400">Just for now, {discount}% of discount </p>
          <Link to={ROUTES.HOME.BOOK}>
            <Button
              variant="light"
              className="bg-zinc-900"
              content="Book now!"
            />
          </Link>
        </div>
      </article>
      <picture className="my-4  lg:max-w-[50%] flex-center">
        <img src={`${import.meta.env.VITE_APP_API_URL}events/1/picture`} alt={title} loading="lazy" />
      </picture>
    </section>
  );
};

export default Events;
