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

ウェルカム状態

```
$ curl -X POST -d '{"status":"welcome"}' --header "content-type:application/json" http://localhost:5100/action
```

通常状態

```
$ curl -X POST -d '{"status":"idle"}' --header "content-type:application/json" http://localhost:5100/action
```

口パク状態

```
$ curl -X POST -d '{"status":"talk"}' --header "content-type:application/json" http://localhost:5100/action
```
