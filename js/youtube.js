// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  //함수이름 바꾸면 안된다.
  //div 태그의 id값이 player인 것을 찾아서 실행  <div id= "player"> </div>
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', // 최초 재생할 유투브 영상ID 우리가 원하는 유트브 영상의 ID값을 넣어야함,  소스코드 복사하면 단순 출력만 되므로 안된다.
    playerVars: {
      autoplay: true, //자동재생 유무
      loop: true, //반복재생 유무
      platlist: 'An6LvWQuj_8', //반복 재생할 유투브 영상 ID목록
    },
    events: {
      onReady: function (event) {
        event.target.mute(); // 음소거
      },
    },
  });
}
