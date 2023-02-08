import React from "react";

const CreateUser = ({ username, email, onChange, onCreate }) => {
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