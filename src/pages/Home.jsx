import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
// import { Puff } from "react-loader-spinner";
import { useAuthState, useAuthDispatch } from "../Context/auth-context";
import ayene from "../images/a1.jpg";
import farman from "../images/f1.jpg";
import farmanmazda from "../images/f2.jpg";
import fandak from "../images/s1.jpg";
import neoncar from "../images/neon-car.jpg";
import brands from "../images/brands.jpg";
import feature from "../images/Feature.jpg";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// اطلاعات کارت ها باید از سرور گرفته شود
const dataCards = [
  {
    id: "ayene",
    image: ayene,
    product: "آینه جانبی خودرو",
    num: 1,
    productName: "آینه جانبی مزدا",
    price: "9 میلیون تومان",
  },
  {
    id: "farman",
    image: farman,
    product: "فرمان خودرو",
    num: 1,
    productName: "فرمان لندروور",
    price: "50 میلیون تومان",
  },
  {
    id: "farmanmazda",
    image: farmanmazda,
    product: "فرمان خودرو",
    num: 1,
    productName: "فرمان مزدا",
    price: "25 میلیون تومان",
  },
  {
    id: "fandak",
    image: fandak,
    product: "فندکی خودرو",
    num: 1,
    productName: "فندکی کیایی",
    price: "100 هزار تومان",
  },
];

// const fetchCardData = async () => {
//   const res = await axios.get("http://localhost:3001/products");
//   return res;
// };

