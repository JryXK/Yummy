import React from 'react';
import './review.css';
import {Button} from 'react-bootstrap';
import { Progress, Rate, Radio, Select, Divider, Avatar, Card, Modal, Input, message,Empty } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined  } from '@ant-design/icons';
import Common from '../../utils/common.js';

function ShowOverallRate(props){
	var rate = 5;
	var reviews = props.rev
	var pvb = [0,0,0,0,0];
	reviews.forEach(review => {pvb[-review.starRate+5]+=1})
	var avg = ((5*pvb[0]+4*pvb[1]+3*pvb[2]+2*pvb[3]+pvb[4])/reviews.length+'')
	if (avg.length == 1) avg+='.0'
	else avg=avg.substring(0,3)
	var pvbp = [0,0,0,0,0]
	pvb.forEach((value,i)=>{
		var percentage = value/(pvb[0]+pvb[1]+pvb[2]+pvb[3]+pvb[4])
		if (percentage > 0.5){pvbp[i]=100}
		else{pvbp[i]=parseInt(percentage*200+'')}
	})
	return (
		<div>
			<div className='value'>{avg}</div>
			<Rate className='star' disabled allowHalf value={Number(avg)} />
			<div className='numOfR'>{reviews.length} reviews</div>
			{
				pvbp.map((value)=>
				<div style={{width:'100%',display:'flex',height:'42px'}}>
					<div style={{fontSize:'30px', color:'#333333'}}>{rate--}</div>
					<Progress style={{padding:'10px 15px'}} percent={value} showInfo={false} status="exception" />
				</div>
				)
			}
		</div>
	)
}
function ShowRecDishes(props){
	var dishes = props.dishes
	var rds = []
	Common.restaurants[Common.resIndex].menu.forEach((cate)=>{
		cate.foods.forEach((food)=>{
			dishes.forEach((dish)=>{
				if (dish==food.name) rds.push({name:dish,picUrl:food.picUrl})
			})
		})
	})
	if (rds.length == 0) rds.push({name:'not provided',picUrl:Common.nonepicUrl})
	return(<div style={{display:'flex'}}>{rds.map(({name,picUrl})=>
	<Card style={{ width: 110,margin:'0 10px' }} cover={<img alt={name} src={picUrl} />}>
		<Card.Meta title={name} />
	</Card>)}</div>)
	
}

message.config({top:50})
class Review extends React.Component {

  constructor(props) {
    super(props);
    this.state = {nodateV:'none',value:1, wreviews:Common.allReviews[Common.resIndex].reviews, sortedValue:'default',selCats:['none','none','none'],foodOpts:[[],[],[]],newR2V:false,newReview:{id:Common.allReviews[Common.resIndex].reviews.length,name:'Tester',starRate:0,profile:'',comments:'',Rdishes:['','',''],like:0,likeStatus:false,dislikeStatus:false,dislike:0,date:''},temp:0};
  }
	
