# musinsa-homework

## getting started

해당 프로젝트는 노드 패키지 매니저로 `yarn` 을 사용하였습니다.

`yarn` 대신 `npm` 이 설치되어 있을 시

```sh
$ npm install -g yarn
```

`macOS` && `homebrew` 가 설치되어 있을 시

```sh
$ brew install yarn
```

package를 설치 해줍니다.

```sh
$ yarn install
```

프로젝트를 실행합니다.

```sh
$ yarn start
```

브라우저를 열어 `localhost:3000` 주소로 실행합니다.

[netlify live demo](https://epic-hypatia-07ccd2.netlify.app/)

---

## stack

- Library : ReactJS (Create-React-App)
- Typesciprt
- Style : Styled-Components
- State Management : Redux(Redux-toolkit), hooks

### library

ReactJS (Create-React-App)를 사용하였습니다.

webpack 이나 babel 등 초기 설정의 복잡성을 줄이고 빠르게 프로젝트를 구성하기 위해 사용하였습니다.

### typescript

자바스크립트의 정적 타이핑과 에디터, 컴파일 단계서에 오류 확인, 개발자의 의도를 명확하게 코드를 통해 명확하게 기술 할 수 있는 장점을 가지고 있어 사용하였습니다.

제대로 활용하지 못하면 보일러 플레이트만 늘어나는 단점도 있어 고민이지만
협업에 있어 좋은 효율을 경험하여 사용하였습니다.

### styled-componenet

이전에는 주로 `scss` 모듈과 `classnames` 패키지를 활용하여 스타일시트를 따로 작성하여 사용했었으나
`styled-componenet`가 스타일 시트의 보일러 플레이트도 줄여주고
js 변수를 props로 전달받거나 바로 사용할 수 있다는 장점을 경험하여 사용하였습니다.

### state management

프론트엔드 개발자에게 상태 관리는 항상 고민인 부분입니다.

구조를 어떻게 만들 것인지, 이를 관리하기 위해 어떤 기술을 선택할 것인지 늘 고민입니다.

현재 저는 실무에서 redux를 주로 쓰고 있지만, 공통, 전역으로 쓰이는 상태 이외에는 대부분 hook을 사용하여 관리하려 하고 있습니다.

불필요한 api 호출을 줄이기 위해 대부분의 상태를 redux 로 관리하는 것도 나쁘지 않다고 생각하지만 상태구조를 잘 설계하지 않으면 오히려 복잡도가 올라간다고 생각합니다.

해당 프로젝트에서는 `redux-toolkit`을 사용하였고, 보일러 플레이트를 획기적으로 줄여주고, typescript를 잘 지원해 주어 사용하였습니다.

### inifinite scroll

우선 `react-infinite-scroll-component` 패키지를 통해 구현하였습니다.

직접 구현해 보려 자료를 찾아보던 중 `IntersectionObserver` API 와 `hooks` 를 조합해 개발해 보는 것이 흥미롭게 느껴져 추가로 구현하였습니다.

[http://localhost:3000/infinite](http://localhost:3000/infinite)

`/infinite` 에서 해당 기술을 사용해 구현하였습니다.

### etc

filter가 존재하는 리스트를 구현 할 때 주로 api 요청에 filter query를 함께 요청하는 방식을 사용해 왔습니다.

하여 `tvSeries`의 존재유무에 관한 `filtering parameter`가 api 문서에 제공되어 있지 않아 당황했습니다.

과제를 수행하며 infinite scroll의 특성과 과제의 조건에 대해 고민하였고, 불러온 데이터 내에서 filtering 하는 방식을 사용하여 개발하였습니다.

요청에 filtering parameter를 함께 요청하면 유저가 infinite scroll에 가지고 있는 사용자경험과는 다른 데이터를 보여 주는 경우가 생기기에 해당 방식(불러온 데이터 내에서 filtering)이 적합하다 판단하였습니다.

다중 조건에서의 filtering에 대해 고민이 들었습니다.
위에서와 마찬가지로 filtering parameter를 api에 호출하여 사용해 왔기에 큰 고민없이 개발 해 왔었습니다.
헌데 프론트 내에서 다중 조건 filter를 구현하는 것이 쉽게 떠오르지 않았습니다.
현재 구현한 방법이 잘 작동하고 있는 것은 같으나, 좋은 방식인가 하는 점에서는 고민이 드는 지점입니다.
