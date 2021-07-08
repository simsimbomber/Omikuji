import React, { useState } from 'react';
import config from '../initialize.js'; // 初期読み込み

const Omikuji2 = () => {
  const [state, setState] = useState(
    {
      name: 'push', 
      comment: 'ここに運勢を表示します', 
      probability: '', 
      buttonColor: ''
    }
  );
  
  // 画面に履歴を表示
  const drawHistory = (history) => {
    console.log('★drawHistory★');
    const historyElement = document.querySelector('.history');//クラス "history" を持つ文書内の要素の内、最初のもの(一番古い履歴リスト)を返します。
    this.removeChildren(historyElement);
  
    // removeChildren(element)//一番古い履歴を削除(子ノードのリストを削除)
    //slice()は、文字列や配列などからデータの一部分だけ取り出せるメソッドになります
    //hoge.reverse() で破壊的。hoge.slice().reverse() で非破壊的.逆順にしたhistoryをrecordにいれる
    //「配列」historyの値を1つずつ「変数recordへ代入してくれるようになります。
    for (const record of history.slice().reverse()) {
      const { id, item } = record;
      const newLi = document.createElement('li'); // 新しくliダグを生成
      console.log('test1:'+newLi);
      newLi.style.padding = "5";

      console.log('test2:'+newLi);

      //newLi.classList.add('list-group-item-dark');
      newLi.setAttribute('id', id); // liタグにidという属性を指定し、そのidの値に変数idを格納
      newLi.innerHTML = id + '　　' + item.name; // liタグのHTMLを挿入
      historyElement.appendChild(newLi);
    }
  }

  // 与えられた要素（引数）の子ノードを全削除
  const removeChildren = (element) => {
    console.log(element);
    while (element.firstChild) {//最も古い履歴リストの
      element.removeChild(element.firstChild);
    }
  }

  // ボタンの色を変更
  const changeButtonColor = (item) => {
    console.log('★changeButtonColor★');
    const mainButton = document.getElementById("mainButton");
    mainButton.style.background = item.buttonColor;
  }

  // ローカルストレージに値を保存
  const saveResultOmikujiData = (history, max_save_count) => {
    console.log(state);
    console.log('★saveResultOmikujiData★');
    const item = state; // 今回の運勢結果を変数に格納
  
    console.log('history='+history);
    console.log('item='+item);
  
    if (max_save_count <= history.length ) { // もし配列の要素数が10以上の場合は古い順に削除
      history.shift(); // 要素番号0の値を削除
    }
    history.push({ id: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }), item: item }); // 変数history配列に格納
    localStorage.setItem('omikuji-history', JSON.stringify(history)); // ローカルストレージにおみくじの結果（配列）を保存
  }

  // stateの値が変化した後の処理(コールバック関数)
  const afterChangeStateAction = (config, item) => () => {
    this.saveResultOmikujiData(config.history, config.max_save_count); //【1】ローカルストレージに値を保存
    this.changeButtonColor(item);        //【2】ボタンの色を変更
    this.drawHistory(config.history);           //【3】履歴にローカルストレージの値を表示
  }

  // おみくじ用運勢のデータをランダムに取得
  const getOmikujiResultData = () => {
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
        setState({
          name: item.name,
          comment: item.comment,
          probability: item.probability,
          buttonColor: item.buttonColor
        },
        afterChangeStateAction(config ,item) // stateは非同期処理なのでコールバック関数として第２引数に設定。
        );
        break;
      }
    }
  }

  // 画面描画
  return (
  <div>
    <button id='mainButton' style={styles.circle} onClick={getOmikujiResultData} >{state.name}</button>
    <h3>{state.comment}</h3>
    <p>[履歴]</p>
    <div id='historyArray' className='history'></div>
  </div>
  );

};

export default Omikuji2;

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






// class Omikuji extends Component {
  
//   constructor(props) {
//       super(props);
//       this.state = {
//         name: 'push',
//         comment: 'ここに運勢を表示します',
//         probability: '',
//         buttonColor: '',
//       };
//   }
  
//   // 初期描画
//   render() {
//     return (
//       <div style={styles.header}>
//         <button id='mainButton' style={styles.circle}  onClick={this.getOmikujiResultData} >{this.state.name}</button>
//         <h3>{this.state.comment}</h3>
//         <p>[履歴]</p>
//         <div id='historyArray' className='history'></div>
//       </div>
//     );
//   }

//   // // // ローカルストレージにおみくじの履歴がある際には画面に表示する
//   // if (config.history.length > 0) {//もし履歴の要素の数が０より大きいとき
//   // // // this.drawHistory(config.history);
//   // }

//   // stateの値が変化した後の処理(コールバック関数)
//   afterChangeStateAction = (config, item) => () => {
//     this.saveResultOmikujiData(config.history, config.max_save_count); //【1】ローカルストレージに値を保存
//     this.changeButtonColor(item);        //【2】ボタンの色を変更
//     this.drawHistory(config.history);           //【3】履歴にローカルストレージの値を表示
//   }

