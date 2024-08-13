import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
 
  constructor(){
    super();
    console.log("Hello const");
    this.state ={
      articles:[],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let date=new Date()
    console.log(date)
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-13&sortBy=publishedAt&apiKey=bc49307bb7a6400b85033ebad6a7136c&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,totalResults: parsedData.articles,loading : false})
  }
  handleNextClick = async ()=>{
    console.log("Next");
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-13&sortBy=publishedAt&apiKey=bc49307bb7a6400b85033ebad6a7136c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handlePrevClick = async()=>{
    console.log("Prev")
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-13&sortBy=publishedAt&apiKey=bc49307bb7a6400b85033ebad6a7136c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Monkey -Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element,i)=>{
            return <div className='col-md-4 ' key={i} >
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}></NewsItem>
          </div>
          })}
          

        </div>
        <div className="container d-flex justify-content-between">
          <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
      
    )
  }
}

export default News
