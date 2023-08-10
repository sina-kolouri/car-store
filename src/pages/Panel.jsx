import React from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../Context/auth-context";
import Toast from "../Toast";
import profile from "../images/profile.jpg";
import { Outlet } from "react-router-dom";
import "../css/panel.css";

const Panel = () => {
  const state = useAuthState();
  const { token, user } = state.loginData;
  // داخل اطلاعات کاربر از سرور، تصویر او هم باشد
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("token");
  }

  return (
    <>
      {token && user ? (
        <div className="container-panel">
          <div className="row" id="panel">
            <div id="right" className="col-1">
              <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-3">
                  <div className="name">
                    <img id="profile" src={profile} alt="profile" />
                    <span className="text-img">سینا کلوری</span>
                  </div>

                  <div className="text-icon">
                    <i className="bi bi-box-fill"></i>
                    <Link to="/panel/products">محصولات</Link>
                  </div>
                  <div className="text-icon">
                    <i className="bi bi-card-text"></i>
                    <Link to="/panel/orders">سبد خرید</Link>
                  </div>
                  <div className="text-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                    <Link to="/panel/reports">گزارش ها</Link>
                  </div>
                  <div className="text-icon">
                    <i className="bi bi-headset"></i>
                    <Link to="/panel/support">پشتیبانی</Link>
                  </div>
                </div>
              </div>
              <nav className="navbar navbar-dark bg-dark pb-4" id="navbar">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent"
                    aria-controls="navbarToggleExternalContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </nav>
            </div>
            <div id="left" className="col-11">
              <div className="panel-header">
                <div className="right">
                  <small>آخرین ورود 2 روز پیش</small>
                </div>
                <div className="left">
                  <div className="icons">
                    <Link to="/">
                      <i class="bi bi-house-fill"></i>
                    </Link>
                    <button onClick={handleLogout} className="btn-logout">
                      <i className="bi bi-box-arrow-left"></i>
                    </button>
                  </div>
                </div>
              </div>
                <Outlet />
            </div>
          </div>
          <Toast type="success" msg="ورود به پنل کاربری" />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
export default Panel;
