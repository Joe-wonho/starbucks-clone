const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

//검색 아이콘이 눌려도 focus적용이 되게 하기 위해 작성
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});
//검색 부분이 focus 되면 focused 클래스 추가후  placeholder 추가
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
//검색 부분이 focus 해제(blur)되면 통합검색 placeholder 삭제
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

//오늘날짜 자동계산을 위한 코드
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
