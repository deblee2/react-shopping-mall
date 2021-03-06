import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

// continents 들을 list라는 props로 넣어줬잖아
function CheckBox(props) {

    // 누르는 것마다 index가 저장됨
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        // 누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(value)

        // 전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
        const newChecked = [...Checked] //spread operator syntax
         // State 넣어준다
        if (currentIndex === -1) {
            newChecked.push(value)
        // 빼주고
        } else {
            newChecked.splice(currentIndex, 1) //이 값이 newChecked에서 지워지게 됨
        }
        setChecked(newChecked)
        props.handleFilters(newChecked) // 부모 컴포넌트에 전달해주는 것까지
    }

    const renderCheckboxLists = ( ) => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
        </React.Fragment>
    ))


    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="This is panel header 1" key="1">

                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
