import React from 'react';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css';

class CustomizedFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <footer className="site-footer">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify">‘Yummy’ is an app which provides the online reservation service, and customized restaurant
                            search function for undergraduate student. It also publishes crowd-sourced restaurant review, food
review and recommendation.</p>
                        </div>


                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><a onClick={() => (
                                    alert("We are a student group consist of two software engineering students at McMaster.")
                                )}>About Us</a></li>
                                <li><a href="#/faq">FAQ</a></li>
                            </ul>
                        </div>

                        
                        <div className="col-xs-6 col-md-3">
                            <h6>Contact US</h6>
                            <ul className="footer-links">
                                <li style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ height: "24px", width: "24px" }}>
                                        <Image style={{ height: "100%", width: "100%" }} src={require('./pics/email.png').default} />
                                    </div>
                                    <span>kxingjian@gmail.com</span>
                                </li>
                                <li style={{ display: "flex", alignItems: "center"}} >
                                    <div style={{ height: "24px", width: "24px"}}>
                                        <Image style={{ height: "100%", width: "100%" }} src={require('./pics/phone.png').default} />
                                    </div>
                                    <span>7053462742</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-8">
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-4">
                            <ul className="social-icons">
                                <li>
                                    <a className="facebook" href="https://www.facebook.com/XingjianKe/">
                                        <div tyle={{ height: "75%", width: "75%" }}>
                                            <Image style={{ height: "100%", width: "100%" }} src={require('./pics/facebook.png').default} />
                                        </div>
                                    </a></li>
                                <li>
                                    <a className="twitter" href="https://twitter.com/KeXingjian">
                                        <Image style={{ height: "75%", width: "75%" }} src={require('./pics/twitter.png').default} />
                                    </a></li>
                                <li><a className="instagram" href="https://www.instagram.com/xingjianke/">
                                    <Image style={{ height: "75%", width: "75%" }} src={require('./pics/instagram.png').default} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default CustomizedFooter;