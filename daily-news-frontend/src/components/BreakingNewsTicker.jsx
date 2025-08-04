import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_LINK;
const BreakingNewsTicker = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/breaking-news`);
        setBreakingNews(res.data);
      } catch (err) {
        console.error("Failed to fetch breaking news:", err);
        setBreakingNews([]);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee">
        {Array.isArray(breakingNews) &&
          breakingNews.map((item, index) => (
            <span key={index} className="mx-4">
              {item.title}
            </span>
          ))}
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
