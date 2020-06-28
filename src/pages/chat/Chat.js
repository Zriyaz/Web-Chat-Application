import React from "react"
import LoginString from "../login/loginStrings"
import firebase from "../../services/firebase"

export default class Chat extends React.Component{
	constructor(props){
		super(props)
		this.currentUserName = localStorage.getItem(LoginString.Name)
	}
	logout=()=>{
		firebase.auth().signOut()
		this.props.history.push('/')
		localStorage.clear()
	}

	render(){
		return(
			<div>User : {this.currentUserName}
			 <button onClick={this.logout}>Logout</button>
			</div>

		)
	}
}