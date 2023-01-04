import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App, { initialState, reducer } from "../App";

describe("Test Application using useReducer", () => {
  beforeAll(() => {
    global.score = 1;
  });

  beforeEach(() => {
    cleanup();
    const defaultState = reducer(initialState, { type: "not-present" });
    expect(defaultState).toStrictEqual(initialState);
  });

  test("check if the reducer function handles the default case", () => {
    const defaultState = reducer(initialState, { type: "not-present" });
    expect(defaultState).toStrictEqual(initialState);
  });

  test("check if the reducer function handles the email key", () => {
    render(<App />);
    const newState = reducer(initialState, {
      type: "email",
      payload: "masai@gmail.com",
    });
    expect(newState).toStrictEqual({ email: "masai@gmail.com", password: "" });
    global.score += 2;
  });

  test("check if the reducer function handles the password key", () => {
    render(<App />);
    const newState = reducer(initialState, {
      type: "password",
      payload: "testing1234",
    });
    expect(newState).toStrictEqual({ email: "", password: "testing1234" });
    global.score += 2;
  });

  test("check if the user is able to write in the email input box", () => {
    render(<App />);
    const emailInputTag = screen.getByTestId("user-email");
    fireEvent.change(emailInputTag, {
      target: { value: "masaischool@gmail.com" },
    });
    expect(emailInputTag).toHaveValue("masaischool@gmail.com");
    global.score += 1;
  });

  test("check if the user is able to write in the password input box", () => {
    render(<App />);
    const passwordInputTag = screen.getByTestId("user-password");
    fireEvent.change(passwordInputTag, {
      target: { value: "testing12345" },
    });
    expect(passwordInputTag).toHaveValue("testing12345");
    global.score += 1;
  });

  test('should show "no details found" text initially', () => {
    render(<App />);
    expect(screen.getByTestId("no-details-container")).toHaveTextContent(
      /no details found/i
    );
    global.score += 1;
  });

  test("should show the submitted data in the UI", () => {
    render(<App />);
    const emailInputTag = screen.getByTestId("user-email");
    const passwordInputTag = screen.getByTestId("user-password");
    fireEvent.change(emailInputTag, {
      target: { value: "masaischool@gmail.com" },
    });
    fireEvent.change(passwordInputTag, {
      target: { value: "testing12345" },
    });

    const formElement = screen.getByTestId("form-wrapper");
    fireEvent.submit(formElement);

    const submittedEmailInputTag = screen.getByTestId("submitted-data-email");
    const submittedPasswordInputTag = screen.getByTestId(
      "submitted-data-password"
    );
    expect(submittedEmailInputTag).toHaveTextContent("masaischool@gmail.com");
    expect(submittedPasswordInputTag).toHaveTextContent("testing12345");
    global.score += 1;
  });

  test("should reset the input box to initial empty values, after submit", () => {
    render(<App />);
    const emailInputTag = screen.getByTestId("user-email");
    const passwordInputTag = screen.getByTestId("user-password");
    fireEvent.change(emailInputTag, {
      target: { value: "masaischool@gmail.com" },
    });
    fireEvent.change(passwordInputTag, {
      target: { value: "testing12345" },
    });

    const formElement = screen.getByTestId("form-wrapper");
    fireEvent.submit(formElement);
    expect(emailInputTag).toHaveValue("");
    expect(passwordInputTag).toHaveValue("");
    global.score += 1;
  });

  afterAll(() => {
    console.log("Final Score is", global.score);
  });
});