	ratioFilter(value){
		if (value===1){this.setState({value:value,wreviews:Common.allReviews[Common.resIndex].reviews})}
		else if (value===2){this.setState({value:value,wreviews:Common.allReviews[Common.resIndex].reviews.filter(item=>item.starRate>2)})}
		else{this.setState({value:value,wreviews:Common.allReviews[Common.resIndex].reviews.filter(item=>item.starRate<3)})}
		
	}
	sortedFilter(value){
		this.setState({sortedValue:value})
	}
	likeClick(id){
		if (!Common.allReviews[Common.resIndex].reviews[id].likeStatus) {
			Common.allReviews[Common.resIndex].reviews[id].like += 1
			if (Common.allReviews[Common.resIndex].reviews[id].dislikeStatus){
				Common.allReviews[Common.resIndex].reviews[id].dislike -= 1
				Common.allReviews[Common.resIndex].reviews[id].dislikeStatus = !Common.allReviews[Common.resIndex].reviews[id].dislikeStatus
			}
		}
		else Common.allReviews[Common.resIndex].reviews[id].like -= 1
		Common.allReviews[Common.resIndex].reviews[id].likeStatus = !Common.allReviews[Common.resIndex].reviews[id].likeStatus
		this.setState({temp:0})
	}
	dislikeClick(id){
		if (!Common.allReviews[Common.resIndex].reviews[id].dislikeStatus){
			Common.allReviews[Common.resIndex].reviews[id].dislike += 1
			if (Common.allReviews[Common.resIndex].reviews[id].likeStatus){
				Common.allReviews[Common.resIndex].reviews[id].like -= 1
				Common.allReviews[Common.resIndex].reviews[id].likeStatus = !Common.allReviews[Common.resIndex].reviews[id].likeStatus
			}
		} 
		else Common.allReviews[Common.resIndex].reviews[id].dislike -= 1
		Common.allReviews[Common.resIndex].reviews[id].dislikeStatus = !Common.allReviews[Common.resIndex].reviews[id].dislikeStatus
		this.setState({temp:0})
	}
	popupNewReview(){
		this.setState({newR2V:true})
	}
	submitNewReview(){
		if (this.state.newReview.starRate === 0){message.warning('Please pick a star rate')}
		else{
			var myDate = new Date()
			this.state.newReview.date=myDate.toLocaleString()
			Common.allReviews[Common.resIndex].reviews.push(this.state.newReview)
			this.setState({nodateV:'none',newR2V:false,newReview:{id:Common.allReviews[Common.resIndex].reviews.length,name:'Tester',starRate:0,profile:'',comments:'',Rdishes:['','',''],like:0,likeStatus:false,dislikeStatus:false,dislike:0,date:''}})
		}
	}
	rateChange(value){
		this.state.newReview.starRate=value
		this.setState({newReview:this.state.newReview})
	}
	commentsChange(value){
		this.state.newReview.comments=value
		this.setState({newReview:this.state.newReview})
	}
	recDish(value,ind){
		this.state.selCats[ind]=value
		this.state.foodOpts[ind] = []
		Common.restaurants[Common.resIndex].menu.forEach((cat,index)=>{
			if (cat.category == value){
				cat.foods.forEach((food)=>{
					this.state.foodOpts[ind].push(food.name)
				})
			}
		})
		this.setState({selCats:this.state.selCats,foodOpts:this.state.foodOpts})
	}
	recFood(value,ind){
		if (value=='none') this.state.newReview.Rdishes[ind]=''
		else this.state.newReview.Rdishes[ind]=value
		this.setState({newReview:this.state.newReview})
	}
	componentDidMount(){
		if (Common.allReviews[Common.resIndex].reviews.length==0) this.setState({nodateV:'block'})
		else this.setState({nodateV:'none'})
	}

