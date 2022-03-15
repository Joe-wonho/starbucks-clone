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

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top'); //to-top버튼 누르면 맨위로 이동하게 하는것

// index.html에서 사용한 lodash 외부 라이브러리를 통해 _.throttle() 이란 명령을 바로 쓸 수 있다
// _.throttle(함수, 시간) scroll과 throttle은 같이 붙어서 자주 사용된다.
window.addEventListener(
  'scroll',
  _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      //배지요소 숨기기  gsap 라이브러리 쓰기
      // gsap.to(요소, 지속시간(초단위), 옵션)
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: 'none',
      });
      // to-top버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: 'block',
      });
      // to-top버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        //toTopEl대신에 '#to-top' 으로 직접 css요소 선택자를 찾아도 된다.
        x: 100,
      });
    }
  }, 300) //300ms 0.3초 동안 부하를 줘서 함수가 우르르 실행되는 걸 방지한다.
);

//위 추가설명
// opacity 속성처럼 값을 숫자로 입력하는 속성들은 전환효과(transition, GSAP 라이브러리)를 통해 요소의
// 전 후 상태를 중간 숫자 값으로 자연스럽게 만들어 줄 수 있지만 display 속성은 값이 숫자가 아니라
// 전 후 상태의 중간 값이 없기 때문에 자연스러운 전환 효과를 적용할 수 없다

toTopEl.addEventListener('click', function () {
  //to-top버튼 누르면 맨위로 이동하게 하는것
  gsap.to(window, 0.7, {
    scrollTo: 0, //GSAP ScroolToPulgIn CDN
  });
});

//GSAP 을 이용한 순차적으로 애니메이션 효과를 주기위한 JS코드
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});

//Swiper 이용을 위한 JS코드        <div class="notice-line">에서 수직 슬라이드  419줄
//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

//454  SWIPER로 수평슬라이드 사용      <div class="promotion">
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 4000, // ms단위 0.5초임
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true, //사용자의 페이지 번호 요소 제어 가능 여부 (클릭 가능한지 보기만하게 할 수 있는지)
  },
  navigation: {
    //슬라이드 제어를 위한 화살표 모양을 만들어서 넣고 제어하기 위함
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  },
});

// 596 AWARDS 부분에 SWIPER로 슬라이더 만들기
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  },
});

//447   토글 열고닫기   <div class="toggle-promotion">
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    promotionEl.classList.add('hide'); //이런 토글 처리는 css에서 처리하자!
  } else {
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

//507 youtube 둥둥 떠다니는 애니메이션 추가
function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5),
    {
      //옵션
      y: size,
      repeat: -1, // 무한반복
      yoyo: true, // 재생된 것을 거꾸로 다시 재생해주는 옵션
      ease: Power1.easeInOut, // gsap.to 를 이용해 애니메이션의 속도를 처리하는 ease함수를 사용 gsap easing 검색 후 썻음
      delay: random(0, delay),
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

// Scroll Magic CDN 사용해서 특정화면이 보이기 시작하면 애니메이션 처리를 할 수 있는 기능을 만든다.
//Scene 메소드는 scroll magic js 라이브러리를 통해 특정한 옵션을 감시해주는 메소드임 , setClassToggle 은 우리가 클래스를 세팅해주는 것임, addTo는 컨트롤러 개념임
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 뷰포트 기준 상당 0 하단 1 인데 위치가 0.8인 부분에 스크롤중 걸리게 되면 밑의 set메소드가 실행된다.
  })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

//오늘날짜 자동계산을 위한 코드
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
