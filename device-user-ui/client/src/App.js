import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInAndSignUpPage from "./components/signInAndSignUp/signInAndSignUpPage";
import { auth, createUserProfileDocument } from "./firebase/firebaseUtility";
import Devices from "./components/devices/devices";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/devices" component={Devices} />
          <Route
            exact
            path="/"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/devices" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/devices" />
              ) : (
                <SignInAndSignUpPage />
              )
            }

            //component={this.props.currentUser ? Homepage : SignInAndSignUpPage}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
