// https://ko.javascript.info/promise-chaining
"use strict";

// 1. 프라미스 체이닝 예
{
  // 프라미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어입니다.
  // 아래 예시는 아래와 같은 순서로 실행됩니다.
  // 1초 후 최초 프라미스가 이행됩니다. – (*)
  // 이후 첫번째 .then 핸들러가 호출됩니다. –(**)
  // 2에서 반환한 값은 다음 .then 핸들러에 전달됩니다. – (***)
  // 이런 과정이 계속 이어집니다.
  // 프라미스 체이닝이 가능한 이유는 promise.then을 호출하면 프라미스가 반환되기 때문입니다.
  // 반환된 프라미스엔 당연히 .then을 호출할 수 있습니다.
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
  })
    .then(function (result) {
      // (**)
      console.log(result); // 1
      return result * 2;
    })
    .then(function (result) {
      // (***)
      console.log(result); // 2
      return result * 2;
    })
    .then(function (result) {
      console.log(result); // 4
      return result * 2;
    });
}

// 2. 프라미스 체이닝이 아닌예
{
  // 초보자는 프라미스 하나에 .then을 여러 개 추가한 후, 이를 체이닝이라고 착각하는 경우가 있습니다.
  // 하지만 이는 체이닝이 아닙니다.
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });

  promise.then(function (result) {
    console.log(result); // 1
    return result * 2;
  });

  promise.then(function (result) {
    console.log(result); // 1
    return result * 2;
  });

  promise.then(function (result) {
    console.log(result); // 1
    return result * 2;
  });
}

// 3. 프라미스 반환하기
{
  // 예시에서 첫 번째 .then은 1을 출력하고 new Promise(…)를 반환((*))합니다.
  // 1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result * 2)는 두 번째 .then으로 전달됩니다.
  // 두 번째 핸들러((**))는 2를 출력하고 동일한 과정이 반복됩니다.
  // 따라서 얼럿 창엔 이전 예시[1. 프라미스 체이닝 예]와 동일하게 1, 2, 4가 차례대로 출력됩니다.
  // 다만 console.log 사이에 1초의 딜레이가 생깁니다.
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function (result) {
      console.log(result); // 1

      return new Promise((resolve, reject) => {
        // (*)
        setTimeout(() => resolve(result * 2), 1000);
      });
    })
    .then(function (result) {
      // (**)
      console.log(result); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
      });
    })
    .then(function (result) {
      console.log(result); // 4
    });
}

// 4. thenable
{
  // 핸들러는 프라미스가 아닌 thenable이라 불리는 객체를 반환하기도 합니다.
  // .then이라는 메서드를 가진 객체는 모두 thenable객체라고 부르는데, 이 객체는 프라미스와 같은 방식으로 처리됩니다.
  // ‘thenable’ 객체에 대한 아이디어는 서드파티 라이브러리가 ‘프라미스와 호환 가능한’ 자체 객체를 구현할 수 있다는 점에서 나왔습니다.
  // 이 객체들엔 자체 확장 메서드가 구현되어 있겠지만 .then이 있기 때문에 네이티브 프라미스와도 호환 가능합니다.
  class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      console.log(resolve); // function() { 네이티브 코드 }
      // 1초 후 this.num*2와 함께 이행됨
      setTimeout(() => resolve(this.num * 2), 1000); // (**)
    }
  }

  new Promise((resolve) => resolve(1))
    .then((result) => {
      return new Thenable(result); // (*)
    })
    .then(console.log); // 1000밀리 초 후 2를 보여줌
}
