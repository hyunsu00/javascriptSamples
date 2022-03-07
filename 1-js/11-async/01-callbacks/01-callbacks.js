function loadScript(src, callback) {
  // <script> 태그를 만들고 페이지에 태그를 추가합니다.
  // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행합니다.
  let script = document.createElement("script");
  script.src = src;

  // 스크립트 로딩 성공시 callback 호출
  script.onload = () => callback(null, script);
  // 스크립트 로딩 실패시 callback 호출
  script.onerror = () =>
    callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash_.js",
  function (error, script) {
    if (error) {
      // 에러 처리
      alert(`스크립트가 실패하였습니다.`);
    } else {
      // 스크립트 로딩이 성공적으로 끝남
      alert(`${script.src}가 로드되었습니다.`);
      alert(_); // 스크립트에 정의된 함수
    }
  }
);
