import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_LINK;
const CategoryHighlights = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const { data } = await axios.get(`${API_URL}/categories/highlights`);
      setHighlights(data);
    };
    fetchHighlights();
  }, []);

  return (
    <div className="my-4 px-4">
      <h2 className="text-xl font-semibold mb-2">Category Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(highlights) &&
          highlights.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold text-lg">{item.category}</h3>
              <p className="text-sm text-gray-700 mt-1">{item.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryHighlights;
