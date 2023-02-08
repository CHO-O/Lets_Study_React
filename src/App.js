import React, { useState, useRef, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App(){
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    //user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id가 id인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(
      users.map(user => user.id === id ? { ...user, active: !user.active } : user )
    ); //map으로 배열의 불변성을 유지하며 배열 업데이트
  }; //id값을 비교해서 같을 때 active값을 반전해 배열 업데이트 : 다를 때 그대로 유지

  const count = useMemo(() => countActiveUsers(users), [users]);
  //useMemo(어떻게 연산할지 정의하는 함수, deps배열)
  //deps배열 안의 내용이 바뀌면 등록한 함수를 호출해 값을 연산, 바뀌지 않았으면 이전 연산값 재사용
  //input값이 바뀔 때도 countActiveUsers가 호출되는 현상을 막아줌 (users의 변화에만 호출되도록)

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> 
      {/* UserList 컴포넌트에게 함수를 전달하는 명령어 */}
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;