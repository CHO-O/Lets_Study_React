import React from 'react'; //리액트 컴포넌트를 만들 때 리액트를 불러와야 함

function Hello({ color, name, isSpecial }){
    return (
    <div style={{ color }}>
        { isSpecial && <b>*</b>}
        {/* 조건 ? true : false 삼항연산자 */}
        {/* &&(AND)를 써서 간단히 표현 */}
        안녕하세요 {name}
    </div>
    )
    // props는 객체 형태로 전달되었음.
    // 비구조화 할당 다시 한번 익히기
}

Hello.defaultProps = {
    name: '이름없음'
} //컴포넌트에 props를 지정하지 않았을 때 쓰일 기본값

export default Hello; //Hello라는 컴포넌트를 내보내겠다 > 다른 컴포넌트에서 불러와서 사용 가능