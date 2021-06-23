import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';                           // CSS
import Omikuji from './components/Omikuji.js';  // おみくじコンポーネント
import History from './components/History.js';  // 履歴コンポーネント

ReactDOM.render(
  <React.StrictMode>
    <div>
      <header>
      {/* <button type="button" class="btn btn-secondary">test</button> */}
        <Omikuji />
        {/* <History /> */}
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
