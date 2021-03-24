import React from 'react';
import { Empty,Descriptions,Button,Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import './reservation.css';
import Common from '../../utils/common.js';

class Reservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {viewE:'block',viewD:'none'};
  }
	
	confirmCanR(value){
		delete Common.reservations[value]
		if (Object.keys(Common.reservations).length === 0)this.setState({viewD:'none',viewE:'block'})
	}
	componentDidMount(){
		if (Object.keys(Common.reservations).length === 0){this.setState({viewD:'none',viewE:'block'})}
		else {this.setState({viewD:'block',viewE:'none'})}
	}

  render() {
    return (
      <div style={{padding:'10px 15%', minHeight: "700px"}}>
				<h3>Reservation</h3>
				<Empty style={{display:this.state.viewE}} />
				{Object.keys(Common.reservations).map((value)=>
				<div key={value}>
				<Descriptions title={value} bordered>
					<Descriptions.Item label="Group Size" span={1.5}>{Common.reservations[value].groupSize}</Descriptions.Item>
					<Descriptions.Item label="Name" span={1.5}>{Common.reservations[value].name}</Descriptions.Item>
					<Descriptions.Item label="Phone Number" span={1.5}>{Common.reservations[value].phoneNum}</Descriptions.Item>
					<Descriptions.Item label="Plan Time" span={1.5}>{Common.reservations[value].planTime.toLocaleString().substr(4,17)}</Descriptions.Item>
				</Descriptions>
				<div style={{textAlign:'right', marginTop:'10px'}} >
				<Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>this.confirmCanR(value)}>
					<Button type="primary" danger>Cancel Reservation</Button>
				</Popconfirm></div></div>)}
				
				
      </div>
    );
  }
}

export default Reservation;