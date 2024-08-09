import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class news extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    console.log("Welcome to Constructor")
  }
  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async UpdateNews(PageNo) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let prassedData = await data.json()
    console.log(prassedData)
    this.setState({
      articles: prassedData.articles,
      totalResults: prassedData.totalResults,
      loading: false
    });
    document.title = `${this.capitalizeFirstletter(this.props.category)} - Daily Spark`
  }

  async componentDidMount() {
    this.UpdateNews(this.state.page)
  }

  handlePreviousPage = async () => {
    console.log("Previous");
    this.setState(
      { page: this.page - 1 },
      () => { this.UpdateNews(this.state.page) })
  }


  handleNextPage = async () => {
    console.log("Next")
    this.setState(
      { page: this.page - 1 },
      () => { this.UpdateNews(this.state.page) })

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    let data = await fetch(url);
    let prassedData = await data.json()
    console.log(prassedData)
    this.setState({
      articles: prassedData.articles,
      totalResults: prassedData.totalResults,
      loading: false
    });

  };
  render() {
    console.log("Welcome to Constructor")
    return (
      <div className='container news-headline'>

        <h1>Today's Top Headline About${this.capitalizeFirstletter(this.props.category)} - Daily Spark</h1>

        {/* {this.state.loading && <Loader/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >

          <div className="container">
            <div className='row'>
              {this.state.articles.map(
                (element) => {
                  return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 80) : " "} description={element.description ? element.description.slice(0, 60) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
