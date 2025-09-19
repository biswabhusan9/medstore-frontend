import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

const FilterSection = ({search, setSearch, setCategory, priceRange, setPriceRange, category, handleCategoryChange}) => {
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoryData = snapshot.docs.map(doc => doc.data().name);
        setCategories(['All', ...categoryData]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
      <input 
        type='text' 
        placeholder='Search..'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
      />

      {/* category selection */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {categories.map((item, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <input 
              type='radio'
              name="category"
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
              className='cursor-pointer'
            />
            <label className='cursor-pointer uppercase'>{item}</label>
          </div>
        ))}
      </div>

      {/* price range */}
      <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
      <div className='flex flex-col gap-2'>
        <label>Price: ${priceRange[0]} - ${priceRange[1]}</label>
        <input 
          type='range' 
          min='0' 
          max='5000'
          value={priceRange[1]}
          onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])}
          className='transition-all'
        />
      </div>

      <button 
        className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
        onClick={()=>{
          setSearch('');
          setCategory('All');
          setPriceRange([0,5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterSection