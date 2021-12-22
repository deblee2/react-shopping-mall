import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'; //'@ant-design/icons';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

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

// 이게 auth.js의 자식 컴포넌트가 된 것
function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price,setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    // const updateImages = (newImages)에서 받아온 걸 여기서 저장
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

    const updateImages = (newImages) => { // 여기서 받아온 이미지를 위의 const[Images,]에 넣어줌
        setImage(newImages) //??
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // 모든 state이 채워지지 않으면
        if (!Title || !Description || !Price || !Continent || !Image) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = { 
            // 로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Image,
            continents: Continent
        }

        // 모든 정보들을 backend로 보냄
        Axios.post("/api/product", body)
            //백엔드에서 모든걸 처리하고 난 이후에 결과값을 response 변수에 넣어줌
            .then(response => {
                if(response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    // 저절로 페이지가 landing page로 가게 하고싶음
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
        }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {/* <Title level={2}> 여행 상품 업로드</Title> */}
                <h2> 여행 상품 업로드</h2>
            </div>

            <Form onSubmit={ submitHandler }>
                {/* DropZone */}

                {/* props을 준다 */}
                {/* 이 prop을 FileUpload 컴포넌트에 전달해준다 */}
                {/* 이미지를 삭제하고 변경할 때마다 부모 컴포넌트로 변화들이 전달돼서
                setImages로 와서 line 25의 Images가 FileUpload 안의 Images와 같게 됨  */}
                <FileUpload refreshFunction={updateImages} />
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
                {/* <Button>
                    확인
                </Button> */}
                <Button htmlType="submit">Submit</Button>
            </Form>

        </div>
    )
}

export default UploadProductPage
