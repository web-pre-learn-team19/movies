from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

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
    return render_template('review.html')

@app.route("/savereview", methods=["POST"])
def review_post():
    title_receive = request.form['title_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']

    if len(list(db.reviews.find({}, {'_id': False}))) == 0:
        idnum = 1
    else:
        idnum = db.reviews.find_one(sort=[("num", -1)])["num"] + 1

    doc = {
        'num': idnum,
        'title': title_receive,
        'star': star_receive,
        'comment': comment_receive
    }

    db.reviews.insert_one(doc)

    return jsonify({'msg': '등록 완료!'})


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
