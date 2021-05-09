# musinsa-homework

## getting start

해당 프로젝트는 노드 패키지 매니저로 `yarn` 을 사용하였습니다.

`yarn` 대신 `npm` 이 설치되어 있을 시

```sh
$ npm install -g yarn
```

`brew` 가 설치되어 있을 시

```sh
$ brew install yarn
```

package.json 에 명시된 package를 설치 해줍니다.

```sh
$ yarn install
```

프로젝트를 실행합니다.

```sh
$ yarn start
```

브라우저를 열어 `localhost:3000` 주소로 실행합니다.

---

## stack

- Library : ReactJS (Create-React-App)
- Typesciprt
- Style : Styled-Components
- State Management : Redux(Redux-toolkit), fetchHooks

## library

reactjs 사용 가장 익숙한 라이브러리라 사용

## typescript

컴파일 단계에서 오류를 포착
명시적인 타입 지정은 개발자의 의도를 명확하게 코드로 기술

잘 알고 사용하지 않으면 보일러 플레이트만 늘어나는 단점도 있어 고민이지만

협업에 있어 좋은 효율을 경험하여 사용. 없으면 불안함

## styled-componenet

이전에는 주로 scss 모듈과 classnames 패키지를 활용하여 스타일시트를 따로 작성하여 사용했었으나
styled-componenet가 스타일 시트의 보일러 플레이트도 줄여주고
js 변수를 props로 전달받거나 바로 사용할 수 있다는 점에서 장점을 느껴서 사용함

## state

State Management : 항상 고민, 프로젝트의 상태 구조를 어떻게 만들 것인지 고민, 관리 방법 또한 고민
redux를 주로 쓰고 있지만, global 하게 쓰이는 state 이외에는 굳이 redux로 관리해야 하는가에 대한 고민이 항상 있음.
불필요한 api 호출을 줄이기 위해 대부분의 상태를 redux 로 관리하는 것도 나쁘지 않지만 구조를 잘 짜지 않으면 안된다고 생각함
그럴 바에는 hooks 로 관리하는 것이 오히려 가독성 및 관리가 좋음

redux를 사용할 때도 비동기 처리를 위한 미들웨어 선택에 고민이 많음
redux-toolkit 이 보일러 플레이트를 많이 줄여줘서 사용하게됨
특히 타입스크립트를 같이 사용하면 보일러 플레이트가 배가되서 ㅠㅠ

## inifinite scroll

- 보통은 라이브러리 사용
- IntersectionObserver 사용해서 hooks 로 만들어봄
- scroll event listner 가 계속 호출되는게 성능 낭비인듯 싶음
