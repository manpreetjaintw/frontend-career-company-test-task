import axios from "axios";

// Function to fetch the result of an arithmetic expression from an API.
export const fetchExpressionResult = async (expression) => {
  // Configuration for the api calling
  const config = {
    method: "post",
    url: "https://ce9c-27-5-40-168.ngrok-free.app/calc/",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      expression: expression,
    },
  };

  //response from the api
  const res = await axios(config);
  return res;
};
