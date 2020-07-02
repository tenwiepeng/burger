import React from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Credits from "./components/Credits/Credits";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>

      {/* Will go in sidebar */}
      {/* <Credits /> */}
    </div>
  );
}

export default App;
