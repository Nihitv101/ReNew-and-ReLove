import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ConfigProvider } from 'antd';
import store from './redux/store';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components:{
          Button:{
            colorPrimary:"#468B97",
            colorPrimaryHover:"#435B66",
            borderRadius:'2px'
          }
        },
        token:{
          borderRadius:"2px"
        }
      }}
    >
        <App />
    </ConfigProvider>

  </Provider>
  </React.StrictMode>
);

