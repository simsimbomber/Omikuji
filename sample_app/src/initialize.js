// ここに初期読み込みに必要なロジックを記述します。
import './function.js'; // 関数まとめファイル

// // 関数
// const initializeHistory = () => {// omikuji-history=ローカルストレージ格納キー
//     const history = localStorage.getItem('omikuji-history')//'omikuji-history'という名のローカルストレージのデータをhistoryに入れる
//     if (history) {//history===true
//       try {
//         //JSON は、null、真偽値、数値、文字列、配列、オブジェクト（連想配列）のデータを、文字列で表現できます。
//         //parseとは、JSONがそのままだと表示出来ないことがある為、日付やJSONなどのデータを文字列に変換するために使います。
//         return JSON.parse(history)//例外エラーが発生するかもしれない処理。
        
//       } catch (e) {}//｛｝内は例外エラーが起きた時に実行する処理
//     }
  
//     return []//[]は配列の生成。new Array()でも可。historyはpushしたりいくつも増えるため、配列でなければならない.
//   }




console.log('initialize.js読み込み');
//var MAX_SAVE_COUNT = 10; // ローカルストレージに保存するデータの最大数
const history = []; // 配列で履歴作成
export default history;
//const history = localStorage.getItem('omikuji-history');//'omikuji-history'という名のローカルストレージのデータをhistoryに入れる

//const historyArrary = [];//initializeHistory();//ローカルストレージの話
//console.log(history);
// // ローカルストレージを配列にする
// const MAX_HISTORY_COUNT = 10; // 履歴の最大個数
// var history = new Array( MAX_HISTORY_COUNT); // 要素数10の配列作成
// history = localStorage.getItem('omikuji-history'); //'omikuji-history'という名のローカルストレージのデータをhistoryに入れる
// console.log(history);


