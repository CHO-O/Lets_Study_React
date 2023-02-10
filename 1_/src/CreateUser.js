import React, { useRef, useContext } from "react";
import useInputs from './hooks/useInputs';
import { UserDispatch } from "./App";
//Context사용과 useinputs사용, nextId관리를 위해 가져오자

const CreateUser = () => {
    const [{ username, email }, onChange, reset] = useInputs({
        username: '',
        email: ''
    });

    const nextId = useRef(4);
    const dispatch = useContext(UserDispatch);

    const onCreate = () => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current += 1;
    };
    //기존에 App쪽에 있던걸 통째로 옮겨왔네

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);

//function -> const, = =>
//CreateUser -> React.memo(CreateUser) 
//React.memo(컴포넌트의 props가 바뀌지 않았다면 리렌더링을 방지해 최적화를 해주는 함수)로 감싸주기만 하면 끝 