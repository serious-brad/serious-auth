import { useContext, useState } from "react";
import { Context } from "../store";

const LoginForm = () => {
  const [currUser, setCurrUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const store = useContext(Context);

  const handleChange = (fieldName) => (e) =>
    setCurrUser({ ...currUser, [fieldName]: e.target.value });

  const handleLogin = () => store.getLogin(currUser.email, currUser.password)

  const handleRegister = () => store.register(currUser);

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={currUser.email}
        onChange={handleChange('email')}
      />
      <input
        type="password"
        value={currUser.password}
        placeholder="Password"
        onChange={handleChange('password')}
      />
      <button onClick={handleLogin}> Login </button>

      <div>
        <p>For registration please enter first name and last name</p>
        <input
          type="text"
          placeholder="First name"
          value={currUser.firstName}
          onChange={handleChange('firstName')}
        />
        <input
          type="text"
          placeholder="Last name"
          value={currUser.lastName}
          onChange={handleChange('lastName')}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}

export default LoginForm;
