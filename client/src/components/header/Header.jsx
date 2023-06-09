import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";

function Header() {
  // const [username, setUsername] = useState(null);
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userAbout) => {
        setUserInfo(userAbout);
      });
    });
  }, []);
  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>create new post</Link>
            <a onClick={logout} className={styles.logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
