import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import Button from "@/components/Button";
import styles from "./styles.module.css";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    // <article className="min-h-screen flex justify-center items-center">
    <article className={styles.page404}>
      <div className={styles.page404_div}>
        <div className={styles.page404_innerDiv}>
          <p className={styles.page404_p1}>
            404
          </p>
          <p className={styles.page404_p2}>
            Page Not Found
          </p>
          <p className={styles.page404_p3}>
            Sorry, the page you are looking for could not be found.
          </p>
          
            <Button variant="dark" onClick={() => navigate(-1)}>
              <LuArrowLeft  />
              Return Back
            </Button>
          
        </div>
      </div>
    </article>
  );
};

export default Page404;
