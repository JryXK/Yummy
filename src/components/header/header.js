import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Common from '../../utils/common.js';
import HomePage from '../../pages/home/homepage.js';
import Menu from '../../pages/menu/menu.js';
import Review from '../../pages/review/review.js';
import Promotion from '../../pages/promotion/promotion.js';
import EditRest from '../../pages/editRestaurant/editRest.js';
import Reservation from '../../pages/reservation/reservation.js';
import Subscription from '../../pages/subscription/subscription.js';
import FAQ from '../../pages/FAQ/FAQ.js';
import './header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
			
				<Navbar bg="secondary" variant="dark" style={{position:'sticky',top:'0',zIndex: '1040'}}>
					<Navbar.Brand href="#/">Yummy</Navbar.Brand>
					<Nav className="mr-auto"></Nav>
					<Nav defaultActiveKey="#/" style={{marginRight:'5px'}}>
						<Nav.Link href="#/">Yummy Home</Nav.Link>
						<NavDropdown title="My Yummy">
							<NavDropdown.Item href="#/promotion">Promotion</NavDropdown.Item>
							<NavDropdown.Item href="#/subscription">Subscription</NavDropdown.Item>
							<NavDropdown.Item href="#/reservation">Reservation</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#/editrestaurant">Edit Restaurant</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
				
				<Router>
					<Route path="//" component={HomePage}/>
					{Common.restaurants.map((rest)=>
					<div>
					<Route path={"/menu-"+rest.name} component={Menu}/>
					<Route path={"/review-"+rest.name} component={Review}/>
					</div>
					)}
					<Route path={"/promotion"} component={Promotion}/>
					<Route path={"/faq"} component={FAQ}/>
					<Route path={"/subscription"} component={Subscription}/>
					<Route path={"/reservation"} component={Reservation}/>
					<Route path={"/editrestaurant"} component={EditRest}/>
				</Router>
				
      </div>
    );
  }
}
export default Header;