import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles and styled components
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import { NotesList } from "./pages";

// redux
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// redux persist related
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistReducer, persistStore } from "redux-persist";

// reducers
import allReducers from "./store/reducers";

// firebase
import firebase from "firebase/compat/app";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<NotesList />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
