import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import RootRouter  from "./components/router";

class App extends React.Component {
  render(): ReactNode {
    return (
      <Provider store={store}>
        <RootRouter />
      </Provider>
    );
  }
}
export default App;
