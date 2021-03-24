import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './FAQ.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class FAQ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
        <div className="FAQ-container" style={{paddingRight: "15px", paddingLeft: "15px", marginRight: "auto", marginLeft: "auto"}}>
            <div className="header">
                <h1 style={{lineHeight: "1.2", fontSize: "28px"}}>Yummy</h1>
                <hr class="my-2"></hr>
                <p class="lead">Frequently Asked Questions and Answers</p>
            </div>
            <Accordion style={{ minHeight: "600px" }}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            How do I use the filters to find the restaurant in the home page?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ul>
                                <li>First, select any filter you would like to apply by clicking on the checkbox</li>
                                <li>Then, our application will show you the filtered result.</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Where can I find my reservation/subscribed restaurant/promotion?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <ul>
                                <li>They are located in the <i>My Yummy</i> section on the top right of your screen</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            My Promotion disappeared. What happened?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ul>
                                <li>They probably expired. Check <i>Past Promo</i>your promotion section</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            I selected my filters but nothing is shown. What is the issue?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <ul>
                                <li>The filtered result must match all the filter selected.</li>
                                <li>Therefore, if you selected Westdale and Dundurn, since a restaurant cannot be at two location at the same time, nothing will be shown.</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
        )
    }
}

export default FAQ; 