import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAuthState } from "../Context/auth-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PanelScale() {
  const state = useAuthState();
  const { products } = state;
  const arrIdProducts =
    products.lenght !== 0 && products.map((productObj) => productObj.id);
  const uniqueArrIdProducts = [...new Set(arrIdProducts)];
  const lengthtAyene = arrIdProducts.filter(
    (idProduct) => idProduct === "ayene"
  ).length;
  const lengthFarman = arrIdProducts.filter(
    (idProduct) => idProduct === "farman"
  ).length;
  const lengthFarmanmazda = arrIdProducts.filter(
    (idProduct) => idProduct === "farmanmazda"
  ).length;
  const lengthFandak = arrIdProducts.filter(
    (idProduct) => idProduct === "fandak"
  ).length;

  const newArr = [];
  uniqueArrIdProducts.forEach((v, index) => {
    if (v === "ayene") {
      newArr[index] = lengthtAyene;
    } else if (v === "farman") {
      newArr[index] = lengthFarman;
    } else if (v === "farmanmazda") {
      newArr[index] = lengthFarmanmazda;
    } else if (v === "fandak") {
      newArr[index] = lengthFandak;
    }
  });
  const data = {
    labels: uniqueArrIdProducts,
    datasets: [
      {
        label: "کالا",
        data: newArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
