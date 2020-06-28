import React from "react"

import "./Footer.css"

class Footer extends React.Component{
	Copyright=()=>{ return(
		<h1 varient="body2" color="textSecondary" align="center">
		 {"Copyright @"}
		 {'Coding Cafe'}
		 {new Date.getFullYear()}
		 {'.'}
		</h1>)
	}
	render(){
		return(
		<footer>
		 <div className="footer 1-box is-center">
		  {this.Copyright()}
		 </div>
		</footer>
		)
	}
}
export default Footer