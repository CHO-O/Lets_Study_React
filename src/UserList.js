import React, { useContext } from "react"; // useContext라는 Hook으로 만든 context를 조회
import { UserDispatch } from "./App"; //아까 App에서 내보냈던거 가져옴

const User = React.memo(function User({ user }) {
    const dispatch = useContext(UserDispatch); //가져왔따

    return(
        <div>
            <b 
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => {
                    dispatch({ type: 'TOGGLE_USER', id: user.id }); //onToggle이었던것
                }} 
            > {user.username}</b>
            &nbsp; {/*공백문자*/}
            <span>({user.email})</span>
            <button onClick={() => {
                dispatch({ type: 'REMOVE_USER', id: user.id }); //onRemove이었던것
            }}>삭제</button>
        </div>
    );
});

function UserList({ users }) { //UserList 컴포넌트가 받아온 함수들
    return (
        <div>
            {users.map(user => (
                <User 
                    user={user} 
                    key={user.id} 
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);

//현재 UserList 컴포넌트는 App 컴포넌트에서 구현된 onToggle, onRemove를 User컴포넌트에게 전달하는
//중간다리 역할만 하고 있음
//Context API와 Dispatch를 이용하면 이 복잡한 구조를 해결할 수 있음