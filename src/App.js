import React, { useReducer, useRef, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
} //active값이 true인 사용자의 수를 세었음

const initialState ={
  users: [
    {
      id:1,
      username: 'qwer',
      email: 'qwer@gmail.com',
      active: true
    },
    {
      id:2,
      username: 'asdf',
      email: 'asdf@gamil.com',
      active: false
    },
    {
      id:3,
      username: 'zxcv',
      email: 'zxcv@gmail.com',
      active: false
    }
  ]
};
//사용할 초기 상태를 컴포넌트 바깥으로 분리하고 App 내부의 로직들을 모두 제거함
//변화된 부분은 깃헙에서 비교해볼 것

function reducer(state, action){
  switch (action.type){
    case 'CREATE_USER':
      return{
        users: state.users.concat(action.user)
      };
    //4. onCreate(배열에 항목 추가하는 로직)구현. 
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    //5. onToggle(id값을 비교해 id가 같으면 active를 반전시키도록. 눌렀을때 색 바뀌는 로직) 구현
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    //6. onRemove(user.id가 파라미터로 일치하지 않는 원소만 추출 = id인 것을 삭제) 구현.
    default:
      return state;
  }
}
//1. reducer함수의 틀 만듬

export const UserDispatch = React.createContext(null);
//const UserDispatch = createContext()함수는 Context를 만드는 함수. 
//파라미터에는 Context의 기본값을 설정 가능
//export ~ React.는 내보내주는 작업
//내보냈기 때문에 나중에 사용하고 싶을 때 import { UserDispatch } from './App';으로 불러올 수 있음

function App(){

  //Context로 돌릴거니까 useinputs관련 싹다 지우기

  const [state, dispatch] = useReducer(reducer, initialState);
 
  //useRef 이용한 nextId도 Createuser로 넘길거니까 지워버리기

  const { users } = state;

  //Context를 구현했으니 onToggle과 onRemove를 지웠음. UserList에서도 지우러 갈거임
  //onCreat도 지워버렸음. 이제 CreateUser.js로 갑시다

  const count = useMemo(() => countActiveUsers(users), [users]);
  //7. 활성 사용자 수 구하기 구현
  //   useMemo를 썼던 이유? input값이 바뀔 때도 쓸데없이 리렌더링돼서. 방지하려고.
  //   useReducer 사용해서 구현하고 나니까 제대로 작동하지 않음. 자꾸 리렌더링 됨.
  //   도저히 이유를 모르겠음!!!!!!!!!!!!!!!! 

  return (
    <UserDispatch.Provider value={dispatch}> 
      <CreateUser /> {/* context쓰러 넘어갑시다 */}
      <UserList users={users} /> {/* UserList 컴포넌트에게 함수를 전달해주기 */}
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

//Context안에는 Provider라는 컴포넌트가 들어있음
//이 컴포넌트를 통해 Context의 값을 정할 수 있으며, 사용할 때 value값을 설정해주면 된다
//지금 공유하길 원하는 데이터의 초깃값은 dispatch가 되는 것
//Provider에 의해 감싸진 컴포넌트 중 어디서든 Context의 값을 다른 곳에서 바로 조쇠해서 사용할 수 있음

//+CreateUser 에게는 아무 props 도 전달하지 마세요.
//CreateUser 컴포넌트 내부에서 useInputs 를 사용하세요.
//useRef 를 사용한 nextId 값을 CreateUser 에서 관리하세요.

export default App;