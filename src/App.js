import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from '../src/component/pagination/pagination';
import PopUp from './component/popUp/popUp';
import Input from './component/input/input';
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageId: 1,
      data: [],
      popUpData: [],
      laoding: false,
      search: '',
      showPopUp: false,
      total_pages: 0,
    }
    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  togglePopUp = (data) => {
    this.setState({
      popUpData: data,
      showPopUp: !this.state.showPopUp,
    });
  }

  changeHandler(event) {
    this.setState({
      search: event.target.value,
    });
  }

  getData(page) {
    this.setState({
      laoding: true,
    })
    Axios.get(`https://reqres.in/api/users?per_page=4&page=${page}`)
      .then(json => {
        this.setState({
          data: json.data.data,
          laoding: false,
        })
      })
  }

  btnClick(e) {
    this.setState({
      search: '',
    })
    const page = e.target.value;
    this.getData(page);
  }

  componentDidMount(){
    Axios.get(`https://reqres.in/api/users?per_page=4&page=${this.state.pageId}`)
      .then(json => {
        this.setState({
          total_pages: json.data.total_pages,
          data: json.data.data,
          laoding: false,
        })
      })
  }

  pagination(){
    const tabs = [];
    for (let index = 1; index <= this.state.total_pages; index++) {
        tabs.push(<Pagination key={index} name={index} onClick={this.btnClick} />)
    }
    return tabs;
  }

  render() {
    var userList = this.state.data;
    var searchString = this.state.search.trim().toLowerCase(); 
    
    if(searchString.length>0){
      userList = userList.filter(data => {
        return data.first_name.toLowerCase().match(searchString);
      });
    }
    if(this.state.laoding){
      return(
        <p>...Loading</p>
      )
    }

    return (
      <div className="App">
        <Input change={this.changeHandler}/>
        <table className='details'>
          {userList.map((data) => {
            return (<tbody key={data.id}><tr onClick={() => this.togglePopUp(data)}>
                <td><img id='userPic' alt='userpic' src={data.avatar}/></td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
              </tr></tbody>)
          })} 
        </table>
        {
          this.state.showPopUp? 
          <PopUp 
            text={this.state.popUpData}  
            closePopup={() => {this.togglePopUp()}}  /> 
            : 
            null
        }
        {
         this.pagination()
        }
      </div>
    );
  }
}

export default App;
