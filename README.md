## toco ちゃんバス あと何分？

* python3.6.0
* flask
* gunicorn

## ローカル環境での起動

```
macOS%$ python app.py
```

## For Heroku

```
$ heroku login
$ heroku create

// デプロイ
$ git push heroku master

$ heroku scale web=1
$ heroku open
```
