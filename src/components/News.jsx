import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    const updateNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1b0c0f70c3914cc594b00380a34382b9&page=${page}&pageSize=${props.pageSize}`
      setLoading(true)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false)
    };

    useEffect(()=>{
      updateNews();
      document.title = `${capitalizeFirstLetter(props.category )} - Daily News`;
  
    },[])
    
    const fetchMoreData = async () => {   
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1b0c0f70c3914cc594b00380a34382b9&page=${page}&pageSize=${props.pageSize}`
        setPage(page + 1 );    
        setLoading(true);
          let data = await fetch(url);
          let parsedData = await data.json();
          // console.log(parsedData);

        setArticles( articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
      }
      
    return (
      <div className="container my-3">
        <h2
          className=" fs-1 text-center"
          style={{ margin: "50px 0", fontWeight: "bold" , marginTop: "90px"}}
>
          Daily News - Top {capitalizeFirstLetter(props.category)}'s Headlines
        </h2>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          >
          {loading && <Spinner/>}
          <div className="row">
            {articles.map((elem) => {return (<div className="col-md-4" key={elem.url}>
                  <NewsItem
                    title={elem.title}
                    description={elem.description}
                    imageUrl={elem.urlToImage}
                    newsUrl={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.PropTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
