// import React, { useReducer } from "react";

// function reducer(state, action){
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }

// function Counter(){
//     const [number, dispatch] = useReducer(reducer, 0);
//     //useReducer의 기본 형태
//     //const [state, dispatch] = useReducer(reducer, initialState);

//     const onIncrease = () => {
//         dispatch({ type: 'INCREMENT'});
//     }

//     const onDecrease = () => {
//         dispatch({ type: 'DECREMENT'});
//     }

//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     );
// }

// export default Counter;

//함수형 컴포넌트 연습하기~

import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { //클래스형 컴포넌트에서의 상태. constructor안에 this.state를 설정하기
            counter: 0
        };
    //     this.handleIncrease = this.handleIncrease.bind(this);
    //     this.handleDecrease = this.handleDecrease.bind(this);
    }
    //메서드들을 각 button들의 이벤트로 등록하는 과정에서 
    //메서드와 컴포넌트 인스턴스 간의 관계가 끊겨 
    //this가 컴포넌트 인스턴스를 가르키지 않게 되어버려서 
    //클래스 생성자 메서드 constructor에서 bind 작업을 해줌. (가장 일반적인 방법, 다른방법은 화살표함수문법)

    handleIncrease = () => { //화살표 함수 문법으로 해결한 경우
        this.setState({ //상태를 업데이트 하려면 this.setstate 함수 사용
            counter: this.state.counter + 1
        });
        console.log('increase');
        console.log(this);
    }

    handleDecrease = () => {
        this.setState({
            counter: this.state.counter - 1
        }); 
        console.log('decrease');
        console.log(this);
    }

    //handle어쩌구는 클래스 내부에 종속된 함수인 '메서드'
    //클래스형 컴포넌트에서는 보통 이렇게 커스텀메서드를 선언함

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
            </div>
        );
    }
}

export default Counter;

//클래스형 컴포넌트는 많이 쓰진 않겠지만, 알아는 둘 것