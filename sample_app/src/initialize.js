// ここに初期読み込みに必要なロジックを記述します。
import './function.js'; // 関数まとめファイル

// 以下は初期読み込み
console.log('initialize.jsによる初期読み込み');
let history = []; // 配列で履歴作成 
if(localStorage.getItem('omikuji-history')) { // ローカルストレージ存在チェック
    // あるとき
    localStorage.setItem('omikuji-history', localStorage.getItem('omikuji-history')); // 履歴の永続化　＊omikuji-historyに
    history = JSON.parse(localStorage.getItem('omikuji-history')); // ローカルストレージの値を格納。＊JSON.parsesによって配列として持ってこれてる。JSON.parsesがないと文字列として認識されてしまう。
} else {
    // ないとき
    localStorage.setItem('omikuji-history', ''); // key:omikuji-historyでvalueが空のローカルストレージ作成
}
export default history; // おみくじの履歴を渡す



