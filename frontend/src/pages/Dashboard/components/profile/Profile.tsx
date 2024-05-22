import styles from "./styles.module.css";
import { getCookies } from "@/utils/cookies";
import { TOKEN_COOKIE, USER_COOKIE } from "@/service/store/auth";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "@/components/Auth/ProtectedRoute";
import { RootState } from "@/service/store/store";
import { useSelector } from "react-redux";
import ProfileImage from "@/assets/profile.webp";

const Profile = () => {
  const user = useContext(UserContext);
  const auth = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookies(TOKEN_COOKIE);
    const userCookie = getCookies(USER_COOKIE);

    if ((!token && !userCookie) || user === null) {
      navigate("/login?error=There was an error, try sign in again!.");
    }
  }, [auth, navigate, user]);

  const { name, email, lastname } = user;

  return (
    <div className={styles.container_profile}>
      <div className={styles.header}>
        <img
          src={ProfileImage}
          className={styles.header_back}
          alt="profile back"
        />
        <div className={styles.icon_container}>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}+${user?.lastName}&background=000&color=fff&bold=true`}
            alt=""
            className="w-full rounded-full"
          />
        </div>
      </div>
      <div className={styles.name_container}>
        <h4 className={styles.name}>{`${name} ${lastname} `}</h4>
        <p className={styles.role}>{email}</p>
      </div>
    </div>
  );
};

export default Profile;
