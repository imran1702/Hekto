import React, { useContext } from 'react'
import Container from './Container'
import { ApiData } from './ContextApi'

const Post = () => {
    let data = useContext(ApiData)
    console.log(data);

    return (
        <section>
            <Container>
                <div className="">
                    <div className="">
                        <h2>Ecommerce Acceories & Fashion item </h2>
                    </div>
                    <div className="">
                        <div className="">
                            <p>Per Page:</p>
                            <select name="" id="">
                                <option value="6">6</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <div className="">
                            <p>Sort By:</p>
                            <input type="text" />
                        </div>
                        <div className="">
                            <p>View:</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {data.map((item) => (
                        <div className="w-1/4 px-3">
                            <div className="">
                                <img src={item.image_path} alt="" />
                            </div>
                            <div className="">
                                <h4>{item.name}</h4>
                                <p>{item.discount_price} TK</p>
                                <p><s>{item.price}</s>TK</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Post