from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.g596pjc.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta



# 랭킹
@app.route('/')
def home():
   return render_template('index.html')

# 리뷰
@app.route('/review')
def review():

    movie_list = list(db.movieRank.find({}, {'_id': False}))

    movie_name = [i['title'] for i in movie_list]
   
    


    
    return render_template('review.html', movie_name=movie_name)

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

    try:
        idnum = db.movieReview.find_one(sort=[("num", -1)])["num"] + 1
    except:
        idnum = 1

    doc = {
        'name': name_receive,
        'star': star_receive,
        'comment': comment_receive,
        'num': idnum
    }
    db.movieReview.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})

@app.route("/review/posting", methods=["GET"])
def review_get():
    review_list = list(db.movieReview.find({}, {'_id': False}))
    return jsonify({'reviews': review_list})


@app.route("/review/delete", methods=["POST"])
def review_delete():
    num_receive = request.form['num_give']
    db.movieReview.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '삭제 완료!'})

@app.route("/review/modify", methods=["POST"])
def review_modify():
    num_receive = request.form['num_give']
    print(num_receive)
    comment_receive = request.form['comment_give']
    print(comment_receive)
    db.movieReview.update_one({'num': int(num_receive)}, {'$set': {'comment': comment_receive}})
    return jsonify({'msg': '수정 완료!'})


@app.route("/review/postingByTitle", methods=["POST"])
def review_postingByTitle():
    title_receive = request.form['title_give']
    # print(title_receive)

    review_list = list(db.movieReview.find({'name':title_receive}, {'_id': False}))
    # print(review_list)
    return jsonify({'reviews': review_list})




# 랭킹 크롤링

@app.route("/rank", methods=["GET"])
def movie_get():
    movie_ranking = list(db.movieRank.find({}, {'_id': False}))

    return jsonify({'movieRank': movie_ranking})


# @app.route('/rank/pushreview', methods=["POST"])
# def review_pushReview():
#     selected_title_receive = request.form['title_give']
#     print(selected_title_receive)
#     return render_template('review.html', a=selected_title_receive)

@app.route('/rankk', methods=["GET"])
def rank1():
    name = request.args.get("title")
    print(name)

    selected_movie = db.movieRank.find_one({'r_rate': f'No.{name}'})["title"]
    print(selected_movie)
    movie_list = list(db.movieRank.find({}, {'_id': False}))

    movie_name = [i['title'] for i in movie_list]
    return render_template('review.html', selected_movie = selected_movie, movie_name = movie_name)




if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)