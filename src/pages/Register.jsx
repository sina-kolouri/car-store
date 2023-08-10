import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import icon from "../svg/proposal-icon.svg";
// import Toast from "../Toast";
import "../css/register.css";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [imgFile, setImgFile] = useState({});
  // const [toastSucces, setToastSucces] = useState(false);
  // const [toastFaild, setToastFaild] = useState(false);

  const navigate = useNavigate();

  const changeImgHandler = (e) => {
    setImgFile(e.target.files[0]);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      mobile: "",
    },
    onSubmit: (values) => {
      const data = new FormData();
      data.append("file", imgFile);
      values.imgFileData = data;
      // setErrorServer(false);
      // setLoading(true);
      // axios.post("url",values);
      // ...
      // .then(.......   setToastSucces(true))
      // .catch(()=>setToastFaild(true))
      // .finally(()=>setLoading(false))
    },
    validationSchema: yup.object({
      name: yup.string().required("فیلد نام الزامی می باشد"),
      lastName: yup.string().required("فیلد نام خانوادگی الزامی می باشد"),
      mobile: yup
        .string()
        .matches(phoneRegExp, "شماره همراه معتبر نمی باشد")
        .min(11, "شماره همراه معتبر نمی باشد")
        .max(11, "شماره همراه معتبر نمی باشد")
        .required("فیلد شماره همراه الزامی می باشد"),
      userName: yup
        .string()
        .min(4, "نام کاربری حداقل باید 4 کاراکتر باشد")
        .max(15, "حداکثر تعداد کاراکتر نام کاربری ، 15 عدد می باشد")
        .required("فیلد نام کاربری الزامی می باشد"),
      email: yup
        .string()
        .email("فرمت ایمیل رعایت شود")
        .required("فیلد ایمیل الزامی می باشد"),
      password: yup
        .string()
        .min(4, "پسورد حداقل باید 4 کاراکتر باشد")
        .required("فیلد رمز عبور الزامی می باشد"),
    }),
  });

  return (
    <>
      <div className="container-register">
        <div className="form-register">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2 register">
              <label htmlFor="name" className="form-label">
                نام*
              </label>
              <input
                type="name"
                className="form-control form-control-sm"
                id="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-msg"> {formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-2 register">
              <label htmlFor="lastName" className="form-label">
                نام خانوادگی*
              </label>
              <input
                type="lastName"
                className="form-control form-control-sm"
                id="lastName"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-msg"> {formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="mb-2 register">
              <label htmlFor="mobile" className="form-label">
                شماره همراه*
              </label>
              <input
                type="mobile"
                className="form-control form-control-sm"
                id="mobile"
                {...formik.getFieldProps("mobile")}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="error-msg"> {formik.errors.mobile}</div>
              ) : null}
            </div>
            <div className="mb-2 register">
              <label htmlFor="userName" className="form-label">
                نام کاربری*
              </label>
              <input
                type="userName"
                className="form-control form-control-sm"
                id="userName"
                {...formik.getFieldProps("userName")}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error-msg"> {formik.errors.userName}</div>
              ) : null}
            </div>
            <div className="mb-2 register">
              <label htmlFor="email" className="form-label">
                آدرس ایمیل*
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg"> {formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-2 register">
              <label htmlFor="password" className="form-label">
                رمز عبور*
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg"> {formik.errors.password}</div>
              ) : null}
            </div>
            <div className="msg-send">
              <small>در صورت تمایل تصویری از خودتان ارسال کنید</small>
            </div>
            <div className="input-group">
              <input
                type="file"
                className="form-control form-control-sm"
                id="inputGroupFile04"
                onChange={changeImgHandler}
              />
            </div>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h1>قوانین و مقررات استفاده از فروشگاه اینترنتی سینا </h1>
                    استفاده شما از فروشگاه اینترنتی سینا و سفارش کالا از این
                    پایگاه به معنی توافق کامل شما با شرایط و ضوابط ذیل تلقی می
                    گردد: خرید کالا از فروشگاه اینترنتی “سینا” بر مبنای قوانین و
                    آئین نامه های موجود در مورد تجارت الکترونیک و با رعایت کامل
                    تمام قوانین جمهوری اسلامی ایران صورت می پذیرد. اطلاعات و
                    مشخصات کالاهای عرضه شده در فروشگاه اینترنتی “سینا” از منابع
                    زیر تامین می‌شود: 1- اطلاعاتی که توسط نمایندگی های کالا
                    ارائه می‌شوند. 2- اطلاعاتی که از سایت‌های معتبر خارجی ترجمه
                    می‌شوند. از این رو فروشگاه اینترنتی “سینا” هیچ مسوولیتی در
                    قبال اطلاعات و محتوای مبهم و یا خطاهای نگارشی احتمالی برعهده
                    نخواهد داشت. ولی با هدف ارائه خدمات بهتر و آگاه‌سازی
                    مشتریان، خود را در بروزرسانی مداوم اطلاعات و محتویات متعهد
                    می‌داند. فروشگاه اینترنتی “سینا” هیچ گونه مسئولیتی را در مورد
                    کارکرد سایت که می تواند ناشى از عواملی که خارج از سیطره
                    مدیریت این فروشگاه می باشند (همانند نقص اینترنت، مسائل
                    مخابراتى، تجهیزات سخت افزاری و غیره) نمی پذیرد. فروشگاه
                    اینترنتی “سینا” به هیچ وجه اطلاعات منحصر بفرد کاربران را به
                    اشخاص و طرفین غیر، واگذار نخواهد کرد و ضمنا با استفاده از
                    آخرین فن آوری ها متعهد است حتی المقدور از حریم شخصی کاربران
                    دفاع کند. خدمات و محتویات سایت، صرفا براى استفاده شخصى و غیر
                    تجارى شما عرضه شده است. هر گونه سوء استفاده از این اطلاعات
                    پیگرد قانونی خواهد داشت و هیچ فرد حقیقی، حقوقی یا سایتی به
                    هیچ عنوان نمی تواند از اطلاعات و محتویات موجود در سایت براى
                    فروش، تولید مجدد یا ایجاد ترافیک در سایت خود استفاده نماید.
                    اگر مایلید از سرویسها و محتویات سایت جهت مقاصد تجارى استفاده
                    نمایید ، لازم است از قبل به ما اطلاع دهید. براى این کار لطفا
                    با ما تماس بگیرید. کاربران باید هنگام سفارش کالای مورد نظر
                    خود، فرم سفارش را با اطلاعات صحیح و به طور کامل پر نمایند.
                    بدیهی است درصورت ورود اطلاعات ناقص یا نادرست، سفارش کاربر
                    قابل پیگیری و تحویل نخواهد بود. مالکیت معنوی محتویات فروشگاه
                    اینترنتی “سینا” شامل قانون حق تکثیر بوده و متعلق به فروشگاه
                    اینترنتی “سینا”می باشد. فروش و تحویل سفارش در صورتی که سینا به
                    دلایلی خارج از اراده و اختیار خود، توان تحویل کالا در موعد
                    مقرر را نداشته باشد و طرفین درباره یک موعد جدید به توافق
                    نرسند، خریدار حق دارد بدون هیچگونه هزینه ای سفارش را فسخ
                    نماید. ارزش کالا یا کالاهای سفارش داده شده طبق فهرست قیمت
                    سایت محاسبه شده و شامل کلیه مالیات ها و عوارض فروش خواهد
                    بود. هزینه مالیات بر ارزش افزوده در صورت عدم قید شدن در سایت
                    صفر ریال محاسبه خواهئ شد. تنها مبلغی که در موارد معین به
                    ارزش کالا اضافه می شود، هزینه ارسال و بیمه کالا خواهد بود.
                    مدت گارانتی و نام شرکت ارائه دهنده خدمات پس از فروش در قسمت
                    توضیحات هر کالا ذکر شده است. در صورت عدم درج موارد مذکور در
                    این قسمت، گارانتی برای آن کالا وجود ندارد. شرایط برگشت کالا:
                    هرگونه نقص و عیب فنی کالا، باید در مدت 48 ساعت پس از دریافت
                    کالا حتی در روزهای تعطیل از طریق تلفن “91004025-021 “و یا
                    ایمیل info@homais.com یا “فرم برگشت از فروش” (این فرم در
                    کنترل پنل شما موجود است) به مرکز ارتباط مشتریان فروشگاه
                    اطلاع داده شود تا مشکل فوراً بررسی و در صورت اثبات نقص،
                    تعمیر یا جایگزین گردد. بدیهی است پس از 48 ساعت هیچ اعتراضی
                    پذیرفتنی نیست.(خاطرنشان می سازد این بند فقط برای کالاهای
                    فاقد گارانتی صدق خواهد کرد و کالاهای دارای گارانتی از لحظه
                    فروش مشمول ضمانت بوده و نقایص احتمالی توسط شرکت ارائه کننده
                    گارانتی پیگیری میگردد) در صورتی که فرد خریدار بخواهد وجه
                    کالا را به طور ناقص پرداخت کند کالا بدون هماهنگی، توسط پیک
                    برگشت خواهد خورد و هزینه ارسال نیز عودت داده نخواهد شد.
                    خریدار به مدت 7 روز کاری فرصت دارد از سفارش خود انصراف دهد،
                    به شرط آنکه بسته بندی کالایی باز نشده و از آن هیچ گونه
                    استفاده‌ای نشده باشد. لازم به ذکر است هزینه پست و بیمه به
                    عهده خریدار میباشد. این انصراف برای کالاهای زیر امکان پذیر
                    نمی باشد: – کالاهایی که قیمت آنها توسط نوسانات بازارهای مالی
                    و ارزی تعیین می شود. – کالا های ابزار دقیق و اندازه گیری که
                    از حساسیت خاصی برخوردار هستند. – با توجه به شرایط کالا، کالا
                    های با قیمت بالای 500000 تومان برای این گروه از کالا نیاز به
                    دریافت پیش پرداخت می باشد. پس از دریافت پیش پرداخت و تایید
                    سفارش امکان انصراف از خرید تحت هیچ شرایطی مقدور نمی باشد. و
                    در صورت انصراف از خرید، بیعانه به مشتری عودت داده نخواهد شد.
                    عدم انطباق کالای ارسال شده با سفارش شما، در مدت 24 ساعت پس
                    از دریافت کالا حتی در روزهای تعطیل از طریق تلفن
                    “91004025-021 ” یا ایمیل info@homais.com یا “فرم برگشت از
                    فروش” (این فرم در کنترل پنل شما موجود است) به مرکز ارتباط
                    مشتریان فروشگاه اطلاع داده شود تا مشکل فوراً بررسی و در صورت
                    اثبات، کالا بدون دریافت هیچ هزینه ای مجددا برای شما ارسال
                    شود. بدیهی است عدم اطلاع رسانی پس از 24 ساعت، به معنای صحت
                    اقلام دریافتی است.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      بستن
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-2 form-check">
              <input
                defaultChecked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
                type="checkbox"
                className="form-check-input"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                <button
                  id="modal-btn"
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  شرایط و قوانین
                </button>
                <span className="acc-msg">را می پذیرم.</span>
              </label>
            </div>
            <div className="submit-container">
              <button
                disabled={!isChecked}
                type="submit"
                className="btn register-btn"
              >
                ثبت نام
              </button>
              <button
                className="go-home-reg"
                onClick={() => {
                  navigate("/login");
                }}
              >
              ورود به پنل کاربری
              </button>
            </div>
          </form>
        </div>
        <div className="img-icon">
          <img src={icon} alt="icon" />
        </div>
      </div>
      {/* {toastSucces && (
        <Toast type="success" msg="ثبت نام شما با موفقیت انجام شد" />
      )}
      {toastFaild && (
        <Toast type="warn" msg="ثبت نام شما با خطا مواجه شده است" />
      )} */}
    </>
  );
};

export default Register;
