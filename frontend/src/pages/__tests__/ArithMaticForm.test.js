import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import ArithMaticForm from "../ArithMaticForm";
import { fetchExpressionResult } from "../../api";

jest.mock("../../api");

describe("ArithMeticForm Component", () => {
  beforeEach(() => {
    fetchExpressionResult.mockClear();
  });

  test("renders arithmetic expression evaluator form", () => {
    const { getByText, getByPlaceholderText } = render(<ArithMaticForm />);

    expect(getByText("Arithmetic Expression Evaluator")).toBeInTheDocument();
    expect(
      getByPlaceholderText("Enter arithmetic expression")
    ).toBeInTheDocument();
    expect(getByText("Evaluate")).toBeInTheDocument();
  });

  test("input value updates correctly", () => {
    const { getByPlaceholderText } = render(<ArithMaticForm />);
    const input = getByPlaceholderText("Enter arithmetic expression");
    fireEvent.change(input, { target: { value: "2+2" } });
    expect(input.value).toBe("2+2");
  });

  test("evaluates expression on button click", async () => {
    fetchExpressionResult.mockResolvedValueOnce({
      data: { result: "4" },
      status: true,
    });
    const { getByPlaceholderText, getByText } = render(<ArithMaticForm />);
    const input = getByPlaceholderText("Enter arithmetic expression");
    const evaluateButton = getByText("Evaluate");

    fireEvent.change(input, { target: { value: "2+2" } });
    fireEvent.click(evaluateButton);

    await waitFor(() => {
      expect(fetchExpressionResult).toHaveBeenCalledTimes(1);
      expect(fetchExpressionResult).toHaveBeenCalledWith("2+2");
      expect(getByText("Result: 4")).toBeInTheDocument();
    });
  });

  test("handles error if expression evaluation fails", async () => {
    fetchExpressionResult.mockRejectedValueOnce({
      response: { data: { error: "Invalid expression" } },
    });
    const { getByPlaceholderText, getByText } = render(<ArithMaticForm />);
    const input = getByPlaceholderText("Enter arithmetic expression");
    const evaluateButton = getByText("Evaluate");

    fireEvent.change(input, { target: { value: "2+invalid" } });
    fireEvent.click(evaluateButton);

    await waitFor(() => {
      expect(fetchExpressionResult).toHaveBeenCalledTimes(1);
      expect(fetchExpressionResult).toHaveBeenCalledWith("2+invalid");
      expect(getByText("Invalid expression")).toBeInTheDocument();
    });
  });
});
