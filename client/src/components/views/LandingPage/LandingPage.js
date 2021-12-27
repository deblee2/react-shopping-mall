import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from 'antd';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    //setProducts(response.data.productInfo)
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                } 
            })

    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}> 
        
            <Card
                key-={index}
                cover={<img style={{ width: '100', maxHeight: '150px' }} src={`http://localhost:5000/${product.images[0]}`} />}
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters } //continets array와 price array가 들어있음
        newFilters[category] = filters //continents 아니면 price에
    
        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div div style={{ textAlign: 'center'}}>
                <h2>Let's travel anywhere <Icon type="rocket" /></h2>
            </div>

            {/* Filter */}
        <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
            {/* CheckBox */}
                <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
            </Col>
            <Col lg={12} xs={24}>
                {/* RadioBox */}
                <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
            </Col>
        </Row>
            {/* Search */}

            {/* Cards */}

        <Row gutter={[16, 16]}>
            {renderCards}
        </Row>

            <div style={{ justifyContent: 'center' }}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
