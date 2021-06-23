import React from 'react';
import config from '../initialize.js'; // 初期読み込み


const History = (props) => {
  return (
  <div>
    <header className='History-header'>
      <body style={styles.header}>
        <p>[履歴]</p>
        <li>ここに履歴を表示したい</li>
      </body>
    </header>
  </div>
  );
};

export default History;


//console.log('config.history:'+config.history);
// ローカルストレージのデータを取得
// 画面に履歴を表示
const drawHistory = (history) => {
  console.log('★drawHistory★');
  console.log('config.history:'+config.history);
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
}
// ローカルストレージから履歴を取得し引数に入れる
// const hoge = localstrage.....
//drawHistory(1);


// // 履歴を表示
// const li = document.createElement('li');
// const array = [];
// console.log(array);
// //JSON.stringify(this.state)
// 最大１０件の履歴を日付と一緒に降順で表示する



// export default class History extends Component {
    
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
//       <div className='App'>
//         <header className='History-header'>
//           <body style={styles.header}>
//             <p>[履歴]</p>
//             <li>ここに履歴を表示したい</li>

//           </body>
//         </header>
//       </div>
//     );
//   }

// }




// // CSS in Js
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