  render() {
    return (
      <div>
				<div className='container-top'>
					<Button variant="outline-secondary" href={'#/menu-'+Common.restaurants[Common.resIndex].name}>&lt;- Back to Menu</Button>
				</div>
				<div style={{width:'100%',height:'360px'}}>
					<div className='img-posterR' style={{backgroundImage : 'url('+Common.restaurants[Common.resIndex].posterUrl+')'}}>
						<div className="container-posterRTitle"></div>
						<div className="font-posterRTitle">{Common.allReviews[Common.resIndex].resName}</div>
					</div>
					<div className='container-overallRate'><ShowOverallRate rev={Common.allReviews[Common.resIndex].reviews}/></div>
				</div>
				<div style={{margin:'0 15% 0 7%'}}>
					<Radio.Group onChange={(event) => this.ratioFilter( event.target.value)}  value={this.state.value} style={{height:36}}>
						<Radio style={{fontSize:'18px',color:'#333333'}} value={1}>All</Radio>
						<Radio style={{fontSize:'18px',color:'#333333'}} value={2}>Good Reviews</Radio>
						<Radio style={{fontSize:'18px',color:'#333333'}} value={3}>Bad Reviews</Radio>
					</Radio.Group>
					<div style={{float:'right',display:'flex'}}>
						
						<Button variant="primary" style={{height:35,lineHeight:0}} onClick={this.popupNewReview.bind(this)}>New Comment</Button>
					</div>
					
					<div style={{display:this.state.nodateV, width:'100%',height:'400px'}}><Empty /></div>
					{
						this.state.wreviews.map(({id,name,starRate,profile,comments,Rdishes,like,dislike,date})=>
							<div>
								<Divider style={{borderTop: '1px solid rgb(127, 127, 127)',margin:'6px 0'}} />
								<div style={{display:'flex'}}>
									<div style={{paddingTop:40}}>
										<Avatar style={{lineHeight:'70px'}} size={100} icon={<UserOutlined/>} />
										<div style={{textAlign:'center',fontSize:16,marginTop:5}}>{name}</div>
									</div>
									<div style={{padding:'0 18px',width:'75%'}}>
										<div><Rate style={{color:'red',fontSize:23}} disabled allowHalf value={starRate} /></div>
										<div style={{padding:'7px 15px',fontSize:18,minHeight:100}}>{comments}</div>
										<div style={{display:'flex'}}>
											<span style={{color:'rgb(217, 83, 79)',fontSize:17,paddingTop:'50px'}}>Recommend Dishes:</span>
											<div style={{width:'57%'}}><ShowRecDishes dishes={Rdishes}/></div>
											<div style={{fontSize:'15px', color:'rgb(85, 85, 85)',paddingTop:'90px'}}>{date}</div>
										</div>
									</div>
									<div style={{padding:'10px 0',display:'flex'}}>
										<div style={{textAlign:'center'}}>
											<span onClick={this.likeClick.bind(this,id)}>
												{React.createElement(Common.allReviews[Common.resIndex].reviews[id].likeStatus ? LikeFilled : LikeOutlined,{className:'icon-like-dislike'},null)}
											</span>
											<div style={{fontSize:'15px',color:'rgb(85, 85, 85)'}}>{like}</div>
											<div className='font-like-dislike'>LIKE</div>
										</div>
										<div style={{textAlign:'center',marginLeft:'20px'}}>
											<span onClick={this.dislikeClick.bind(this,id)}>
												{React.createElement(Common.allReviews[Common.resIndex].reviews[id].dislikeStatus ? DislikeFilled : DislikeOutlined,{className:'icon-like-dislike'},null)}
											</span>
											<div style={{fontSize:'15px',color:'rgb(85, 85, 85)'}}>{dislike}</div>
											<div className='font-like-dislike'>DISLIKE</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
					<Divider style={{borderTop: '1px solid rgb(127, 127, 127)',margin:'6px 0'}} />
				</div>
				
				<Modal title="New Review" centered visible={this.state.newR2V} 
					onOk={this.submitNewReview.bind(this)} onCancel={() => this.setState({newR2V:false})} >
					<p><div>Star Rate:</div><Rate style={{color:'red'}} onChange={event=>this.rateChange(event)} value={this.state.newReview.starRate} /></p>
					<p>Comments: <Input.TextArea onChange={event=>this.commentsChange(event.target.value)} value={this.state.newReview.comments} rows={4}/></p>
					<p><div>Recommend Dishes (Maximum 3): </div>
					<div style={{display:'flex'}}>
						<div style={{paddingTop:'35px'}}> Category:<br/><div style={{paddingTop:'15px',float:'right'}}>Food:</div></div>
						<div style={{display:'flex'}}>
							{[0,1,2].map((index)=><div style={{margin:'5px 10px'}}>
							Dish {index+1}:<br/>
							<Select defaultValue="none" style={{ width: 120, marginTop:'5px'}} onChange={event=>this.recDish(event,index)}>
								<Select.Option value="none">none</Select.Option>
								{Common.restaurants[Common.resIndex].menu.map((cat,ind)=><Select.Option value={cat.category}>{cat.category}</Select.Option>)}
							</Select><br/>
							<Select defaultValue="none" style={{ width: 120, marginTop:'5px' }} onChange={event=>this.recFood(event,index)}>
								<Select.Option value="none">none</Select.Option>
								{this.state.foodOpts[index].map((food,ind)=><Select.Option value={food}>{food}</Select.Option>)}
							</Select>
							</div>)}
						</div>
					</div>
					</p>
				</Modal>
      </div>
    );
  }
}

export default Review;
/*<div style={{float:'right'}}><Button variant="link">Report this review</Button></div>*/
/*
<div>
						sorted by
						<Select defaultValue="default" style={{width:100,margin:'4px 22px 0px 6px'}} onChange={(event) => this.sortedFilter(event)}>
							<Select.Option value="default">default</Select.Option>
							<Select.Option value="time">time</Select.Option>
						</Select>
						</div>
<div style={{float:'right',margin:'5px 10% 10px 0'}}><Button variant="outline-secondary">Load More Reviews</Button></div>
*/
