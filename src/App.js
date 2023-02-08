import React, { useReducer, useRef, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
} //active값이 true인 사용자의 수를 세었음

const initialState ={
  inputs: {
    username: '',
    email: '',
  },
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
    case 'CHANGE_INPUT':
      return{
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    //3. onChange부분부터 구현. 'CHANGE_INPUT' 액션 객체를 이용해 inputs 상태를 업데이트 해줌
    //   reducer함수에서 새로운 상태 만들 때 불변성 지킬 것(spread)
    case 'CREATE_USER':
      return{
        inputs: initialState.inputs,
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

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;
  //2. useReducer의 기본 형태 작성 및
  //state에서 필요한 값들을 비구조화 할당 문법으로 추출해 각 컴포넌트들에게 전달함

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);
  //3. onChange 구현

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);
  //4. onCreate 구현

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);
  //5. onToggle 구현

  const onRemove = useCallback(id =>{ 
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
  //6. onRemove 구현

  const count = useMemo(() => countActiveUsers(users), [users]);
  //7. 활성 사용자 수 구하기 구현
  //   useMemo를 썼던 이유? input값이 바뀔 때도 쓸데없이 리렌더링돼서. 방지하려고.
  //   useReducer 사용해서 구현하고 나니까 제대로 작동하지 않음. 자꾸 리렌더링 됨.
  //   도저히 이유를 모르겠음!!!!!!!!!!!!!!!! 

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> 
      {/* UserList 컴포넌트에게 함수를 전달해주는 것 잊지 말기 */}
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;