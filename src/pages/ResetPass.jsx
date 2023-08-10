import React, { useState } from "react";
import "../css/ResetPass.css";
import { Puff } from "react-loader-spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [acceptServer, setAcceptServer] = useState(false);
  const navigate = useNavigate();

  // ارسال به ایمیل:
  const fetchResetPass = async (values) => {
    const res = await axios.post("url", values);
    return res.data;
  };

  // validation email with formik & yup before send:
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setErrorServer(false);
      setAcceptServer(false);
      setLoading(true);
      fetchResetPass(values);
      // .then(res=>setAcceptServer(true))
      // .catch(error=>setErrorServer(true))
      // .finally(()=> setLoading(false))
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("فرمت ایمیل رعایت شود")
        .required("فیلد ایمیل الزامی می باشد"),
    }),
  });

  return (
    <>
      <div className="container-form">
        {loading ? (
          <div className="loading-reset">
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
          <form className="reset-form" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>
                  آدرس ایمیل حساب کاربری خود را وارد کنید و ما لینک بازنشانی رمز
                  عبور را برای شما ارسال خواهیم کرد.
                </strong>
              </label>
              <input
                placeholder="آدرس ایمیل خود را وارد کنید"
                type="email"
                className="form-control form-control-sm"
                id="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg"> {formik.errors.email}</div>
              ) : null}
              <div id="emailHelp" className="form-text">
                <strong>حساب کاربری خود را تایید کنید</strong>
              </div>
            </div>
            {errorServer && (
              <div className="error-msg">
                <span>ارسال لینک به ایمیل شما با خطا مواجه شده است</span>
              </div>
            )}
            {acceptServer && (
              <div className="accept-msg">
                <span>ارسال لینک به ایمیل شما با موفقیت انجام شد</span>
              </div>
            )}
            <div className="btn-prev-container">
              <button
                className="btn btn-prev"
                onClick={() => {
                  navigate("/login");
                }}
              >
                صفحه قبل
              </button>
            </div>
            <div className="btn-reset-container">
              <button type="submit" className="btn send-btn-reset">
                ارسال ایمیل بازنشانی رمز عبور
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPass;
