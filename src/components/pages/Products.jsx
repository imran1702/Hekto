import React, { useContext, useEffect, useState } from 'react'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import Container from '../Container'
import Post from '../Post'
import { ApiData } from '../ContextApi'
import { useDispatch } from 'react-redux'

const Products = () => {
  let dispatch = useDispatch()
  let data = useContext(ApiData)
  let [cetegory, setCategory] = useState([])
  useEffect(()=>{
    setCategory([...new Set(data.map((item)=>item.category))])
  },[])
  
    let [perPage, setPerPage] = useState(12)
    let [currentPage, setCurrentPage] = useState(1)

    let lastPage = perPage * currentPage
    let firstPage = lastPage - perPage
    let allPage = data.slice(firstPage, lastPage)

     let pageNumber = []
    for (let i = 0; i < Math.ceil(data.length / perPage); i++) {
        pageNumber.push(i)
    }

    let prev = () => {
        if (currentPage > 1) {
            setCurrentPage((state) => state - 1)
        }
    }
    let next = () => {
        if (currentPage < pageNumber.length) {
            setCurrentPage((state) => state + 1)
        }
    }

  let handlePerPageChange = (e)=>{
    setPerPage(e.target.value)
  }

    let [filterProduct, setfilterProduct] = useState([])
  let handleChangeCategory = (e)=>{
    let filterCategoryProduct = data.filter((item)=>item.category === e.target.value)
    setfilterProduct(filterCategoryProduct);
  }
  

  return (
    <section>
      <Container>
        <div className="flex justify-between mb-5 items-center">
          <div className="font-jose text-[#151875] text-[22px]">
            <h2>Ecommerce Acceories & Fashion item </h2>
          </div>
            <div className="flex gap-3">
              <p>Per Page:</p>
              <select onChange={handlePerPageChange} name="" id="">
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="flex gap-3">
              <p>Sort By:</p>
              <select onChange={handleChangeCategory} className='capitalize' name="" id="">
                <option value="">All Product</option>
                {cetegory.map((categoryItem)=>(
                <option className='capitalize' value={categoryItem}>{categoryItem}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <p>View:</p>
              <div className="">
                <LuLayoutGrid />
                <LuList />
              </div>
            </div>
        </div>
        <Post allPage={allPage} pageNumber={pageNumber} prev={prev} next={next} currentPage={currentPage} filterProduct={filterProduct} />
      </Container>
    </section>
  )
}

export default Products