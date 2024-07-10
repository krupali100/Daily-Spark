import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';

export default class news extends Component {
   constructor() {
    super();
    this.state = {
      articles: [],
      loading:false,
      page: 1
    }
   }

   async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let prassedData = await data.json()
    console.log(prassedData)
    this.setState({articles:prassedData.articles,
      totalResults:prassedData.totalResults,
      loading:false
    });
   }

    handlePreviousPage = async() => {
      console.log("Previous")
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let prassedData = await data.json()
      console.log(prassedData)
      this.setState({articles:prassedData.articles,
        page: this.state.page + 1,
        loading:false
      });
    }

    handleNextPage = async() => {
      console.log("Next")
      if (this.state.page +1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dee054eb0f7742b785a70fd5bf1bf869&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let prassedData = await data.json()
        console.log(prassedData)
        this.setState({
          articles:prassedData.articles,
          page: this.state.page + 1,
          loading:false
        })  
      }
    }
  render() {
    return (
      <div className='container news-headline'>
        
        <h1>Today's Top Headline</h1> 
        
        {this.state.loading && <Loader/>}
        <div className='row'> 
          { ! this.state.loading && this.state.articles.map(
            (element) => {
              return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0,80) : " "} description={element.description ? element.description.slice(0,60) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
  
            }
          )}
        </div>
        <div className="d-flex justify-content-between my-3">
        <button type="button" className="btn btn-outline-info" disabled={this.state.page <= 1} onClick={this.handlePreviousPage}> &larr;Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} className="btn btn-outline-info" onClick={this.handleNextPage}>Next &rarr;</button>
        </div>
      </div>
          
    )
  }
}
