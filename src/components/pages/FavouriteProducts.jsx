import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../Container';
import { IoMdClose } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, clearFavItem, favItemRemove } from '../slices/productSlice';

const FavouriteProducts = () => {
    let data = useSelector((item)=>item.product.favouriteItem)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    
    let handleFavToCart = (item)=>{
        navigate("/cart")
        dispatch(addToCart({...item, qun:1}))
    }
  return (
    <section>
        <Container>
            {data.length > 0 ?
             <div className='w-full pb-12 lg:pb-0'>
                <div className="">
                    <h2 className='text-[#1D3178] text-[28px] font-jose'>My Favourite items</h2>
                </div>
              <table className='w-full'>
                  <thead>
                    <tr>    
                      <th className='text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin'>Product</th>
                      <th className='text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8'>Price</th>
                      <th className='text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8'>Status</th>
                      <th className='text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8'>Action</th>
                      <th className='text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8'>Remove</th>
                    </tr>
                  </thead>
                <tbody>
                  {data.map((item, i)=>(
                    <tr className='border-b-2 border-[#E1E1E4]'>
                        <Link to={`/products/${item.id}`}>
                        <th className='text-start text-[#1D3178] text-[14px] font-medium font-josefin py-4'>
                            <div className='flex items-center gap-x-2 sm:gap-x-4'>
                            <div className='relative'>
                                <img src={item.image_path} alt="" className='h-10 w-12 sm:h-25 sm:w-30' />
                                <div onClick={()=>dispatch(favItemRemove(i))} className='absolute top-[-8px] right-[-8px]'>
                                <IoMdClose
                                    className='bg-white rounded-full text-lg sm:text-2xl p-[2px] sm:p-[4px] font-bold cursor-pointer border border-[#0000002e] hover:text-red-600'
                                />
                                </div>
                            </div>
                            <div>
                                <h2 className='font-bold font-josefin text-[#000] pb-1 sm:pb-2 text-[8px] sm:text-[16px]'>{item.name}</h2>
                                <p className='font-medium font-josefin text-[#A1A8C1] pb-1 sm:pb-2 text-[8px] sm:text-[14px]'>Finish: {item.finish}</p>
                                <p className='font-medium font-josefin text-[#A1A8C1] text-[8px] sm:text-[14px]'>Wood Type: {item.wood_type}</p>
                            </div>
                            </div>
                        </th>
                        </Link>
                      <th className='text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8'>
                        <p>{item.discount_price} TK</p>
                      </th>
                      <th className='text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8'>
                        <div className='flex items-center gap-x-2'>
                          <p className='capitalize'>{item.status}</p>
                        </div>
                      </th>
                      <th className='text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8'>
                       <p onClick={()=>handleFavToCart(item)} className='cursor-pointer'>Add To Cart</p>
                      </th>
                      <th className='text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8'>
                       <RiDeleteBin6Line onClick={()=>dispatch(favItemRemove(i))} className='cursor-pointer' />
                      </th>
                    </tr>
                ))}
                </tbody>
              </table>
          
                <div className='flex justify-between items-center pt-8'>
                  <div>
                      <Link to={"/products"} className='text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-8 py-2 text-white cursor-pointer inline-block'>
                      Update Wishlist
                    </Link>
                  </div>
                  <div>
                      <button onClick={()=>dispatch(clearFavItem())} className='text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-8 py-2 text-white cursor-pointer'>
                      Clear Wishlist
                      </button>
                  </div>
                </div>
             
            </div>
            :
            <div className="">
                <h1>You have no favourite item</h1>
            </div>
            }
        </Container>
    </section>
  )
}

export default FavouriteProducts