import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from "react-redux";
import store from "./store";

const root = document.getElementById('root');
ReactDOM
  .unstable_createRoot(root)
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
  );