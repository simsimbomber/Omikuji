//import '../App.css';
import React, { Component } from 'react';
//import omikujiButton from './components/omikujiButton';
//import { render } from 'react-dom';
import history from '../initialize.js'; // 初期読み込み

export default class Omikuji extends Component {
    
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
        <header style={styles.header}>
          <button id='mainButton'style={styles.circle}  onClick={this.getOmikujiResultData} >{this.state.name}</button>
          <h3>{this.state.comment}</h3>
        </header>
      </div>
    );
  }

  // ボタンの色を変更
  changeButtonColor = (item) => {
    console.log('★changeButtonColor★');
    const mainButton = document.getElementById("mainButton");
    mainButton.style.background = item.buttonColor;
  }

  // ローカルストレージに値を保存
  saveResultOmikujiData = (history) => () => {
    console.log('★saveResultOmikujiData★');
    console.log('stateの値:'+JSON.stringify(this.state.name));
    const item = JSON.stringify(this.state); // 今回の運勢結果を変数に格納
    const MAX_SAVE_COUNT = 10;               // ローカルストレージに保存するデータの最大数
    
    if (MAX_SAVE_COUNT <= history.length ) { // もし配列の要素数が１０以上の場合は古い順に削除
      history.shift(); // 要素番号0の値を削除
    }
    history.push({ id: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }), item: item }); // 変数history配列に格納
    localStorage.setItem('omikuji-history', JSON.stringify(history)); // ローカルストレージにおみくじの結果（配列）を保存
  }

  // 画面に履歴を表示
  drawHistory = (history) => {
    console.log('★drawHistory★');
    console.log('stateの値(drawHistory):'+JSON.stringify(this.state.name));
    // removeChildren(element)//一番古い履歴を削除(子ノードのリストを削除)
    //slice()は、文字列や配列などからデータの一部分だけ取り出せるメソッドになります
    //hoge.reverse() で破壊的。hoge.slice().reverse() で非破壊的.逆順にしたhistoryをrecordにいれる
    //「配列」historyの値を1つずつ「変数recordへ代入してくれるようになります。
    for (const record of history.slice().reverse()) {
      const { id, item } = record;
      // console.log('record:'+record);
      // console.log('id:'+id);
      // console.log('item:'+item.name);

      // const time = record.id;
      // const omikujiResult = JSON.stringify(JSON.parse(record.item));
      // console.log(omikujiResult.name);
      // const redordLst = omikujiResult + time; 
      // console.log(redordLst);
      //console.log(time);
      //console.log(omikujiResult);

    }
    // const { id, item } = record;
    // const li = document.createElement('li');
    // li.setAttribute('id', id)
    // li.innerHTML = getHistoryRecordHtml(item.name, item.comment, id)
    // li.addEventListener('click', clickRecord, false)//処理⓶履歴クリック時
    // element.appendChild(li)
  }

  // おみくじ用運勢のデータをランダムに取得
  getOmikujiResultData = () => {
    // おみくじのデータ
    const omikujiData = [
      { name: '超大吉', comment: '最高最善の一日です', probability: 0.05, buttonColor: 'yellow' },
      { name: '大吉', comment: 'やばい！最高の一日です', probability: 0.1, buttonColor: 'red' },
      { name: '中吉', comment: 'まあまぁの一日です', probability: 0.2, buttonColor: 'blue' },
      { name: '吉', comment: 'ふつうの一日です', probability: 0.3, buttonColor: 'pink' },
      { name: '小吉', comment: 'ちょいワルな一日です', probability: 0.2, buttonColor: 'green' },
      { name: '凶', comment: '結構悪い一日です', probability: 0.1 , buttonColor: 'skyblue' },
      { name: '大凶', comment: '最低最悪の一日です', probability: 0.05, buttonColor: 'purple' }
    ];

    // 乱数でstateを変更する
    const random = Math.random(); //　0以上1未満の乱数取得
    let p = 0 //pの初期値を0として設定
    for (const item of omikujiData) { //omikujiDataの中身を一つずつ順にitemに入れる。中身すべてを入れ終わるまで回る
      p = p+item.probability // 前回のpをprobabilityに足した値が今回のpとなる
      if (random < p) { // もし乱数の値をpが超えたら
        //state変更
        this.setState({
          name: item.name,
          comment: item.comment,
          probability: item.probability,
          buttonColor: item.buttonColor
        },
        this.saveResultOmikujiData(history) // stateは非同期処理なのでコールバック関数として第２引数に設定。
        );
        // 【1】ボタンの色を変更
        this.changeButtonColor(item);
        break;
      }
    }
    // 【2】ローカルストレージに値を保存
    //this.saveResultOmikujiData(history);
    // 【3】履歴にローカルストレージの値を表示
    this.drawHistory(history);
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
