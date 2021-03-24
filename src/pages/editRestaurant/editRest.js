import React from 'react';
import './editRest.css';
import { Input, Select,Form,Button,InputNumber,DatePicker,Upload,Modal,Space,Descriptions,Badge,Popconfirm} from 'antd';
import { LoadingOutlined, PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import 'antd/dist/antd.css';
import Common from '../../utils/common.js';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EditRest extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {viewD:'none',viewF:'block',posterList:[],previewVisible: false, previewImage: '', previewTitle: '',thumbnailList:[],newRes:{name:'',description:'',phone:'',address:'',openhourF:'',openhourMT:'',openhourSS:'',thumbnail:'',poster:'',menu:[]}};
		this.formRef = React.createRef(<FormInstance/>);
	}
	
	submitForm(newRes){
		console.log(newRes)
		newRes.menu = newRes.users?newRes.users:[]
		newRes.poster = this.state.posterList?this.state.posterList[0]:[]
		newRes.thumbnail = this.state.thumbnailList?this.state.thumbnailList[0]:[]
		this.state.newRes = newRes
		this.setState({newRes:this.state.newRes,viewD:'block',viewF:'none'})
		Common['newRes']=newRes
	}
	onReset(){
		this.formRef.current.resetFields()
		this.setState({posterList:[],thumbnailList:[]})
	}
	
	thumbnailChange(file){
		//console.log(file.file.status)
		if (file.file.status=='uploading') this.setState({ thumbnailList:[file] });
		else if (file.file.status=='removed') this.setState({ thumbnailList:[] });
	}
	posterChange(file){
		//console.log(file.file.status)
		if (file.file.status=='uploading') this.setState({ posterList:[file] });
		else if (file.file.status=='removed') this.setState({ posterList:[] });
	}

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		});
	};
	confirmCanR(){
		delete Common['newRes']
		this.setState({viewD:'none',viewF:'block',newRes:{name:'',description:'',phone:'',address:'',openhourF:'',openhourMT:'',openhourSS:'',thumbnail:'',poster:'',menu:[]}})
	}
	
	componentDidMount(){
		if ('newRes' in Common){this.setState({newRes:Common.newRes,viewD:'block',viewF:'none'})}
	}
	
  render() {
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
    return (
      <div>
				
				<Form labelCol={{span:6}} style={{display:this.state.viewF}} ref={this.formRef} wrapperCol={{span:12}} onFinish={(event)=>this.submitForm(event)}>
					<h3 style={{textAlign:'center'}}>Add your restaurant</h3>
					<Form.Item name="name" label="Restaurant Name" rules={[{ required: true }]}>
						<Input placeholder="your restaurant name" style={{width:'300px'}} />
					</Form.Item>
					<Form.Item name="description" label="Description" rules={[{ required: true }]}>
						<Input.TextArea rows={4} placeholder="your restaurant description" />
					</Form.Item>
					<Form.Item name="phone" label="Phone Number" rules={[{ required: true}]}>
						<InputNumber style={{width:'200px'}} placeholder="your phone number" />
					</Form.Item>
					<Form.Item name="address" label="Address" rules={[{ required: true }]}>
						<Input placeholder="your restaurant address" />
					</Form.Item>
					<Form.Item name="openhourMT" label="Open Hours (Monday to Thursday)">
						<DatePicker.RangePicker picker='time' format="HH:mm"/>
					</Form.Item>
					<Form.Item name="openhourF" label="(Friday)">
						<DatePicker.RangePicker picker='time' format="HH:mm"/>
					</Form.Item>
					<Form.Item name="openhourSS" label="(Saturday to Sunday)">
						<DatePicker.RangePicker picker='time' format="HH:mm"/>
					</Form.Item>
					<Form.Item name="thumbnail" label="Thumbnail" >
						<Upload
							name="thumbnail"
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							onPreview={this.handlePreview}
							onChange={(file) => this.thumbnailChange(file)}
						>
						{this.state.thumbnailList.length >= 1 ? null : uploadButton}
						</Upload>
						<Modal
							visible={this.state.previewVisible}
							title={this.state.previewTitle}
							footer={null}
							onCancel={() => this.setState({ previewVisible: false })}
						>
							<img alt="image" style={{ width: '100%' }} src={this.state.previewImage} />
						</Modal>
					</Form.Item>
					<Form.Item name="poster" label="Poster Image" >
						<Upload
							name="poster"
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							onPreview={this.handlePreview}
							onChange={(file) => this.posterChange(file)}
						>
						{this.state.posterList.length >= 1 ? null : uploadButton}
						</Upload>
						<Modal
							visible={this.state.previewVisible}
							title={this.state.previewTitle}
							footer={null}
							onCancel={() => this.setState({ previewVisible: false })}
						>
							<img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
						</Modal>
					</Form.Item>
					<Form.Item name="menu" label="Menu" >
					
					<Form.List name="users" label='Menu'>
						{(fields, { add, remove }) => (
							<>
								{fields.map(field => (
									<Space key={field.key} align="start" style={{ display: 'flex', marginBottom: 8 }} align="baseline">
										<Form.Item
											{...field}
											name={[field.name, 'category']}
											fieldKey={[field.fieldKey, 'category']}
											rules={[{ required: true, message: 'missing category' }]}
										>
											<Input style={{width:'120px'}} placeholder="Category" />
										</Form.Item>
										<Form.Item
											{...field}
											name={[field.name, 'name']}
											fieldKey={[field.fieldKey, 'name']}
											rules={[{ required: true, message: 'missing food name' }]}
										>
											<Input style={{width:'150px'}} placeholder="food name" />
										</Form.Item>
										<Form.Item
											{...field}
											name={[field.name, 'price']}
											fieldKey={[field.fieldKey, 'price']}
											rules={[{ required: true, message: 'missing food price' }]}
										>
											<Input style={{width:'100px'}} placeholder="food price" />
										</Form.Item>
										<Form.Item
											{...field}
											name={[field.name, 'description']}
											fieldKey={[field.fieldKey, 'description']}
										>
											<Input.TextArea style={{width:'250px'}} placeholder="food description" />
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(field.name)} />
									</Space>
								))}
								<Form.Item>
									<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
										Add Food
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
					
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8}}>
						<Button style={{marginLeft:'46%'}} type="primary" htmlType="submit">Submit</Button>
						<Button style={{marginLeft:'2%'}} htmlType="button" onClick={()=>this.onReset()}>Reset</Button>
					</Form.Item>
				</Form>
				
				<div style={{margin:'10px 15%',display:this.state.viewD}}>
				<Descriptions title="Restaurant Info" bordered>
					<Descriptions.Item label="Status" span={3}><Badge text="Waiting for Certification" status="processing" /></Descriptions.Item>
					<Descriptions.Item label="Restaurant Name" span={1.5}>{this.state.newRes.name}</Descriptions.Item>
					<Descriptions.Item label="Phone Number" span={1.5}>{this.state.newRes.phone}</Descriptions.Item>
					<Descriptions.Item label="Address" span={3}>{this.state.newRes.address}</Descriptions.Item>
					<Descriptions.Item label="Open hour (Mon~Thu)">{this.state.newRes.openhourMT?this.state.newRes.openhourMT[0].toLocaleString().substr(16,5)+' to '+this.state.newRes.openhourMT[1].toLocaleString().substr(16,5):''}</Descriptions.Item>
					<Descriptions.Item label="(Friday)">{this.state.newRes.openhourF?this.state.newRes.openhourF[0].toLocaleString().substr(16,5)+' to '+this.state.newRes.openhourF[1].toLocaleString().substr(16,5):''}</Descriptions.Item>
					<Descriptions.Item label="(Sat~Sun)">{this.state.newRes.openhourSS?this.state.newRes.openhourSS[0].toLocaleString().substr(16,5)+' to '+this.state.newRes.openhourSS[1].toLocaleString().substr(16,5):''}</Descriptions.Item>
					<Descriptions.Item label="Description" span={3}>{this.state.newRes.description}</Descriptions.Item>
					<Descriptions.Item label="Thumbnail" >
						<img alt="image" style={{ width: '100px' }} src={this.state.newRes.thumbnail?this.state.newRes.thumbnail.file.thumbUrl:Common.nopicUrl} />
					</Descriptions.Item>
					<Descriptions.Item label="Poster" span={2} >
						<img alt="image" style={{ width: '240px',height:'100px' }} src={this.state.newRes.poster?this.state.newRes.poster.file.thumbUrl:Common.nopicUrl} />
					</Descriptions.Item>
					<Descriptions.Item label="Menu">
						{this.state.newRes.menu.map((item)=>
						<p>{item.category+' - '+item.name+' - '+item.price+' - '+item.description}</p>)}
					</Descriptions.Item>
				</Descriptions>
				<div style={{textAlign:'right', marginTop:'20px'}} >
				<Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>this.confirmCanR()}>
					<Button type="primary" danger>Cancel Restaurant</Button>
				</Popconfirm>
				
				</div>
				</div>
				
      </div>
    );
  }
}

export default EditRest;
