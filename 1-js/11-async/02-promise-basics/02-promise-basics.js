// https://ko.javascript.info/promise-basics
"use strict";

// 1.
{
  // Promise(executor(resolve, reject))
  // resolve(value) — 일이 성공적으로 끝난 경우 그 결과를 나타내는 value와 함께 호출
  // reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출
  let promise = new Promise(function (resolve, reject) {
    // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

    // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 'done'이 됩니다.
    setTimeout(() => resolve("1. done!"), 1000);
  });

  // resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
  // .then의 첫 번째 인수는 프라미스가 이행되었을 때 실행되는 함수이고, 여기서 실행 결과를 받습니다.
  // .then의 두 번째 인수는 프라미스가 거부되었을 때 실행되는 함수이고, 여기서 에러를 받습니다.
  promise.then(
    (result) => console.log(result), // 1초 후 "done!"을 출력
    (error) => console.log(error) // 실행되지 않음
  );
}

// 2.
{
  // 작업이 성공적으로 처리된 경우만 다루고 싶다면 .then에 인수를 하나만 전달
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("2. done!"), 1000);
  });

  promise.then(console.log); // == result) => console.log(result)
}

// 3.
{
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("3. 에러 발생!")), 1000);
  });

  // reject 함수는 .then의 두 번째 함수를 실행합니다.
  promise.then(
    (result) => console.log(result), // 실행되지 않음
    (error) => console.log(error) // 1초 후 "Error: 에러 발생!"를 출력
  );
}

// 4.
{
  // 에러가 발생한 경우만 다루고 싶다면 .catch(errorHandlingFunction) 사용
  // catch(f)는 문법이 간결하다는 점만 빼고 .then(null,f)과 완벽하게 같음
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("4. 에러 발생!")), 1000);
  });

  // reject 함수는 .then의 두 번째 함수를 실행합니다.
  promise.catch(
    (error) => console.log(error) // 1초 후 "Error: 에러 발생!"를 출력
  ); // == promise.then(null, (error) => console.log(error))
}

// 5.
{
  // 프라미스가 처리되면(이행이나 거부) f가 항상 실행된다는 점에서 .finally(f) 호출은 .then(f, f)과 유사합니다.
  // 1. finally 핸들러엔 인수가 없습니다. finally에선 프라미스가 이행되었는지, 거부되었는지 알 수 없습니다.
  // finally에선 절차를 마무리하는 ‘보편적’ 동작을 수행하기 때문에 성공·실패 여부를 몰라도 됩니다.
  // 2. finally 핸들러는 자동으로 다음 핸들러에 결과와 에러를 전달합니다.
  // result가 finally를 거쳐 then까지 전달되는 것을 확인해봅시다.
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("5. 결과"), 2000);
  })
    .finally(() => console.log("5. 프라미스가 준비되었습니다."))
    .then((result) => console.log(result)); // <-- .then에서 result를 다룰 수 있음
}

// 6.
{
  // 프라미스에서 에러가 발생하고 이 에러가 finally를 거쳐 catch까지 전달되는 것을 확인
  new Promise((resolve, reject) => {
    throw new Error("6. 에러 발생");
  })
    .finally(() => console.log("6. 프라미스가 준비되었습니다."))
    .catch((err) => console.log(err)); // <-- .catch에서 에러 객체를 다룰 수 있음
}
