# Reactでおみくじを作ろう

#### 環境構築手順

1. docker環境構築

2. 以下サイトを参考にReactの環境構築

   https://qiita.com/hasehiro0828/items/f4275c9a2175864c82e4

   - docker-composeのバージョンによってはサイト記載のdocker-compose.ymlファイルの１行目の「version: '3'」は記述方法が古いよ！とエラー吐くのでその場合はその行を削除。

   - 「docker-compose run --rm node sh -c "npm install -g create-react-app && create-react-app react-sample"」を実行時したあとにディレクトリにreact-sampleという名のディレクトリがなければ、nodeのバージョンが古くてエラーになっているはず。10以上のverを指定しなければReactは動かないため、最新を公式で探してバージョンを書き換える。この時サイド「docker-compose up -d --build」を行い、ビルドし直し、Dockerfileの内容を更新する。「docker-compose config」でも現在のイメージのDockerfileの中身が確認可能なのでチェックしてみてもよいかも。

   - ls -lコマンドで権限を確認してroot権限になっていたらファイルの編集権限がない可能性があるため、

     sudo chown -hR shimura:shimura sample_app/みたいなコマンドで権限をディレクトリ配下を再帰的に変更する

3. ディレクトリ構成は以下のようになるはず

   ![1616400976694](C:\Users\39210.FKU-SPC\AppData\Roaming\Typora\typora-user-images\1616400976694.png)　

4. 「sudo chmod -R 777 ./sample_app/」「sudo chown -R shimura:shimura ./sample_app」で権限とオーナー、グループを変更し書き込み可能にする。

5. 

6. 

7. 

   

8. 
