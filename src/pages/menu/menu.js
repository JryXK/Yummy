import React from 'react';
import './menu.css';
import {Button, Nav, Tab, Col, Row, Card, Image} from 'react-bootstrap';
import {Modal,Select,Input,DatePicker,Tag,Checkbox,message,Empty} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import Common from '../../utils/common.js';

function disabledDate(current) {
  return current && current < moment().endOf('day');
}
function disabledDateTime() {
  return {
    disabledHours: () => [0,1,2,3,4,5,6,22,23],
  };
}
function ShowReservedLabel(props){
	if (Common.restaurants[Common.resIndex].name in Common.reservations) {return(<div className='tag-reserved'><Tag className='font-gtag' color="#87d068">Reserved</Tag></div>);}
	else {return (<span></span>);}
}

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {menuV:'block',nodateV:'none',resV:false,resedV:false,cancelConV:false,subChecked:false,subClassN:'border-subscribeG',subFont:'Subscribe',subFontS:'font-subsG',res:{groupSize:'1',name:'',phoneNum:'',planTime:''}};
  }
	
	showResModal(){
		if (Common.restaurants[Common.resIndex].name in Common.reservations) this.setState({resedV:true})
		else this.setState({resV:true})
	}
	submitReservation(){
		//console.log(this.state.res.planTime.toLocaleString())
		if (this.state.res.name === ''){message.warning('Please enter a name')}
		else if (this.state.res.phoneNum === ''){message.warning('Please enter a phone number')}
		else if (this.state.res.planTime === ''){message.warning('Please enter a plan time')}
		else{
		Common.reservations[Common.restaurants[Common.resIndex].name]=this.state.res
		this.setState({resV:false,res:{groupSize:'1',name:'',phoneNum:'',planTime:''}})
		}
	}
	setGroupSize(value){
		this.state.res.groupSize=value
		this.setState({res:this.state.res})
	}
	setPhoneNum(value){
		const reg = /^-?\d*(\.\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			this.state.res.phoneNum=value
			this.setState({res:this.state.res})
		}
	}
	setPlanTime(value){
		this.state.res.planTime=value
		this.setState({res:this.state.res})
	}
	setName(value){
		this.state.res.name=value
		this.setState({res:this.state.res})
	}
	cancelReservation(){ this.setState({cancelConV:true}) }
	confirmCancelRes(){
		delete Common.reservations[Common.restaurants[Common.resIndex].name]
		this.setState({cancelConV:false,resV:false,resedV:false})
	}
	changeSubC(){
		if (this.state.subChecked) {
			this.setState({subChecked:!this.state.subChecked,subClassN:'border-subscribeG',subFont:'Subscribe'})
			delete Common.subscriptions[Common.restaurants[Common.resIndex].name]
		}
		else {
			this.setState({subChecked:!this.state.subChecked,subClassN:'border-subscribeS',subFont:'Subscribed!'})
			Common.subscriptions[Common.restaurants[Common.resIndex].name]=true
		}
	}
	initCheckedSub(){
		if (Common.restaurants[Common.resIndex].name in Common.subscriptions) this.setState({subChecked:true,subClassN:'border-subscribeS',subFont:'Subscribed!'})
	}
	closeRese(){ this.setState({resV:false}) }
	closeConV(){ this.setState({cancelConV:false})}
	closeResedV(){ this.setState({resedV:false})}

	componentDidMount(){
		this.initCheckedSub()
		if (Common.restaurants[Common.resIndex].menu[0].category=="")this.setState({menuV:'none',nodateV:'block'})
		else this.setState({menuV:'block',nodateV:'none'})
	}
  render() {
		var rest = Common.restaurants[Common.resIndex]
		var poster = rest.posterUrl
    return (
		<div>
			<div className='img-poster' style={{backgroundImage : 'url('+poster+')'}}></div>
			<div className="container-posterTitle"></div>
			<ShowReservedLabel/>
			<div className="container-posterDes"></div>
			<div className="font-posterTitle"><h2>Menu</h2></div>
			<div className="font-posterDes">{rest.descriptions}</div>
			<div style={{textAlign:'right',marginRight:'10%'}}>
				<Checkbox checked={this.state.subChecked} className={this.state.subClassN} onChange={()=>this.changeSubC()}>{this.state.subFont}</Checkbox>
				<Button variant="primary" style={{marginRight:'10px'}} onClick={()=>this.showResModal()}>Reservation</Button>
				<Button variant="primary" href={'#/review-'+rest.name}>Yummy Reviews</Button>
			</div>
			<div style={{display:this.state.nodateV, width:'100%',height:'400px'}}><Empty /></div>
			
			<div style={{margin:'10px 10% 10px 10%',display:this.state.menuV}}>
				<h3 style={{margin:'0px 0px 10px 0'}}>Filter</h3>
				<Tab.Container defaultActiveKey={rest.menu[0].category}>
					<Row>
					<Col sm={2}>
						<Nav variant="pills" className="flex-column" style={{position: "sticky", top:"12%"}}>
							{rest.menu.map(({category,foods})=>
								<Nav.Item key={category}><Nav.Link eventKey={category}>{category}</Nav.Link></Nav.Item>)}
						</Nav>
					</Col>
					<Col sm={10}>
						<Tab.Content>
						{rest.menu.map(({category,foods})=>
							<Tab.Pane eventKey={category} key={category}>
								<div className='container-tabPanel'>
									<h3 style={{width:'100%',textAlign:'center'}}>{category}</h3><br/>
									{foods.map(({name,price,picUrl,desc})=>
										<Card style={{ width: '230px',margin:'20px 0px 20px 45px' }} key={name}>
											<Card.Img variant="top" src={picUrl} />
											<Card.Body style={{padding:"8px"}}>
												<Card.Title style={{marginBottom:'6px'}}>{name}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
												<Card.Text style={{fontSize:'14px'}}>{desc}</Card.Text>
											</Card.Body>
										</Card>)}
								</div>
							</Tab.Pane>)}
						</Tab.Content>
					</Col>
					</Row>
				</Tab.Container>
			</div>
			<div style={{height:'220px'}}>
				<Image className='img-footer' src={rest.footerImg} />
				<div className='border-footer'>
					<h2 className='title'>{rest.name}</h2>
					<div className='address'>{rest.address}</div>
					<div className='openhours'>{rest.openHours}</div>
					<div className='phonenum'>{rest.phoneNum}</div>
				</div>
			</div>
			<Modal title="Reservation" centered visible={this.state.resV}
				onOk={()=>this.submitReservation()} onCancel={()=>this.closeRese()} >
				<div style={{display:'flex'}}>
				<div style={{marginLeft:'20%'}}><p className='label-reservation'>Group Size:</p><p className='label-reservation'>Name:</p><p className='label-reservation'>Phone No:</p><p className='label-reservation'>Plan Time:</p></div>
				<div>
					<p><Select defaultValue="1" style={{width: 80,marginLeft:'10px'}} onChange={event=>this.setGroupSize(event)}>
					{['1','2','3','4','5','5+'].map(value=><Select.Option value={value}>{value}</Select.Option>)}
					</Select></p><p><Input style={{width:'150px',marginLeft:'10px'}} value={this.state.res.name} onChange={event=>this.setName(event.target.value)} placeholder="Your Name" /></p>
					<p><Input style={{width:'150px',marginLeft:'10px'}} value={this.state.res.phoneNum} onChange={event=>this.setPhoneNum(event.target.value)} placeholder="Phone Number" /></p>
					<p><DatePicker value={this.state.res.planTime} onChange={event=>this.setPlanTime(event)}
						format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} disabledTime={disabledDateTime}
						showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }} style={{marginLeft:'10px'}}
					/></p>
				</div>
				</div>
			</Modal>
			<Modal title="Reservation Information" centered visible={this.state.resedV} cancelText='Cancel Revservation' closable={false} cancelButtonProps={{type:"primary",danger:true}}
				onOk={()=>this.closeResedV()} onCancel={()=>this.cancelReservation()} maskClosable={false} >
				<div style={{marginLeft:'20%',display:'flex'}}><div>
				<p style={{textAlign:'right'}}>Group Size:</p><p style={{textAlign:'right'}}>Name:</p><p style={{textAlign:'right'}}>Phone No:</p><p style={{textAlign:'right'}}>Plan Time:</p></div>
				<div style={{marginLeft:'20px'}}>
				<p>{Common.reservations[Common.restaurants[Common.resIndex].name]?Common.reservations[Common.restaurants[Common.resIndex].name].groupSize:'none'}</p>
				<p>{Common.reservations[Common.restaurants[Common.resIndex].name]?Common.reservations[Common.restaurants[Common.resIndex].name].name:'none'}</p>
				<p>{Common.reservations[Common.restaurants[Common.resIndex].name]?Common.reservations[Common.restaurants[Common.resIndex].name].phoneNum:'none'}</p>
				<p>{Common.reservations[Common.restaurants[Common.resIndex].name]?Common.reservations[Common.restaurants[Common.resIndex].name].planTime.toLocaleString().substr(4,17):'none'}</p>
				</div></div>
			</Modal>
			<Modal title='Cancel Reservation Comfirmaton' visible={this.state.cancelConV} centered onCancel={()=>this.closeConV()}
				okText='Yes' okType='danger' cancelText='No' onOk={()=>this.confirmCancelRes()}>
				<p style={{fontSize:'20px'}}>Are you sure cancel the reservation?</p>
			</Modal>
		</div>
    );
  }
}

export default Menu;