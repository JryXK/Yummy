import React from 'react';
import { Empty,Descriptions,Button,Popconfirm,Switch  } from 'antd';
import 'antd/dist/antd.css';
import './subscription.css';
import Common from '../../utils/common.js';


class Subscription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {viewE:'block',viewD:'none'};
  }
  
  confirmCanR(value){
  	delete Common.subscriptions[value]
  	if (Object.keys(Common.subscriptions).length === 0)this.setState({viewD:'none',viewE:'block'})
  }
  componentDidMount(){
  	if (Object.keys(Common.subscriptions).length === 0){this.setState({viewD:'none',viewE:'block'})}
  	else {this.setState({viewD:'block',viewE:'none'})}
  }
  
  render() {
    return (
      <div style={{padding:'10px 15%', minHeight: "700px"}}>
  			<h3>Subscription</h3>
  			<Empty style={{display:this.state.viewE}} />
  			{Object.keys(Common.subscriptions).map((value)=>
  			<div key={value}>
				<Descriptions bordered>
					<Descriptions.Item label="Restarant Name">{value}</Descriptions.Item>
					<Descriptions.Item label="Notification"><Switch defaultChecked /></Descriptions.Item>
					<Descriptions.Item label="Operation"><Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>this.confirmCanR(value)}><Button type="text" danger>Cancel Subscription</Button></Popconfirm></Descriptions.Item>
				</Descriptions></div>)}
  			
  			
      </div>
    );
  }
}

export default Subscription;