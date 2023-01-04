import { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  email: "",
  password: "",
};

//should have the cases "email", "password", and "reset", along with the default cases
const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

function App() {
  // import and use the useReducer hook here, with the reducer function and the initialState.
  const [pesronData, dispatch] = useReducer(reducer, initialState);
  //store the data in this object variable when you click on the submit button, to render, the data in the UI.
  const [submittedData, setSubmittedData] = useState({});

  const HandleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(pesronData);
    dispatch({ type: "reset" });
  };

  console.log(submittedData);

  return (
    <div className="App">
      <h2>useReducer Hook</h2>
      <form
        className="form-wrapper"
        data-testid="form-wrapper"
        onSubmit={HandleSubmit}
      >
        <div className="useremail-wrapper">
          <label>User Email</label>
          <input
            type="email"
            data-testid="user-email"
            value={pesronData.email}
            onChange={(e) => {
              dispatch({ type: "email", payload: e.target.value });
            }}
          />
        </div>
        <div className="userpassword-wrapper">
          <label>User Password</label>
          <input
            type="password"
            data-testid="user-password"
            value={pesronData.password}
            onChange={(e) => {
              dispatch({ type: "password", payload: e.target.value });
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* IF there is data in the submittedData variable after submitting the form, show the data here ELSE show the No details found div. */}
      <div>
        <div data-testid="submitted-data-email">
          User Email:{submittedData.email}
        </div>
        <div data-testid="submitted-data-password">
          User Password:{submittedData.password}
        </div>
      </div>

      <div data-testid="no-details-container"></div>
    </div>
  );
}

// DO NOT change/modify the exports
export default App;
export { reducer, initialState };
