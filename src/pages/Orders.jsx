import React from "react";
import { PanelScale } from "../PanelScale/PanelScale";
import '../css/orders.css';
const Orders = () => {
  return (
    <div className="holder">
      <div className="title-orders">
        <span>سبد خرید</span>
      </div>
      <div className="holder-content">
        <PanelScale />
      </div>
    </div>
  );
};

export default Orders;