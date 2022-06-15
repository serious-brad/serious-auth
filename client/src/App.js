import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./store";
import LoginForm from "./components/LoginForm";

const App = () => {
  const store = useContext(Context);
  const { loggedIn, user, users, isLoading } = store;

  useEffect(() => {
    store.checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <LoginForm />
    );
  }

  return (
    <div className="App">
      <h1>{`Hello, ${user?.firstName}`}</h1>

      <button onClick={() => store.getLogout()}>logout</button>

      <button onClick={() => store.getAllUsers()}>get users</button>
      <ul>
        {users?.map((user) => {
          return <li key={user?.id}>{user?.firstName}</li>;
        })}
      </ul>
    </div>
  );
};

export default observer(App);
