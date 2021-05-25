import './App.css';
import React, { Component } from 'react';
//import omikujiButton from './components/omikujiButton';
//import { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    
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
        <header className='App-header'>
          {/* <omikujiButton />
          <omikujiCommentBox />
          <omikujComments /> */}
          <button id='mainButton'style={styles.circle}  onClick={this.getOmikujiResultData} >{this.state.name}</button>
          <h3>{this.state.comment}</h3>
          <h3>[履歴]</h3>
          <li></li>
        </header>
      </div>
    );
  }

  // // ボタンの色を変更する
  changeButtonColor = () => {
    //const button1 = document.getElementById("button1");
    //button1.style.background = item.buttonColor;
    console.log('AAA');
  }
  // おみくじ用運勢のデータをランダムに取得
  getOmikujiResultData = () => {
    // おみくじのデータ
    const omikujiData = [
      { name: '超大吉', comment: '最高最善', probability: 0.05, buttonColor: 'yellow' },
      { name: '大吉', comment: 'やばい！', probability: 0.1, buttonColor: 'red' },
      { name: '中吉', comment: 'まあまぁ', probability: 0.2, buttonColor: 'blue' },
      { name: '吉', comment: 'ふつう', probability: 0.3, buttonColor: 'pink' },
      { name: '小吉', comment: 'ちょいワル', probability: 0.2, buttonColor: 'green' },
      { name: '凶', comment: '結構悪い', probability: 0.1 , buttonColor: 'skyblue' },
      { name: '大凶', comment: '最低最悪', probability: 0.05, buttonColor: 'purple' }
    ];

    // 乱数でstateを変更する
    const random = Math.random(); //　0以上1未満の乱数取得
    let p = 0 //pの初期値を0として設定
    for (const item of omikujiData) {//omikujiDataの中身を一つずつ順にitemに入れる。中身すべてを入れ終わるまで回る
      p = p+item.probability // 前回のpをprobabilityに足した値が今回のpとなる
      if (random < p) { // もし乱数の値をpが超えたら
        // state変更
        this.setState({
          name: item.name,
          comment: item.comment,
          probability: item.probability,
          buttonColor: item.buttonColor
        });
        //ローカルストレージにおみくじ結果の配列を保存
        //const MAX_SAVE_COUNT = 10; // ローカルストレージに保存するデータの最大数

        // 履歴を表示
        const li = document.createElement('li');
        //changeButtonColor();
        localStorage.setItem('stateData', JSON.stringify(this.state));

        // ボタンの色を変更
        const mainButton = document.getElementById("mainButton");
        mainButton.style.background = item.buttonColor;
        break;
      }
    }

  }
}

// CSS in Js
const styles = {
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    color: 'black',
    background: 'white',
    fontSize: 40,
  },
};
