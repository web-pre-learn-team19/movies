import requests
from bs4 import BeautifulSoup


from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.g596pjc.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get("http://www.cgv.co.kr/movies/?lt=1&ft=0", headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
info = soup.select("#contents > div.wrap-movie-chart > div.sect-movie-chart > ol > li ")

for movie_chart in info:
    img = movie_chart.select_one("div.box-image > a > span > img")["src"]
    title = movie_chart.select_one("div.box-contents > a > strong").text.strip()
    release = movie_chart.select_one("div.box-contents > span.txt-info > strong").text.strip()
    r_rate = movie_chart.select_one("div.box-image > strong").text.strip()
    print(img, title, release, r_rate)

    doc = {
        "title": title,
        "img": img,
        "release": release,
        "r_rate": r_rate,
    }

    db.movieRank.insert_one(doc)