import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite"
import { Context } from "./store";

const App = () => {
  const [currUser, setCurrUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: ''
  });
  const { store } = useContext(Context);
  const { loggedIn, user, users, isLoading } = store;

  if (isLoading) {
    return (
      <div>Loading...</div>
    );;
  }

  if (!loggedIn) {
    return (
      <div>
        <input
          type="text"
          placeholder="Email"
          value={currUser.email}
          onChange={(e) => setCurrUser({ ...currUser, email: e.target.value })}
        />
        <input
          type="password"
          value={currUser.password}
          placeholder="Password"
          onChange={(e) => setCurrUser({ ...currUser, password: e.target.value })}
        />
        <button onClick={() => store.getLogin(currUser.email, currUser.password)}>
          login
        </button>
        <div>
          <p>For registration please enter first name and last name</p>
          <input
            type="text"
            placeholder="First name"
            value={currUser.firstName}
            onChange={(e) => setCurrUser({ ...currUser, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last name"
            value={currUser.lastName}
            onChange={(e) => setCurrUser({ ...currUser, lastName: e.target.value })}
          />
          <button onClick={() => store.register(currUser)}>
            register
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>{`Hello, ${user?.firstName}`}</h1>

      <button onClick={() => store.getLogout()}>
        logout
      </button>

      <button onClick={() => store.getAllUsers()}>
        get users
      </button>
      <ul>
        {users?.map((user) => {
          return <li key={user?.id}>{user?.firstName}</li>
        })}
      </ul>
    </div>
  );
}

export default observer(App);
