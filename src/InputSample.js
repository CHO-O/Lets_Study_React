import React, { useState, useRef } from "react";

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    //const [text, setText] = useState(''); //기본값 ''
    const nameInput = useRef(); //Ref 객체를 만들었음

    const { name, nickname } = inputs;

    const onChange = (e) => { 
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        //setText(e.target.value); //이벤트 객체 e를 파라미터로 받아옴
        /* e.target은 이벤트가 발생한 input DOM
           e.target.value는 그 DOM의 값. 얘를 조회해서 현재 input에 뭔 값이 있는지 보는거 */
    };

    const onReset = () => {
        //setText('');
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus(); 
    };

    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name}({nickname})
            </div>
        </div>
        // <div>
        //     <input onChange={onChange} value={text} />
        //     <button onClick={onReset}>초기화</button>
        //     <div>
        //         <b>값: {text}</b>
        //     </div>
        // </div>
    );
}

export default InputSample;