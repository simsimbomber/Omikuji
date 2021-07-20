import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';                           // CSS
import Omikuji from './components/Omikuji.js';  // おみくじコンポーネント
import Omikuji2 from './components/Omikuji2.js';  // おみくじコンポーネント

import History from './components/History.js';  // 履歴コンポーネント
import TextInput from './components/TextInput.js';  // 入力ボックスコンポーネント


ReactDOM.render(
  <React.StrictMode>
    <div>
      <header>
        {/* <Omikuji /> */}
        <Omikuji2 />
        <History />
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
