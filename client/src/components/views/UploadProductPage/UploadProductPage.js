import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'; //'@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key: 1, value: "Africa"},
    {key: 2, value: "Europe"},
    {key: 3, value: "Asia"},
    {key: 4, value: "North America"},
    {key: 5, value: "South America"},
    {key: 6, value: "Australia"},
    {key: 7, value: "Antarctica"}
]

function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price,setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Image, setImage] = useState([])
    
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value) //이벤트가 일어날 때마다 description state를 바꿔주면 됨
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => { //옵션들이 변화될 때 옵션의 벨류가 바뀔 수 있게 해줌
        setContinent(event.currentTarget.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {/* <Title level={2}> 여행 상품 업로드</Title> */}
                <h2> 여행 상품 업로드</h2>
            </div>

            <Form>
                {/* DropZone */}
                <br />
                <br />
                <label>이름</label>
                {/* 이벤트가 일어날 때 마다, 타이핑을 할 때마다 벨류를 바꿔줘야 함 */}
                {/* 하드코딩하면 안 되고, 이거를 다이나믹하게 해줘야 함. state을 넣어줘야 됨 */}
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>         
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>  
                <br />
                <br />
                <Button>
                    확인
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
