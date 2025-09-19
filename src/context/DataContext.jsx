import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availability, setAvailability] = useState(() => {
      return JSON.parse(localStorage.getItem('productAvailability') || '{}');
    });

    useEffect(() => {
        fetchAllProducts();
    }, []);

    //fetching all products from Firestore
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            // Get products from Firestore
            const productsSnapshot = await getDocs(collection(db, "products"));
            const productsData = productsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                available: availability[doc.id] !== undefined ? availability[doc.id] : true
            }));
            
            // Get categories from Firestore
            const categoriesSnapshot = await getDocs(collection(db, "categories"));
            const categoriesData = categoriesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setData(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    // Admin: toggle product availability
    const toggleProductAvailability = (productId) => {
      setData(prevData => prevData.map(product =>
        product.id === productId ? { ...product, available: !product.available } : product
      ));
      setAvailability(prev => {
        const updated = { ...prev, [productId]: !prev[productId] };
        localStorage.setItem('productAvailability', JSON.stringify(updated));
        return updated;
      });
    };

      const getUniqueCategory=(data,property)=>{
        let newVal=data?.map((curElem)=>{
          return curElem[property]
        })
        newVal=["All",...new Set(newVal)]
        return newVal
      }
    
      const categoryOnlyData=getUniqueCategory(data,"category")
      const brandOnlyData=getUniqueCategory(data,"brand")
      
    return (
        <DataContext.Provider 
            value={{
                data,
                loading,
                categories,
                categoryOnlyData,
                brandOnlyData,
                toggleProductAvailability,
                fetchAllProducts
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export const getData=()=>useContext(DataContext)
