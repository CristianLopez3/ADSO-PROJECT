import FormBooking from "./FormBooking";

const Booking = () => {
  return (
    <section id="book" className="mt-[100px]">
      <div className="container-section bg-white py-16 rounded-lg">
        <h2 className="text-black mb-12">Book A Reservation</h2>
        <article className="w-[90%] mx-auto">
          <FormBooking />
        </article>
      </div>
    </section>
  );
};

export default Booking;
