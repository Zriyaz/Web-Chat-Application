import React from "react"
import {Link} from "react-router-dom"
import "./SignUp.css"
import firebase from "../../services/firebase"
import {Card} from "react-bootstrap"
import LoginString from "../login/loginStrings"


import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
//import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"


export default class SignUp extends React.Component{
	constructor(){
		super()
		this.state={
			email:'',
			password:'',
			name:'',
			description:'',
			error:null
		}
		this.handleChange= this.handleChange.bind(this)
		this.handleSubmit= this.handleSubmit.bind(this)
	}
	handleChange(event){
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	handleSubmit(event){
		const {name,password,email}=this.state
		event.preventDefault()
		try{
			firebase.auth().createUserWithEmailAndPassword(email,password)
			.then(async result=>{
				firebase.firestore().collection('users')
				.add({
					name,
					id: result.user.uid,
					email,
					password,
					URL:'',
					messages:[{notificationId:"",number: 0}]
				}).then((docRef)=>{
					localStorage.setItem(LoginString.ID,result.user.uid)
					localStorage.setItem(LoginString.Name ,name)
					localStorage.setItem(LoginString.Email,email)
					localStorage.setItem(LoginString.Password,password)
					localStorage.setItem(LoginString.PhotoURL, "")
					localStorage.setItem(LoginString.UPLOAD_CHANGE, "state_changed")
					localStorage.setItem(LoginString.Description, "")
					localStorage.setItem(LoginString.FireBaseDocumentId, docRef.id)
					this.setState({
						name:'',
						password:'',
						url:''
					})
					this.props.history.push("/chat") 
				})
				.catch((error)=>{
					console.error("Error adding document",error)
				})
			})
		}catch(error){
			document.getElementById('1').innerHTML="Error in signing up please try again"


		}
	}
	render(){
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
		return(
			<div>
			  <CssBaseline />
			  <Card style={Signinsee}>
			    <div>
			       <Typography component="h1" varient="h5">
			  		Sign Up
			  		To
			  	</Typography>
			    </div>
			      <div>
			         <Link to="/">
			         	<button className="btn"><i className="fa fa-home"></i>Web Chat</button>
			         </Link>
			      </div>
			  </Card>
			  <Card className="formacontrooutside">
			  	<form className="customform" noValidate onSubmit={this.handleSubmit}>

			  		<TextField 
			  			varient ="outlined"
			  			margin="normal"
			  			required
			  			fullWidth
			  			id = "email"
			  			label="Email Address-example:abc2gmail.com"
			  			name="email"
			  			autoComplete="email"
			  			autoFocus
			  			onChange = {this.handleChange}
			  			value={this.state.email}
			  		/>
			  		<div>
			  		  <p style={{color:'grey', fontSize:'15px', marginLeft:'0'}}>
			  		  	Password :length Greater then 6 (alphabets,number,special character)
			  		  </p>
			  		</div>
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
			  		<TextField 
			  			varient ="outlined"
			  			margin="normal"
			  			required
			  			fullWidth
			  			id = "name"
			  			label="name"
			  			name="name"
			  			autoComplete="name"
			  			autoFocus
			  			onChange = {this.handleChange}
			  			value={this.state.name}
			  		/>
			  		 <div>
			  		  <p style={{color:'grey', fontSize:'15px'}}>
			  		  	Please fill all fields and password should be greter then 6
			  		  </p>
			  		</div>
			  		<div className="CenterAliningItems">
			  		  <button className="button1" type="submit">
			  		    <span>Sign Up</span>
			  		  </button>
			  		</div>
			  		<div>
			  		  <p style={{color:'grey'}}>Already have and account?</p>
			  		  <Link to="/login">
			  		  	Login In
			  		  </Link>
			  		</div>
			  		<div className="error">
			  			<p id="1" style={{color:'red'}}></p>
			  		</div>
			  	</form>

			  </Card>
			</div>
		)
	}
}