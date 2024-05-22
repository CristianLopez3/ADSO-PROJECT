import Img from "@/assets/patrick.jpg";
import { styles } from "./KnowUs.styles";

const KnowUs = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.article}>
          <article className="w-full lg:w-1/2 flex items-center">
            <img src={Img} alt="men in a cafetery" className="w-full" />
          </article>

          <article className={styles.articleText}>
            <div className="w-[90%] block mx-auto text-center">
              <h2 className="text-white">
                Come and enjoy a place made for your pace.
              </h2>
              <p className="text-grayLight py-16 text-base lg:text-xl md:pb-20">
                Indulge in a culinary experience tailored to your rhythm at our
                restaurant. Come and savor dishes crafted for every pace of
                life, where every bite tells a story of dedication and flavor.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default KnowUs;
