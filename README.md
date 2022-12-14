# Todo List with React

드래그 앤 드랍이 가능한 Todo List 입니다.

## 📎 배포 링크

[바로 가기](https://react-todo-eight-taupe.vercel.app/)

## ⚙️ 실행 방법

```
# 실행 전 패키지를 설치합니다.
npm install

# 서버를 실행합니다.
npm start
```

## 📝 주요 기능

### Todo 카테고리 생성 및 드래그 앤 드랍
![카테고리 생성](https://user-images.githubusercontent.com/71388830/207626662-1a4e0253-a177-4430-b173-a2aa7e373875.gif)
카테고리를 사용자가 직접 추가할 수 있게 만들었고 카테고리의 순서 또한 임의로 드래그앤드랍하여 수정할 수 있습니다. 카테고리 생성 시 중복된 카테고리는 유효성 검증을 통과하지 못하고 사용자에게 피드백을 줬습니다.

### 카테고리 삭제
![카테고리 삭제](https://user-images.githubusercontent.com/71388830/207626985-bf7827f0-458b-4912-ad65-effb93d4e7b8.gif)
카테고리의 왼쪽 위 x 버튼을 클릭하여 생성한 카테고리를 삭제할 수 있게 했습니다.

### 카테고리 별 카드 생성 및 드래그 앤 드랍
![카드 생성](https://user-images.githubusercontent.com/71388830/207626680-5b6431f5-00d0-4269-af2f-209f784e5a84.gif)
카테고리 별 세부 카드를 작성할 수 있습니다. 카테고리 내에서 드래그 앤 드랍으로 순서를 변경할 수 있으며 다른 카테고리로 카드를 옮길수 있게 했습니다.

### 카드 삭제
![카드 삭제](https://user-images.githubusercontent.com/71388830/207627075-c6d21fb9-3746-4458-b06d-e181d66f6e52.gif)
카드를 쓰레기통으로 드래그 앤 드랍하면 삭제할 수 있습니다. 드래그시 쓰레기통이 확대됨과 동시에 흔들리는 애니메이션으로 삭제되는 느낌을 줬습니다.

### 내용 저장
![내용 저장](https://user-images.githubusercontent.com/71388830/207627101-db062bb1-90a5-45a1-b1cd-9461f6ca6efc.gif)
recoil의 atom effect를 통해 데이터가 로컬 스토리지에 저장됩니다. 이를 통해 창을 껐다 키더라도 데이터가 유지됩니다.

## 🤔 문제 / 고민 했던 점

### 숫자로 시작하는 카테고리 이름
카테고리와 카드의 데이터는 객체에 key 값으로 카테고리 이름을, value 값으로 카드의 id와 내용을 가진 객체 배열로 저장됩니다.
카테고리 드래그 앤 드랍의 경우 `Object.keys()`를 사용하여 카테고리 이름(key)만 배열로 따로 빼온 뒤, `splice()`를 통해 배열의 위치를 바꾸고, `Object.assign()`을 통해 key-value 값을 다시 설정해 주는 방법을 택했습니다.

https://github.com/dldnjswns31/React-Todo/blob/556ae9fedf511821391d37453956c9d7601688be/src/App.tsx#L33-L49

하지만 객체의 경우 순서가 보장되지 않는 데이터 구조이기 때문에 카테고리 시작 이름이 숫자일 경우 사용자가 드래그 앤 드랍으로 수정한 카테고리 순서가 적용되지 않는 문제점이 있었습니다.

현재 카테고리 생성 시 유효성 검사를 통해 카테고리 이름이 숫자로 시작할 경우 생성을 막는 방법으로 해결했습니다.


## 📚 stack

Frontend : React, Recoil, TypeScript, styled-components, react-beautiful-dnd, react-hook-form
