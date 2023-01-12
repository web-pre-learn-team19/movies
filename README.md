## 🎬 Movie Storage

인기 영화를 한 눈에 보고, 보고싶은 영화를 담아두고, 보았던 영화를 기록하는 무비 스토리지 사이트

## 📆개발 기간

2023년 1월 9일 ~ 2023년 1월 12일

## 👥팀원

**🐓 `김도연` : 리뷰 페이지, 리스트 페이지**

**🐶 `이신행` : 리뷰 페이지, 리스트 페이지**

**🐶 `천기범` : 랭킹 페이지, 리스트 페이지**

**🐶 `이건호` : 랭킹 페이지, 리스트 페이지**


## 🛠️기술 스택

- HTML
- CSS
- JavaScript
- Python
- Flask
- bs4
- mongoDB

## 💡구현 기능

- [ranking] 인기 영화 순위 조회
    - 인기 영화 순위를 크롤링하여 DB에 저장하고, 저장된 데이터를 보여준다.
- [review] 인기 영화 리뷰 등록 및 조회
    - [ranking] 페이지에서 영화 클릭 시, 해당 영화의 리뷰를 등록할 수 있다.
    - [ranking] 페이지에서 넘어온 경우, 해당 영화의 리뷰가 조회된다.
    - [review] 페이지에서 영화 제목을 선택하여 리뷰를 등록할 수 있다.
- [review] 리뷰 수정 및 삭제
    - 등록된 리뷰를 수정하고 삭제할 수 있다.
- [list] 영화 리스트 저장 및 체크 표시
    - 보고싶은 영화 리스트를 저장할 수 있다.
    - 이미 본 영화는 체크표시하여 보지 않은 영화와 구분할 수 있다.
- [list] 영화 리스트 조회 및 삭제
    - 체크 유무에 따라 영화 리스트를 나누어 보여준다.
        - (ALL - 전체, TO WATCH - 미체크, WATCHED - 체크)
    - 저장한 영화 리스트를 삭제할 수 있다.

## 👀 VIEW

- **Ranking 페이지**
  <img src="https://user-images.githubusercontent.com/96133075/212064140-286686fc-0b6f-46aa-9b89-bdfebe71b37c.png">
  <img src="https://user-images.githubusercontent.com/96133075/212064230-7f00baed-5777-45b7-8a77-7fd1e69c7993.png">
    
- **Review 페이지**
  <img src="https://user-images.githubusercontent.com/96133075/212064284-5655712a-bc14-465a-b5f1-4ab8d738f1e7.png">
  <img src="https://user-images.githubusercontent.com/96133075/212064322-b9920bc2-d37f-442f-abde-8cebac22ed9c.png">
  <img src="https://user-images.githubusercontent.com/96133075/212064378-cd76933f-e935-41ec-a572-3ae264d01a24.png">
    
- **List 페이지**
  <img src="https://user-images.githubusercontent.com/96133075/212064448-3cad2286-4f15-4a71-95e8-5cab98f3a644.png">
