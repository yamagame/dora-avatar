# HTTPでコントロールするアバターのサンプル

## 準備

```
$ npm install
```

## 動かし方

```
$ npm start
```

## アバターのコントロール

通常状態

```
$ curl -X POST -d '{"status":"idle", "message":""}' --header "content-type:application/json" http://localhost:5100/action
```

口パク状態

```
$ curl -X POST -d '{"status":"talk", "message":"Hello"}' --header "content-type:application/json" http://localhost:5100/action
```
