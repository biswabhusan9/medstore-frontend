import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(() => {
    // Initialize from cache if available
    const cached = localStorage.getItem('categories');
    return cached ? JSON.parse(cached) : [];
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoryData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (categoryData.length > 0) {
          localStorage.setItem('categories', JSON.stringify(categoryData));
          setCategories(categoryData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='bg-[#101829] py-12'>
        <div className='max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4'>
          {
            categories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => navigate(`/category/${category.name}`)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className='text-[10px] uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md'
                >
                  {category.name}
                </button>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Category