//   // ボタンの色を変更
//   changeButtonColor = (item) => {
//     console.log('★changeButtonColor★');
//     const mainButton = document.getElementById("mainButton");
//     mainButton.style.background = item.buttonColor;
//   }

//   // ローカルストレージに値を保存
//   saveResultOmikujiData = (history, max_save_count) => {
//     console.log(this.state);
//     console.log('★saveResultOmikujiData★');
//     const item = this.state; // 今回の運勢結果を変数に格納

//     console.log('history='+history);
//     console.log('item='+item);

//     if (max_save_count <= history.length ) { // もし配列の要素数が10以上の場合は古い順に削除
//       history.shift(); // 要素番号0の値を削除
//     }
//     history.push({ id: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }), item: item }); // 変数history配列に格納
//     localStorage.setItem('omikuji-history', JSON.stringify(history)); // ローカルストレージにおみくじの結果（配列）を保存
//   }

//   // 与えられた要素（引数）の子ノードを全削除
//   removeChildren = (element) => {
//     console.log(element);
//     while (element.firstChild) {//最も古い履歴リストの
//       element.removeChild(element.firstChild);
//     }
//   }

//   // 画面に履歴を表示
//   drawHistory = (history) => {
//     console.log('★drawHistory★');
//     const historyElement = document.querySelector('.history');//クラス "history" を持つ文書内の要素の内、最初のもの(一番古い履歴リスト)を返します。
//     this.removeChildren(historyElement);
  
//     // removeChildren(element)//一番古い履歴を削除(子ノードのリストを削除)
//     //slice()は、文字列や配列などからデータの一部分だけ取り出せるメソッドになります
//     //hoge.reverse() で破壊的。hoge.slice().reverse() で非破壊的.逆順にしたhistoryをrecordにいれる
//     //「配列」historyの値を1つずつ「変数recordへ代入してくれるようになります。
//     for (const record of history.slice().reverse()) {
//       const { id, item } = record;
//       const newLi = document.createElement('li'); // 新しくliダグを生成
//       console.log('test1:'+newLi);
//       newLi.style.padding = "5";

//       console.log('test2:'+newLi);

//       //newLi.classList.add('list-group-item-dark');
//       newLi.setAttribute('id', id); // liタグにidという属性を指定し、そのidの値に変数idを格納
//       newLi.innerHTML = id + '　　' + item.name; // liタグのHTMLを挿入
//       historyElement.appendChild(newLi);
//     }
//   }

//   // おみくじ用運勢のデータをランダムに取得
//   getOmikujiResultData = () => {
//     // おみくじのデータ
//     const omikujiData = [
//       { name: '超大吉', comment: '最高最善の一日です', probability: 0.05, buttonColor: 'yellow' },
//       { name: '大吉', comment: 'やばい！最高の一日です', probability: 0.1, buttonColor: 'red' },
//       { name: '中吉', comment: 'まあまぁの一日です', probability: 0.2, buttonColor: 'blue' },
//       { name: '吉', comment: 'ふつうの一日です', probability: 0.3, buttonColor: 'pink' },
//       { name: '小吉', comment: 'ちょいワルな一日です', probability: 0.2, buttonColor: 'green' },
//       { name: '凶', comment: '結構悪い一日です', probability: 0.1 , buttonColor: 'skyblue' },
//       { name: '大凶', comment: '最低最悪の一日です', probability: 0.05, buttonColor: 'purple' }
//     ];


//     // 乱数でstateを変更する
//     const random = Math.random(); //　0以上1未満の乱数取得
//     let p = 0 //pの初期値を0として設定
//     for (const item of omikujiData) { //omikujiDataの中身を一つずつ順にitemに入れる。中身すべてを入れ終わるまで回る
//       p = p+item.probability // 前回のpをprobabilityに足した値が今回のpとなる
//       if (random < p) { // もし乱数の値をpが超えたら
//         //state変更
//         this.setState({
//           name: item.name,
//           comment: item.comment,
//           probability: item.probability,
//           buttonColor: item.buttonColor
//         },
//         this.afterChangeStateAction(config ,item) // stateは非同期処理なのでコールバック関数として第２引数に設定。
//         );
//         break;
//       }
//     }
//   }

  
// }

// export default Omikuji;

// const a =10;
// console.log(a);
//   // // // ローカルストレージにおみくじの履歴がある際には画面に表示する
//   // if (config.history.length > 0) {//もし履歴の要素の数が０より大きいとき
//   // this.drawHistory(config.history);
//   // }

// // CSS in Js
// const styles = {
//   circle: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     color: 'black',
//     background: 'white',
//     fontSize: 40,
//   },
//   header: {
//     minHeight: 50,
//     background: '#282c34',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 20,
//     color: 'white',
//   },
//   // .: {
//   //   background: 'ThreeDHighlight',
//   //   padding: 5,
//   //   display: 'flex',
//   //   flexDirection: 'column',
//   //   fontSize: 20,
//   // },

// };
