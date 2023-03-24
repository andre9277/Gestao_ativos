import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function DefaultLayout() {
  const { token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="wrapper">
      <div id="defaultLayout">
        <SideBar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div className="content">
            <TopBar onLogout={onLogout} />
            <main>
              <Outlet />
            </main>
            {notification && <div className="notification">{notification}</div>}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
