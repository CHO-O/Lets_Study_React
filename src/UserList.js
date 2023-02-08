import React, { useEffect } from "react";

const User = React.memo(function User({ user , onRemove , onToggle }) {
    return(
        <div>
            <b 
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)} //클릭시, onToggle에 id를 넣어서 호출함
            > {user.username}</b>
            &nbsp; {/*공백문자*/}
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
});

function UserList({ users, onRemove, onToggle}) { //UserList 컴포넌트가 받아온 함수들
    return (
        <div>
            {users.map(user => (
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove}
                    onToggle={onToggle} // User에게 전달하였음
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);
