import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../images/404.png";
import "../css/noMatch.css";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="container-not-found">
      <div className="not-found-img">
        <img src={notFound} alt="404" />
      </div>
      <p className="not-found-msg">
        اینترنت شما خراب نیست ، اما ما نمی‌توانیم آنچه را که به دنبالش هستید
        پیدا کنیم.
      </p>
      <div className="home">
              <button
                className="home-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                صفحه اصلی
              </button>
            </div>
    </div>
  );
};

export default NoMatch;
