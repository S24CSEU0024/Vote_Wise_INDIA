import { useEffect, useState } from "react";
import axios from "axios";

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:8000/api/news")
      .then(res => {

        setNews(res.data);

      })
      .catch(err => {

        console.error(err);

      });

  }, []);


  return (

    <div className="page">

      <h1>📰 Political News</h1>

      <div className="cards">

        {news.map(item => (

          <div
            className="data-card"
            key={item._id}
          >

            <h2>
              {item.title}
            </h2>

            <p>
              {item.description}
            </p>

            {item.source && (

              <small>
                Source: {item.source}
              </small>

            )}

          </div>

        ))}

      </div>

    </div>

  );
}

export default News;