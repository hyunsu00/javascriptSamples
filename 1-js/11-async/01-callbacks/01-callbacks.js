// 1. 01-callbacks
{
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
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
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
}

// 2. 02-promise-basics로 수정
{
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.src = src;

      script.onload = () => resolve(script);
      script.onerror = () =>
        reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

      document.head.append(script);
    });
  }

  let promise = loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"
  );
  promise.then(
    (script) => alert(`${script.src}을 불러왔습니다!`),
    (error) => alert(`Error: ${error.message}`)
  );

  promise.then((script) => alert("또다른 핸들러..."));
}

// 3. 03-promise-chaining로 수정
{
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.src = src;

      script.onload = () => resolve(script);
      script.onerror = () =>
        reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

      document.head.append(script);
    });
  }

  {
    loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/one.js")
      .then(function (script) {
        return loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/two.js");
      })
      .then(function (script) {
        return loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/three.js");
      })
      .then(function (script) {
        // 불러온 스크립트 안에 정의된 함수를 호출해
        // 실제로 스크립트들이 정상적으로 로드되었는지 확인합니다.
        one();
        two();
        three();
      });
  }
  // == 
  {
    loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/one.js")
      .then((script) => loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/two.js"))
      .then((script) => loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/three.js))
      .then((script) => {
        // 스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있습니다.
        one();
        two();
        three();
      });
  }
  // ==
  {
    loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/one.js").then((script1) => {
      loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/two.js").then((script2) => {
        loadScript("https://github.com/hyunsu00/ko.javascript.info/blob/master/1-js/11-async/03-promise-chaining/three.js").then((script3) => {
          // 여기서 script1, script2, script3에 정의된 함수를 사용할 수 있습니다.
          one();
          two();
          three();
        });
      });
    });
  }
}
