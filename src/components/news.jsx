import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from './Loader'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        console.log("Welcome to constructor")
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async UpadateNews(PageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily Spark`
    }

    async componentDidMount() {
        this.UpadateNews(this.state.page);
    }

    fetchMoreData = async (PageNo) => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles.concat(this.state.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    render() {
        console.log("Welcome to Render")
        return (
            <div className='container news-headline'>
                <h1 className='text-center'>Today's Top Headlines About - {this.capitalizeFirstLetter(this.props.category)}</h1>
                {/* {this.state.loading && <Loader />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>}
                >
                    <div className="container">
                    <div className="row my-3">
                        {this.state.articles.map(
                            (element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }

                        )}
                    </div>
                    </div>
                </InfiniteScroll>

            </div>
        )
    }
}

export default News