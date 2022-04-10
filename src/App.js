import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardsPage from "./pages/CardsPage";
import SingleCardPage from "./pages/SingleCardPage";
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

export default function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<p>Loading cards...</p>}>
          <Switch>
            <Route exact path={["/cards", "/"]} component={CardsPage} />
            <Route exact path="/cards/:id" component={SingleCardPage} />
            <Route exact path="/favorites" component={FavoritesPage} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}