const Home = () => {
  // const [loading, setLoading] = useState(false);
  // const [dataCards, setDataCards] = useState([]);
  // const [error, setError] = useState(false);

  const state = useAuthState();
  const { token, user } = state.loginData;
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleBuyCards = (card) => {
    if (token && user) {
      dispatch({
        type: "BuyCards",
        payload: card,
      });
    } else {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   setError(false);
  //   setLoading(true);
  //   fetchCardData()
  //     .then((res) => setDataCards(res))
  //     .catch((error) => {
  //       setError(true);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  const cardsArray =
    dataCards &&
    dataCards.map((card) => {
      return (
        <div
          key={card.id}
          className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4 mb-lg-0"
        >
          <div className="card">
            <div className="hot-offer-container">
              <span className="hot-offer">پیشنهاد ویژه</span>
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
            </div>
            <div>
              <img src={card.image} className="card-img-top" alt={card.image} />
            </div>
            <div className="card-body">
              <p className="card-title">
                <strong>نام محصول : {card.product}</strong>
              </p>
              <p className="card-text">
                {card.num} عدد {card.productName}
              </p>
              <div className="buttons">
                <div className="right">
                  <span className="price">{card.price}</span>
                </div>
                <div className="left">
                  <div className="extend-btn">
                    <Link>
                      <i className="bi bi-heart-fill"></i>
                    </Link>
                  </div>
                  <button
                    onClick={() => handleBuyCards(card)}
                    type="button"
                    className="btn extend-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="bi bi-cart-fill"></i>
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div
                        className={`modal-content ${
                          token && user ? "green" : "red"
                        }`}
                      >
                        <div className="modal-body">
                          {token && user
                            ? "افزودن به سبد خرید با موفقیت انجام شد."
                            : "برای خرید ابتدا باید وارد پنل کاربری شوید."}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="home-container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto me-4 pe-0 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/panel" className="nav-link">
                    <i className="bi bi-person-fill"></i>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i id="cart" className="bi bi-cart-fill"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item">
                        <strong>لوازم یدکی ایران خودرو</strong>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item">
                        <strong>لوازم یدکی سایپا</strong>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item">
                        <strong>لوازم یدکی خودروهای خارجی</strong>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="nav-left mb-lg-0 mb-2">
                <div className="container-header-btn">
                  <Link to="/panel/orders" className="login-btn">
                    <span className="message-btn">سبد خرید</span>
                    <i className="bi bi-cart-fill"></i>
                  </Link>
                  <Link to="/login" className="login-btn">
                    <span className="message-btn">ثبت نام / ورود</span>
                    <i className="bi bi-person-fill"></i>
                  </Link>
                </div>
              </div>
              <div>
                <input
                  className="form-control ms-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="برای جستجو تایپ کنید..."
                />
                <datalist id="datalistOptions">
                  <option value="فرمان مزدا3" />
                  <option value="آینه جانبی پژو206" />
                  <option value="فندکی کیایی" />
                  <option value="چراغ پرادو" />
                  <option value="ایربگ وولستر" />
                  <option value="فرمان بنز c200" />
                  <option value="آینه جانبی لندکروز" />
                  <option value="فرمان نیسان x-trail" />
                  <option value="چراغ تیگو 8 پرومکس" />
                  <option value="ایربگ سراتو وارداتی" />
                </datalist>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section className="slider">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner" id="carousel-inner">
            <div className="carousel-item active">
              <img src={brands} className="d-block w-100" alt="brands" />

              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <img src={feature} className="d-block w-100" alt="Feature" />

              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <img src={neoncar} className="d-block w-100" alt="neoncar" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <hr />
      <main>
        <section className="home-page-product-section">
          {/* <div className="row">
            {loading ? (
              <div className="loading">
                <Puff
                  height="80"
                  width="80"
                  radius={1}
                  color="#555"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <>
                {error ? (
                  <div className="error">
                    فعلا موردی برای پیشنهاد ویژه نداریم.
                  </div>
                ) : (
                  cardsArray
                )}
              </>
            )}
            {cardsArray}
          </div> */}
          <div className="row">{cardsArray}</div>
        </section>
      </main>
      <hr />
      <div className="about">
        <div className="about-phone">
          <i className="bi bi-telephone-fill"></i>
          <span>
            تلفن های پشتیبانی : <strong>09124890301 - 09124832290</strong>
          </span>
        </div>
        <br />
        <div className="about-time">
          <i className="bi bi-clock-fill"></i>
          <span>
            ساعات پاسخگویی : شنبه تا چهار شنبه ساعت 9:30 تا 18:00 و روز پنجشنبه
            ساعت 9:30 تا 15
          </span>
        </div>
        <br />
        <div className="about-address-shop">
          <i className="bi bi-geo-alt-fill"></i>
          <span>
            آدرس فروشگاه : تهران ، خیابان جمهوری ، خیابان ملت ، کوچه یاس شرقی ،
            پلاک22
          </span>
        </div>
        <br />
        <div className="about-address-co">
          <i className="bi bi-geo-alt-fill"></i>
          <span>
            آدرس کارخانه : نظرآباد ، خیابان بهرنگ ، خیابان امید ، کوچه یاس غربی
            ، پلاک2
          </span>
        </div>
      </div>
      <footer className="bg-dark text-center text-white">
        <p className="mt-4">با ما در شبکه های اجتماعی همراه باشید.</p>
        <section id="Social" className="mb-4">
          <Link>
            <i className="bi bi-instagram"></i>
          </Link>
          <Link>
            <i className="bi bi-telegram"></i>
          </Link>
        </section>
        <section className="mb-4">
          <p>هم‌اکنون لوازم یدکی اورجینال مورد نیازتان را سفارش دهید.</p>
        </section>
        <section className="fast">
          <div className="row">
            <div className="col-lg-6 col-xs-12 mb-4">
              <div>
                <h5 className="text-uppercase">دسترسی سریع</h5>
              </div>
              <div>
                <Link className="text-white">تماس با ما</Link>
              </div>
              <div>
                <Link className="text-white">درباره ما</Link>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12 mb-4">
              <div>
                <h5 className="text-uppercase">لوازم یدکی</h5>
              </div>
              <div>
                <Link className="text-white">آینه جانبی خودرو</Link>
              </div>
              <div>
                <Link className="text-white">فندکی خودرو</Link>
              </div>
              <div>
                <Link className="text-white">مقاومت فن پژو 206</Link>
              </div>
            </div>
          </div>
        </section>
      </footer>
      <div id="footer" className="text-center p-2">
        © تمامی حقوق مادی و معنوی این وب اپلیکیشن برای () محفوظ می باشد ، هر
        گونه کپی برداری از آن پیگرد قانونی دارد . Copyright ©2023
      </div>
    </div>
  );
};

export default Home;
