// File upload component는 UploadProductPage 컴포넌트 아래에 있음
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload(props) {

    // Images를 UploadProductPage라는 부모 컴포넌트에 전달해야 함
    // 그래서 submit 버튼을 누를 때 이미지도 Server로 같이 갈 수 있게
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            // 어떤 파일인지에 대하여 content-type을 정의해줘서
            // 이 request를 받을 때 에러가 없이 받을 수 있게 해줌
            header: {'content-type': 'multipart/form-data'}
        }
        // 올리는 파일에 대한 정보 들어감
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            // 파일 저장, 정보 전달을 받음 프론트에서
            .then(response => {
                if(response.data.success) {
                    //console.log(response.data)
                    setImages([...Images, response.data.filePath])
                    // 이미지 state 변경
                    props.refreshFunction([...Images, response.data.filePath])
                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);

        // 이미지들 복사
        let newImages = [...Images]
        // 이미지 클릭 시 삭제
        newImages.splice(currentIndex, 1)
        //console.log('currentIndex', currentIndex)
        setImages(newImages)
        // 이미지 state 변경
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display:'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div 
                        style={{ 
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }}/>
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div onClick={ () => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
