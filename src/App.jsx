import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import axios from 'axios';

function App() {

  const [data,setData ] = useState([]);
  const [error,setError] = useState({});

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data)
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData()
  },[])
  

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
   



    return (
      <>
<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-5 bg-gray-500">
  {data.map((item) => (
    <Card
      key={item.id}
      className="max-w-sm bg-white shadow-md rounded-lg border border-gray-200"
    >
      <CardHeader className="p-4 border-b border-gray-300">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-4 flex justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="h-48 object-contain w-full max-w-full"
          />
        </div>
        <CardDescription className="text-gray-600 text-sm">
          {item.description.length > 100
            ? `${item.description.slice(0, 100)}...`
            : item.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t border-gray-300 bg-gray-50">
        <CardDescription className="text-sm font-medium text-gray-500">
          {item.category}
        </CardDescription>
        <CardDescription className="text-lg font-bold text-green-600">
          ${item.price.toFixed(2)}
        </CardDescription>
      </CardFooter>
    </Card>
  ))}
</div>


        </>
    )
  
}

export default App
