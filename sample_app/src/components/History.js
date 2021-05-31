//import '../App.css';
import React, { Component } from 'react';
//import React, { Omikuji } from './Omikuji.js';
//import { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class History extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        name: 'push',
        comment: 'ここに運勢を表示します',
        probability: '',
        buttonColor: '',
      };
  }
  
  // 初期描画
  render() {
    return (
      <div className='App'>
        <header className='History-header'>
          <body style={styles.header}>
            <p>[履歴]</p>
            <li>ここに履歴を表示したい</li>
          </body>
        </header>
      </div>
    );
  }

}

// ローカルストレージのデータを取得
// // 履歴を表示
// const li = document.createElement('li');
// const array = [];
// console.log(array);
// //JSON.stringify(this.state)
// 最大１０件の履歴を日付と一緒に降順で表示する


// CSS in Js
const styles = {
  header: {
    minHeight: 50,
    background: '#282c34',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
  }
};
