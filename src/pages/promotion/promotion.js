import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Common from '../../utils/common.js';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './promotion.css';


class Promotion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bannerIconUrl: require("../promotion/pics/Hamberger.png").default,
      promotionList: [
        { id: 0, title: "15% off (Up to $20)", location: "westdale only", requirement: "Minimum 5 people reservation", deadline: "Nov. 18, 2020", category: "off-campus", expired: -1 },
        { id: 1, title: "15% off (Up to $20)", location: "westdale only", requirement: "Minimum 5 people reservation", deadline: "Nov. 18, 2020", category: "off-campus", expired: -1 },
        { id: 2, title: "15% off (Up to $20)", location: "westdale only", requirement: "Minimum 5 people reservation", deadline: "Nov. 18, 2020", category: "off-campus", expired: -1 },
        { id: 3, title: "Spend $20, Save $5", location: "Bistro only", requirement: "Minimum 3 people reservation", deadline: "Nov. 16, 2020", category: "on-campus", expired: 0 },
        { id: 4, title: "Spend $15, Save $3", location: "McDonalds only", requirement: "", deadline: "Nov. 11, 2020", category: "on-campus", expired: 1 }
      ],
      boxShadow: ['2px 5px #888888', 'none', 'none', 'none', "none"],
      category: "all",
      maxId: 5,

      displayedDetail: '',
      selectedTicketID: -1,
      appliedPromo: [],
      promocode: '',

    };
  }

  changeButtonStyle(e) {
    console.log(this.state.boxShadow)
    if (this.state.boxShadow[e] == 'none') {
      for (let i = 0; i < this.state.boxShadow.length; i++) {
        this.state.boxShadow[i] = 'none'
      }
      this.state.boxShadow[e] = '2px 5px #888888'
      this.setState({ boxShadow: this.state.boxShadow })
    }
    console.log(this.state.category)
    switch (e) {
      case (0):
        this.setState({ category: "all" })
        break
      case (1):
        this.setState({ category: "expiring" })
        break
      case (2):
        this.setState({ category: "off-campus" })
        break
      case (3):
        this.setState({ category: "on-campus" })
        break
      case (4):
        this.setState({ category: "past-promo" })
        break
    }
    console.log(this.state.category)
  }

  comp(arr) {
    var expiry = arr.expired;
    var category = arr.category;
    switch (this.state.category) {
      case ("all"):
        return !(expiry === 1)
      case ("expiring"):
        return expiry === 0
      case ("on-campus"):
        return category === "on-campus" && !(expiry === 1)
      case ("off-campus"):
        return category === "off-campus" && !(expiry === 1)
      case ("past-promo"):
        return expiry === 1
    }
  }

  verifyPromo() {
    let availablePromo = Common.CurrentPromo;
    let valid = false;
    var newAppliedPromoList;
    var newPromoList;
    var newMaxID;
    for (let i = 0; i < availablePromo.length; i++) {

      if (this.state.appliedPromo.includes(this.state.promocode)) {
        alert("Sorry, this promo code is already applied")
        valid = true;
      }
      if (availablePromo[i].code == this.state.promocode && !this.state.appliedPromo.includes(availablePromo[i].code)) {
        var newAppliedPromoList = this.state.appliedPromo.push(availablePromo[i].code)
        newPromoList = this.state.promotionList
        newMaxID = this.state.maxId
        valid = true;
        for (let j = 0; j < availablePromo[i].amount; j++) {
          newPromoList.push({
            id: newMaxID,
            title: availablePromo[i].title,
            location: availablePromo[i].location,
            requirement: availablePromo[i].requirement,
            deadline: availablePromo[i].deadline,
            category: availablePromo[i].category,
            expired: -1,
          });
          newMaxID += 1;
        }
        this.setState({
          promotionList: newPromoList,
          maxId: newMaxID,
        })
      }
    }

    if (valid == false) {
      alert("Sorry, the promo code is not valid.")
    }
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "900px" }}>
        <div className="promotion-banner">
          <Image style={{ height: "40px", marginRight: "15px" }} src={this.state.bannerIconUrl} />
        Invite your friends, and get $10 off for your next 3 order with Code "INV10KK"
        </div>
        <div>
          <div className="dashboard">
            <Nav variant="pills" style={{ position: 'sticky', top: '50px' }} defaultActiveKey="/" className="navbar promotion-nav flex-column navbar-expand-md fixed-left navbar-dark bg-primary">
              <div className="promotion-button-group">
                <Button onClick={() => this.changeButtonStyle(0)} style={{ boxShadow: this.state.boxShadow[0] }} className="promotion-category-button" variant="light">All Promotions</Button>
                <Button onClick={() => this.changeButtonStyle(1)} style={{ boxShadow: this.state.boxShadow[1] }} className="promotion-category-button" variant="light">Expiring soon</Button>
                <Button onClick={() => this.changeButtonStyle(2)} style={{ boxShadow: this.state.boxShadow[2] }} className="promotion-category-button" variant="light">Off Campus</Button>
                <Button onClick={() => this.changeButtonStyle(3)} style={{ boxShadow: this.state.boxShadow[3] }} className="promotion-category-button" variant="light">On Campus</Button>
                <Button onClick={() => this.changeButtonStyle(4)} style={{ boxShadow: this.state.boxShadow[4] }} className="promotion-category-button" variant="light">Past Promo</Button>
              </div>
              <Card className="add-promo-card">
                <Form.Control className="add-promo-input" type="input" placeholder="Enter Your Promo Code"
                  onChange={(event) => this.setState({ promocode: event.target.value })}
                  value={this.state.promocode} />
                <Card.Body className="add-promo-body" style={{ textAlign: "center" }}>
                  <button onClick={() => this.verifyPromo()} className="shadowed" style={{ backgroundColor: "#C9FFCB", border: "none", marginBottom: "15px" }}>Confirm</button>
                  <h3 style={{ fontFamily: "Georgia" }}>Add Promo</h3>
                </Card.Body>
              </Card>
            </Nav>
            <div className="promotion-ticket-panel">
              <div className="promotion-ticket-panel-header">
                <h4 style={{ margin: '2px 0 5px 5%' }}>Available Promotions</h4>
                <h6 style={{ color: "#aaaaaa", margin: "0 0 10px 5%" }}>Limited One per order</h6>
              </div>
              <div className="promotion-ticket-panel-list">
                {this.state.promotionList.filter(this.comp, this).map(
                  ({ id, title, location, requirement, deadline, category }) =>
                    <div style={{ width: "100%" }} className="ticket" key={id}>
                      <Card className="post-content">
                        <Card.Body style={{ padding: '10px 10px' }}>
                          <Card.Title> <h6>{title}</h6> </Card.Title>
                          <Card.Subtitle style={{ fontSize: '14px' }} className="text-muted">{category}</Card.Subtitle>
                        </Card.Body>
                        <Card.Body style={{ border: "none", padding: '10px 10px' }}>
                          <Card.Text>
                            <div className="text-muted">{requirement}</div>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{ justifyContent: "space-between", padding: '3px 10px' }}>
                          <div>
                            <div className="text-muted" style={{ float: 'left', marginTop: '2px' }}>{location}</div>
                            <h5 style={{ float: 'right', fontWeight: '400', marginBottom: '2px' }}><Badge variant="info">{deadline}</Badge></h5>
                          </div>
                        </Card.Footer>
                      </Card>
                    </div>
                )}
              </div>
            </div>
          </div >
        </div>
      </div>
    );
  }
}

export default Promotion;