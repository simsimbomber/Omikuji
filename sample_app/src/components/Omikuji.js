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
          <h4></h4>
        </header>
      </div>
    );
  }

  // stateの値が変化した後の処理(コールバック関数)
  afterChangeStateAction = (history, item) => () => {
    this.saveResultOmikujiData(history); //【1】ローカルストレージに値を保存
    this.changeButtonColor(item);        //【2】ボタンの色を変更
    this.drawHistory(history);           //【3】履歴にローカルストレージの値を表示
  }

  // ボタンの色を変更
  changeButtonColor = (item) => {
    console.log('★changeButtonColor★');
    const mainButton = document.getElementById("mainButton");
    mainButton.style.background = item.buttonColor;
  }

  // ローカルストレージに値を保存
  saveResultOmikujiData = (history) => {
    console.log(this.state);
    console.log('★saveResultOmikujiData★');
    //const item = JSON.stringify(this.state); // 今回の運勢結果を変数に格納
    const item = this.state; // 今回の運勢結果を変数に格納

    const MAX_SAVE_COUNT = 10;               // ローカルストレージに保存するデータの最大数
    console.log('history='+history);
    console.log('item='+item);

    if (MAX_SAVE_COUNT <= history.length ) { // もし配列の要素数が10以上の場合は古い順に削除
      history.shift(); // 要素番号0の値を削除
    }
    history.push({ id: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }), item: item }); // 変数history配列に格納
    localStorage.setItem('omikuji-history', JSON.stringify(history)); // ローカルストレージにおみくじの結果（配列）を保存
  }

  // 画面に履歴を表示
  drawHistory = (history) => {
    console.log('★drawHistory★');
    //('.History')//クラス "history" を持つ文書内の要素の内、最初のもの(一番古い履歴リスト)を返します。
    //console.loglog(historyElement);
    //const A = document.getAttribute('h4');
    // removeChildren(element)//一番古い履歴を削除(子ノードのリストを削除)
    //slice()は、文字列や配列などからデータの一部分だけ取り出せるメソッドになります
    //hoge.reverse() で破壊的。hoge.slice().reverse() で非破壊的.逆順にしたhistoryをrecordにいれる
    //「配列」historyの値を1つずつ「変数recordへ代入してくれるようになります。
    for (const record of history.slice().reverse()) {
      const { id, item } = record;
      const newLi = document.createElement('li'); // 新しくliダグを生成
      newLi.setAttribute('id', id); // liタグにidという属性を指定し、そのidの値に変数idを格納
      newLi.innerHTML = 'TIME:' + id + '/Fortune:' + item.name; // liタグのHTMLを挿入
      console.log(newLi);

      //h4.appendChild(newLi);
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
        this.afterChangeStateAction(history ,item) // stateは非同期処理なのでコールバック関数として第２引数に設定。
        );
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
