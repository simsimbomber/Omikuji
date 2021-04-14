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
          <button style={styles.circle} background onClick={this.getOmikujiResultData} >{this.state.name}</button>
          <h2>運勢結果</h2>
          <h3>{this.state.comment}</h3>
        </header>
      </div>
    );
  }

  // ボタンの色を変更する
  changeButtonColor = () => {
    this.setState({ color: 'red' });
  }
  // おみくじ用運勢のデータをランダムに取得
  getOmikujiResultData = () => {
    const omikujiData = [
      { name: '超大吉', comment: '最高最善', probability: 0.05, buttonColor: '#ffff00' },
      { name: '大吉', comment: 'やばい！', probability: 0.1, buttonColor: '#ffccff' },
      { name: '中吉', comment: 'まあまぁ', probability: 0.2, buttonColor: '#ffccff' },
      { name: '吉', comment: 'ふつう', probability: 0.3, buttonColor: '#ffccff' },
      { name: '小吉', comment: 'ちょいワル', probability: 0.2, buttonColor: '#ffccff' },
      { name: '凶', comment: '結構悪い', probability: 0.1 , buttonColor: '#ffccff' },
      { name: '大凶', comment: '最低最悪', probability: 0.05, buttonColor: '#ffccff' }
    ];

    const random = Math.random(); //　0以上1未満の乱数取得
    console.log(random);
    let p = 0 //pの初期値を0として設定
    for (const item of omikujiData) {//omikujiDataの中身を一つずつ順にitemに入れる。中身すべてを入れ終わるまで回る
      p = p+item.probability // 前回のpをprobabilityに足した値が今回のpとなる
      if (random < p) { // もし乱数の値をpが超えたら
        this.setState({
          name: item.name,
          comment: item.comment,
          probability: item.probability,
          buttonColor: item.buttonColor
        });
        // current.style.background = item.buttonColor;
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
