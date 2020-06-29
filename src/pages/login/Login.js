import React from  'react';
import {Link} from "react-router-dom"
import firebase from "../../services/firebase"

import LoginString from "./loginStrings"
import "./Login.css"
import {Card} from "react-bootstrap"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"


export default class Login extends React.Component{

	constructor(props) {
		super(props)
		this.state={
			isLoading:true,
			error:'',
			email: "",
			password: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (event){
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	compoundDidMount(){
		if(localStorage.getItem(LoginString.ID)){
			this.setState({
				isLoading:false},()=>{
					this.setState({isLoading:false})
					this.props.showToast(1,'Login Success')
					this.props.history.push('./chat')
				})
		}else{
			this.setState({
				isLoading: false
			})
		}
	}
		async handleSubmit(event){
			event.preventDefault()
			this.setState({error:""})

			await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(async result=>{
				let user = result.user
				if(user){
					await firebase.firestore().collection('users')
					.where('id' , "==" , user.uid)
					.get()
					.then(function(querySnapshot){
						querySnapshot.forEach(function(doc){
							const currentdata = doc.data()
							localStorage.setItem(LoginString.firebaseDocumentId, doc.id)
							localStorage.setItem(LoginString.ID, currentdata.id)
							localStorage.setItem(LoginString.Name, currentdata.name)
							localStorage.setItem(LoginString.Password, currentdata.password)
							localStorage.setItem(LoginString.PhotoURL, currentdata.URL)
							localStorage.setItem(LoginString.Description, currentdata.description)
							
						})
					})
					this.props.history.push('./chat')
				}
			}).catch(function(error){
				this.setState({
					error: "Error while signing in please try again"
				})
			})

		}
	render() {
		const paper={
			display:'flex',
			flexDirection:'column',
			alignItems:'center',
			paddingLeft:'10px',
			paddingRight:'10px'

		}
		const rightcomponent ={
			boxShadow:'0 80px 80px #808888',
			backgroundColor:'smokegrey'
		}
		const root={
			height: '100vh',
			background: 'linear-gradient(90deg , #e3ffe7 ,#d9e7ff ,100%)',
			marginBottom:'50px'

		}
		const Signinsee ={
			display:'flex',
			flexDirection:'column',
			alignItems:'center',
			color:'White',
			backgroundColor:'#1ebea5',
			width:'100%',
			boxShadow:'0 5px 5px #808888',
			height:'10rem',
			paddingTop:'50px',
			opacity:'0.5',
			borderBottom :'5px solid green'
		}
		const form={
			width:"100%",
			marginTop:'50px'
		} 
		const avatar={
			backgroundColor:"green"
		}
		return (
			<Grid container component="main" style={root}>
				<CssBaseline />
				<Grid item xs={1} sm={4} md={7} className="image" >
				   <div className="image1"></div>
				</Grid>
				<Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6} square>
				   <Card style={Signinsee}>

				     <div>
				       <Avatar style={avatar}>
				           <LockOutlinedIcon height="50px" width=""  />
				       </Avatar>
				     </div>
				     <div>
				       <Typography component="h1" varient="h5"
				         Sign In 
				         To
				        />
				     </div>
				      <div>
				        <Link to ="/">
				          <button className="btn">
				            <i className="fa fa-home"></i>
				            WebChat
				          </button>
				        </Link>
				      </div>
				   </Card>
				   <div style={paper}>
				     <form style={form} noValidate onSubmit={this.handleSubmit}>
				        <TextField 
			  			varient ="outlined"
			  			margin="normal"
			  			required
			  			fullWidth
			  			id = "email"
			  			label="Email Address"
			  			name="email"
			  			autoComplete="email"
			  			autoFocus
			  			onChange = {this.handleChange}
			  			value={this.state.email}
			  		/>
			  		<TextField 
			  			varient ="outlined"
			  			margin="normal"
			  			required
			  			fullWidth
			  			id = "password"
			  			label="Password "
			  			name="password"
			  			type="password"
			  			autoComplete=" Current password"
			  			autoFocus
			  			onChange = {this.handleChange}
			  			value={this.state.password}
			  		/>
			  		   <FormControlLabel 
			  		     control ={<Checkbox value="remember" color="primary"/>}
			  		     label ="remember me"
			  		   />
			  		    <Typography component="h6" varient="h5">
			  		     { this.state.error ? <p className="text-danger">{this.state.error}</p> : null }
			  		    </Typography>			  
			  		      <div className="CenterAliningItem">
			  		        <button className="button1" type="submit">
			  		           <span>Login In</span>
			  		        </button>			  		        	
			  		      </div>
			  		       <div className="CenterAliningItem">
			  		        <p>Don't have and account?</p>
			  		         <Link to="/signup" varient = "body2">Sign Up</Link>
			  		       </div>
				     </form>
				   </div>
				</Grid>
		    </Grid>
		)
	}
}
