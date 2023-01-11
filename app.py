from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
import certifi
ca = certifi.where()


import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.g596pjc.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCaFile=ca)
db = client.dbsparta

client2 = MongoClient('mongodb+srv://lee:sparta@Cluster0.nw7w0pd.mongodb.net/?retryWrites=true&w=majority' ,tlsCaFile=ca)
db2 = client2.dbsparta

# 랭킹
@app.route('/')
def home():
   return render_template('index.html')

# 리뷰
@app.route('/review')
def review():
    list(db.movieList.find({}, {'_id': False}))
    movie_list = list(db2.movieprac.find({}, {'_id': False}))
    # print(movie_list)
    movie_name = [i['name'] for i in movie_list]
    movie_num = [i['num'] for i in movie_list]

    
    return render_template('review.html', movie_name=movie_name, movie_num=movie_num)

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


@app.route("/review/posting", methods=["POST"])
def review_post():
    name_receive = request.form['name_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']
    idnum = db2.movieReview.find_one(sort=[("num", -1)])["num"] + 1

    doc = {
        'name': name_receive,
        'star': star_receive,
        'comment': comment_receive,
        'num': idnum
    }
    db2.movieReview.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})

@app.route("/review/posting", methods=["GET"])
def review_get():
    review_list = list(db2.movieReview.find({}, {'_id': False}))
    return jsonify({'reviews': review_list})


@app.route("/review/delete", methods=["POST"])
def review_delete():
    num_receive = request.form['num_give']
    db2.movieReview.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '삭제 완료!'})

@app.route("/review/modify", methods=["POST"])
def review_modify():
    num_receive = request.form['num_give']
    print(num_receive)
    comment_receive = request.form['comment_give']
    print(comment_receive)
    db2.movieReview.update_one({'num': int(num_receive)}, {'$set': {'comment': comment_receive}})
    return jsonify({'msg': '수정 완료!'})


@app.route("/rank/push_review", methods=["POST"])
def rank_push_review():
    title_receive = request.form['title_give']
    idnum = db.movieList.find_one(sort=[("num", -1)])["num"] + 1

    doc = {
        'title1':title_receive,
        'num':idnum
    }
    db.PunshRank.insert_one(doc)

    return render_template('review.html')







# 랭킹 크롤링

@app.route("/rank", methods=["GET"])
def movie_get():
    movie_ranking = list(db.movieRank.find({}, {'_id': False}))

    return jsonify({'movieRank': movie_ranking})




if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)