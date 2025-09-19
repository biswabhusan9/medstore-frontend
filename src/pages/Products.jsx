import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from '../assets/notfound.json'
import MobileFilter from '../components/MobileFilter'

const Products = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const medicineRef = collection(db, 'medicine');
        const snapshot = await getDocs(medicineRef);

        if (snapshot.empty) {
          console.log('Medicine collection is empty');
          setProducts([]);
          setLoading(false);
          return;
        }

        const productsData = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Document data:', data);
          return {
            id: doc.id,
            ...data
          };
        });

        console.log('Final products data:', productsData);
        if (productsData.length > 0) {
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectPage) => {
    setPage(selectPage)
    window.scrollTo(0, 0)
  }

  const filteredData = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || item.category === category) &&
      item.price >= priceRange[0] && item.price <= priceRange[1]
    )
    .sort((a, b) => {
      // Sort by stock status first (in stock items first)
      if ((a.stock > 0) && !(b.stock > 0)) return -1;
      if (!(a.stock > 0) && (b.stock > 0)) return 1;
      return 0;
    });

  const dynamicPage = Math.max(1, Math.ceil(filteredData.length / 8))
  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
        />
        {
          loading ? (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm' />
              </video>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className='flex gap-8'>
                <div className="hidden md:block w-[250px] flex-shrink-0">
                  <FilterSection
                    search={search}
                    setSearch={setSearch}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    category={category}
                    setCategory={setCategory}
                    handleCategoryChange={handleCategoryChange}
                  />
                </div>

                {
                  filteredData?.length > 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10'>
                        {
                          filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCard key={index} product={product} />
                          })
                        }
                      </div>
                      <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                    </div>
                  ) : (
                    <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                      <Lottie animationData={notfound} classID='w-[500px]' />
                    </div>
                  )
                }


              </div>

            </>
          ) : (
            <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
              <Lottie animationData={notfound} classID='w-[500px]' />
            </div>
          )}
      </div>
    </div>
  )
}

export default Products
