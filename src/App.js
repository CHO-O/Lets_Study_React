import React, { useState, useRef, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

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

function App(){
  return (
    <>
      <CreateUser />
      <UserList users={[]} /> 
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;