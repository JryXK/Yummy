import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Common from '../../utils/common.js';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import './homepage.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [], cateRes: [],current:1,
      cuisine: [{ option: "Asian" }, { option: "Fast Food" }, { option: "Healthy" }, { option: "Italian" }, { option: "Japanese" }, { option: "Mexican" }],

      location: [{ option: "Campus" }, { option: "Downtown" }, { option: "Dundurn" }, { option: "Westdale" }],
      price: [{ option: "$" }, { option: "$$" }, { option: "$$$" }],
      filterStates: {
        Asian: false,
        FastFood: false,
        Healthy: false,
        Italian: false,
        Japanese: false,
        Mexican: false,
        Campus: false,
        Downtown: false,
        Dundurn: false,
        Westdale: false,
        LowPrice: false,
        MediumPrice: false,
        HighPrice: false,
      },
      test: {
        haha: 1
      }
    };
  }

  toMenu(id, name) {
    Common.resIndex = id;
    Common.clickedRes = name;
  }

  handleChange(e) {
    console.log(e.target.id)
    let type = e.target.id;
    let tempStates = this.state.filterStates;
    switch (type) {
      case ("Fast Food"):
        tempStates["FastFood"] = !this.state.filterStates["FastFood"];
        break;
      case ("$"):
        tempStates["LowPrice"] = !this.state.filterStates["LowPrice"];
        break;
      case ("$$"):
        tempStates["MediumPrice"] = !this.state.filterStates["MediumPrice"];
        break;
      case ("$$$"):
        tempStates["HighPrice"] = !this.state.filterStates["HighPrice"];
        break;
      default:
        tempStates[type] = !this.state.filterStates[type]
        break
    }
    var filteredRes = Common.restaurants;
    Object.keys(tempStates).forEach(key=>{
      if (tempStates[key]){
        if (key == "FastFood"){
          filteredRes = filteredRes.filter(value=>value.restFilters.includes("Fast Food"))
        }else if(key=="LowPrice"){
          filteredRes = filteredRes.filter(value=>value.restFilters[2] === "$")
        }else if(key=="MediumPrice"){
          filteredRes = filteredRes.filter(value=>value.restFilters[2] === "$$")
        }else if(key=="HighPrice"){
          filteredRes = filteredRes.filter(value=>value.restFilters[2] === "$$$")
        }else{
        filteredRes = filteredRes.filter(value=>value.restFilters.includes(key))
        }
      }
    })
    
    this.setState({ filterStates: tempStates ,restaurants: filteredRes,cateRes:filteredRes,searchInput:'' });
    this.changePage(1,6,filteredRes)
  }

  changePage(page, pagesize,restaurants) {
    var currentPage = restaurants.filter((rest, id) => (page - 1) * 6 <= id && id < page * 6)
    this.setState({ restaurants: currentPage,current:page})
  }

  searchRes(input){

    var filteredRes = this.state.cateRes.filter(value=>
      value.name.toLowerCase().includes(input.toLowerCase()) )

    this.setState({searchInput:input,restaurants: filteredRes})
    this.changePage(1,6,filteredRes)
  }

  componentDidMount() {
    var firstPage = Common.restaurants.filter((rest) => rest.id < 6)
    this.setState({ restaurants: firstPage, cateRes: Common.restaurants })
  }

  comp(arr) {
    let filterList = arr.restFilters;
    let result = true;
    for (let i = 0; i < filterList.length; i++) {
      switch (i) {
        case (0):
          if (filterList[0] == "Fast Food") {
            result = result && this.state.filterStates["FastFood"];
          } else {
            result = result && this.state.filterStates[filterList[0]];
          }
      }
    }
  }

  render() {
    return (
      <div style={{minHeight: "600px"}}>
        <div className="home-panel">
          <div className="home-filter"></div>
          <div className="search">
            <Form.Control style={{ borderRadius: "16px" }} className="search-input" type="input" placeholder="Tacobell, McDonalds, Search your restaurant here."
              onChange={
                (event) => this.searchRes(event.target.value)
              }
              value={this.state.searchInput} />
          </div>
          <div style={{ border: "1px solid #ccc", borderRadius: "16px", marginBottom: "15px" }} className="Filters">
            <Container fluid>
              <Row style={{ width: "100%" }}>
                <span style={{ marginLeft: "15px", width: "50px" }}>Cuisine</span>
                <ListGroup className="filter-list" style={{}}>
                  {this.state.cuisine.map(
                    ({ option }) =>
                      <div style={{ marginLeft: "15px" }} key={option}>
                        <Form.Check
                          custom
                          style={{ display: "flex", flexWrap: "nowrap" }}
                          type="checkbox"
                          id={`${option}`}
                          label={`${option}`}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>)
                  }
                </ListGroup>
              </Row>
              <Row>
                <span style={{ marginLeft: "15px", width: "50px" }}>Location</span>
                <ListGroup className="filter-list" style={{ display: "flex", flexDirection: "row" }}>
                  {this.state.location.map(
                    ({ option }) =>
                      <div style={{ marginLeft: "15px" }} key={option}>
                        <Form.Check
                          custom
                          type="checkbox"
                          id={`${option}`}
                          label={`${option}`}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>)}
                </ListGroup>
              </Row>
              <Row>
                <span style={{ marginLeft: "15px", width: "50px" }}>Price</span>
                <ListGroup className="filter-list" style={{ display: "flex", flexDirection: "row" }}>
                  {this.state.price.map(
                    ({ option }) =>
                      <div style={{ marginLeft: "15px" }} key={option}>
                        <Form.Check
                          custom
                          type="checkbox"
                          id={`${option}`}
                          label={`${option}`}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>)}
                </ListGroup>
              </Row>
            </Container>
          </div>
          <div className="restaurant-list-panel" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {this.state.restaurants.map((rest) =>
              <a onClick={this.toMenu.bind(this, rest.id, rest.name)} href={`#/menu-${rest.name}`} className="restaurant-thumbnail">
                <img src={rest.thumbnailUrl} style={{ height: "100%", width: "100%" }}></img>
                <div className="centered">
                  <div className="picture-OverLay"></div>
                  <h5 className="centered">{rest.name}</h5>
                </div>
              </a>
            )}

          </div>
          <div style={{ textAlign: 'right', margin: '0 200px 10px 0' }}><Pagination current={this.state.current} onChange={(page, pagesize) => this.changePage(page, pagesize,this.state.cateRes)} pageSize={6} total={this.state.cateRes.length} /></div>

        </div>

      </div>
    );
  }
}

export default HomePage;