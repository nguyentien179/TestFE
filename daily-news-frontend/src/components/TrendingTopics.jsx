import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_LINK;
const TrendingTopics = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await axios.get(`${API_URL}/articles/trending-tags`);
      setTags(data);
    };
    fetchTags();
  }, []);

  return (
    <div className="my-4 px-4">
      <h2 className="text-xl font-semibold mb-2">Trending Topics</h2>
      <div className="flex gap-2 overflow-x-auto">
        {Array.isArray(tags) &&
          tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
