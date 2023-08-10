import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuthDispatch, useAuthState } from "../Context/auth-context";
import axios from "axios";
import key from "../svg/key.png";
import "../css/login.css";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  // وصل شدن به global state:
  const state = useAuthState();
  const { user, error, loading } = state.loginData;

  // ارتباط با سرور:
  const fetchToken = async (values) => {
    const res = await axios.post("http://localhost:3001/login", values);
    return res.data;
  };

  const fetchCurrentUserInfo = async (token) => {
    const res = await axios.get("http://localhost:3001/users/me", {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  };

  // validation form data with formik & yup before send to server:
  const formik = useFormik({
    initialValues: {
      username: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "",
      password: localStorage.getItem("password")
        ? localStorage.getItem("password")
        : "",
    },
    onSubmit: (values) => {
      dispatch({
        type: "loginRequest",
      });
      fetchToken(values).then((res) => {
        if (res.success) {
          setToken(res.data);
          if (isChecked) {
            localStorage.setItem("username", values.username);
            localStorage.setItem("password", values.password);
          }
        } else {
          dispatch({
            type: "loginError",
            payload: res.error,
          });
        }
      });
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(4, "نام کاربری حداقل باید 4 کاراکتر باشد")
        .max(15, "حداکثر تعداد کاراکتر نام کاربری ، 15 عدد می باشد")
        .required("فیلد نام کاربری الزامی می باشد"),
      password: yup
        .string()
        .min(4, "پسورد حداقل باید 4 کاراکتر باشد")
        .required("فیلد رمز عبور الزامی می باشد"),
    }),
  });

  // ذخیره در استوریج به علت اینکه با رفرش هم لازم نباشد
  // دوباره لاگین کنیم و فقط لاگ اوت شدن دلیل لاگین مجدد باشد.
  //  وگرنه استیت گلبال توکن را با جابه جایی در صفحات مختلف حفظ میکرد
  // و اگر هدفمان فقط حفظ توکن بود چون استیت گلبال داریم دیگر از استوریج استفاده نمیکردیم.
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useLayoutEffect(() => {
    if (token) {
      fetchCurrentUserInfo(token).then((res) => {
        if (res.success) {
          localStorage.setItem("token", token);
          dispatch({
            type: "loginSuccess",
            payload: {
              user: res.data,
              token,
            },
          });
        } else {
          dispatch({
            type: "loginError",
            payload: res.error,
          });
        }
      });
    }
    if (token && user) {
      navigate("/panel", { replace: true });
    }
  }, [token, dispatch, user, navigate]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <Puff
            height="100"
            width="100"
            radius={1}
            color="rgba(255, 255, 255, 0.703)"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container-login">
          <div className="form-login">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  <span> نام کاربری:</span>
                </label>
                <input
                  className="form-control login"
                  id="username"
                  type="username"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error-msg"> {formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <span>رمز عبور:</span>
                </label>
                <input
                  className="form-control login"
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-msg"> {formik.errors.password}</div>
                ) : null}
                {error && <div className="errorServer">{error}</div>}
                <div id="emailHelp" className="form-text">
                  <span className="q-username">حساب کاربری ندارید؟</span>

                  <Link to="/register" className="register-msg">
                    <span className="message-username">ایجاد حساب کاربری</span>
                  </Link>
                  <span>کمتر از یک دقیقه از زمان شما را خواهد گرفت.</span>
                </div>
              </div>
              <div className="mb-2 form-check">
                <input
                  defaultChecked={isChecked}
                  onClick={() => {
                    setIsChecked(!isChecked);
                  }}
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  <span>مرا به خاطر بسپار</span>
                </label>
              </div>
              <div className="submit-container-t">
                <div className="submit-container">
                  <button type="submit" className="enter-btn">
                    ورود
                  </button>
                </div>
                <div className="q-remember">
                  <Link to="/resetPass">
                    <span>رمز عبور خود را فراموش کرده اید؟</span>
                  </Link>
                </div>
              </div>
              <div className="go-home">
                <button
                  className="go-home-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  صفحه اصلی
                </button>
              </div>
              <hr className="devider" />
              <div className="social">
                <Link>
                  <i className="bi bi-instagram"></i>
                </Link>
                <Link>
                  <i className="bi bi-telegram"></i>
                </Link>
              </div>
            </form>
          </div>
          <div className="img-key">
            <img src={key} alt="key" />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
