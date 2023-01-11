from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import certifi
ca = certifi.where()

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.g596pjc.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCaFile=ca)
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://movie.naver.com/movie/running/current.naver', headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

rankings = soup.select('#content > div.article > div > div.lst_wrap > ul > li')

for ranking in rankings:
    a = ranking.select_one('dl > dt > a')
    if a != None:
        title = a.text
        img_url = ranking.select_one('div > a > img')['src']
        open_date = ranking.select_one('dl > dd:nth-child(3) > dl > dd').text.replace("\n", "").replace("\r", "").replace("\t", "").replace("|","")

        doc = {
            'title': title,
            'img_url': img_url,
            'open_date': open_date
        }
        db.rank.insert_one(doc)


@app.route("/rank", methods=["GET"])
def rank_get():
    rank_list = list(db.rank.find({}, {'_id': False}))
    return jsonify({'rankings':rank_list})


# 랭킹
@app.route('/')
def home():
   return render_template('index.html')

# 리뷰
@app.route('/review')
def review():
    return render_template('review.html')

# 체크리스트
@app.route('/list')
def checklist():
    return render_template('list.html')

@app.route("/watchlist", methods=["POST"])
def list_post():
    movie_receive = request.form['movie_give']

    idnum = db.movieList.find_one(sort=[("num", -1)])["num"] + 1

    doc = {
        'num': idnum,
        'movie': movie_receive,
        'done': 0
    }

    db.movieList.insert_one(doc)

    return jsonify({'msg': '등록 완료!'})

@app.route("/watchlist/done", methods=["POST"])
def list_done():
    num_receive = request.form['num_give']
    db.movieList.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': '체크 완료!'})

@app.route("/watchlist/cancel", methods=["POST"])
def list_cancel():
    num_receive = request.form['num_give']
    db.movieList.update_one({'num': int(num_receive)}, {'$set': {'done': 0}})
    return jsonify({'msg': '체크 해제 완료!'})

@app.route("/watchlist/delete", methods=["POST"])
def list_delete():
    num_receive = request.form['num_give']
    db.movieList.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '삭제 완료!'})


@app.route("/watchlist", methods=["GET"])
def list_get():
    watch_list = list(db.movieList.find({}, {'_id': False}))
    return jsonify({'watchLists': watch_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
