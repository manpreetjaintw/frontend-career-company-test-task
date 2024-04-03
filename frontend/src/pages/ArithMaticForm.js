import React, { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { fetchExpressionResult } from "../api";

// Styling the Paper component using experimentalStyled from MUI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ArithMaticForm = () => {
  //input value of expression enter by user
  const [expression, setExpression] = useState("");

  // this state contains loading error and result received by api
  const [expressionData, setExpressionData] = useState({
    result: "",
    loading: false,
    error: "",
  });

  // function to evaluate expession given by the user from the api
  const evaluateExpression = async () => {
    try {
      setExpressionData({ loading: true, error: "", result: "" });
      const { data, status } = await fetchExpressionResult(expression);
      if (status) {
        setExpressionData({
          loading: false,
          error: "",
          result: data?.result,
        });
      }
    } catch (err) {
      setExpressionData({
        loading: false,
        error: err?.response?.data.error || "Connection Error",
        result: "",
      });
    }
  };

  return (
    <Box mt={20}>
      <Grid
        container
        spacing={{ xs: 5, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 8 }}
        justifyContent="center"
      >
        <Grid item xs={2} sm={4} md={4}>
          <Item
            style={{
              boxShadow: "0px 0px 10px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1>Arithmetic Expression Evaluator</h1>
            {/* Input field for entering arithmetic expression */}
            <input
              type="number"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter arithmetic expression"
              style={{ width: "40%" }}
            />
            {/* Button to trigger expression evaluation */}
            <button
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={evaluateExpression}
            >
              Evaluate
            </button>
            {/* Display loading message if expression is being evaluated */}
            {expressionData?.loading && <p>loading...</p>}
            {/* Display error message if evaluation fails */}
            {expressionData?.error && (
              <Typography color="error" className="error">
                {expressionData?.error}
              </Typography>
            )}
            {/* Display result if evaluation is successful */}
            {typeof expressionData.result === "number" && (
              <p>Result: {expressionData?.result}</p>
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArithMaticForm;
