// import { useState, useCallback } from 'react';

// function useInputs(initialForm) {
//     const [form, setForm] = useState(initialForm);
//     //change
//     const onChange = useCallback(e => {
//         const { name, value } = e.target;
//         setForm(form => ({ ...form, [name]: value }));
//     }, []);
//     const reset = useCallback(() => setForm(initialForm), [initialForm]);

//     return [form, onChange, reset];
// }

// export default useInputs;

//input을 관리하는 hooks를 만들기
//Hooks들을 이용해 원하는 기능을 구현하고 컴포넌트에서 사용하고 싶은 값들을 반환할 것
//App.js에서 useReducer안의 inputs를 없애고 이에 관련된 작업들을 대체하기 위한 hooks

//+ useReducer 사용해서 구현해보기

import { useCallback, useReducer } from 'react';

function reducer(state, action){
    switch (action.type){
        case 'CHANGE':
            return {
                ...state, 
                [action.name]: action.value
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});
        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE', name, value });
    }, []);
    const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
    return [form, onChange, reset];
}

export default useInputs;

//1. useInputs에서 사용할 초기 상태를 컴포넌트 바깥으로 분리해줄 것
//2. reducer함수의 틀을 만들고, useReducer를 컴포넌트에서 사용해볼 것
//3. useReducer의 state에서 필요한 값들을 비구조화 할당 문법을 사용해 추출하고 각 컴포넌트에게 전달해주기

