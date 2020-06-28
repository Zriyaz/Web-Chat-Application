import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import  "./Home.css"
import images from "../../projectImages/ProjectImages"
import {Link} from "react-router-dom"

export default class Home extends React.Component{
	render(){
		return(
		<div>
			<Header />
			<div className="splash-container">
			  <div className="splash">
			  	<h1 className="splash-head">Web Chat App</h1>
			  	<p className="splash-subhead">lets talk with people loved one</p>

			  	 <div id="custom-button-wrapper">
			  	   <Link to ="/login">
			  	     <a className="my-super-cool-btn">
			  	       <div className="dots-container">
			  	         <div className="dot"></div>
			  	         <div className="dot"></div>
			  	         <div className="dot"></div>
			  	         <div className="dot"></div>
			  	       </div>
			  	       <span className="buttoncooltext">Get Started</span>
			  	      </a>

			  	   </Link>
			  	 </div>
			  </div>
			</div>
			<div className="content-wrapper">
				<div className="content">
					<h2 className="content-head is-center">Features of WebChat Application</h2>

					<div className="Appfeatures">
					  <div className="contenthead">

					     <h3 className="content-subhead">
					       <i className="fa fa-rocket"></i>
					       Get Started Quickly
					     </h3>
					      <p>just register yourself with this app and start chating with your loved once </p>
					  </div>
					  <div className="1-box pure-u-1-md-1-2 pure-u-lg-1-4">

					   <h3 className="content-subhead">
					       <i className="fa fa-sign-in"></i>
					        Firebase Authentication
					     </h3>
					      <p>Firebase Authentication has been implemented in this app </p>
					  </div>

					   <div className="1-box pure-u-1-md-1-2 pure-u-lg-1-4">
					   <h3 className="content-subhead">
					       <i className="fa fa-sign-in"></i>
					        Media
					    </h3>
					      <p>you can share images with your friends for experience </p>
					  </div>
					  <div className="1-box pure-u-1-md-1-2 pure-u-lg-1-4">
					   <h3 className="content-subhead">
					       <i className="fa fa-sign-in"></i>
					        Updates
					    </h3>
					      <p>We will working with new features for this app for batter experience in future </p>
					  </div>
					</div>
				</div>
				<div className="AppfeaturesFounder">
				 <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5 ">
				   <img width="300" alt="img" className="pure-img-responsive" src={images.md}/>
				 </div>
				 <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
				  <h2 className="content-head content-head-ribbon">Md Riyaz Ansari</h2>
				  <p style={{color:'white'}}>
				    Fullstack Developer
				  </p>
				  <p style={{color:'white'}}>
				    Currently studying in KONGU ENGINEERING COLLEGE IN TAMILNADU.
				   </p>
				 </div>
				</div>
				<div className="content">
				  <h2 className="content-head is-center">Know more About Me</h2>
				</div>
				<div className="Appfeatures">
				  <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
				    <form className="pure-form pure-form-stacked">
				      <fieldset>
				        <label htmlFor="name">Your Name</label>
				        <input id="name" type="text" placeholder="Your Name"/>

				        <label htmlFor="name">Email Name</label>
				        <input id="email" type="email" placeholder="Your Email"/>

				        <label htmlFor="name">Your Password</label>
				        <input id="password" type="password" placeholder="Your Password"/>

				        <button type="submit" className="pure-button">Sign Up</button>
				      </fieldset>
				     </form>
				  </div>
				   <div className="l-box-lrg pure-u-1 pure-u-md-3-5">
				   	<h2>Contact Us</h2>

				   </div>
				</div>
			</div>
		</div>
		)
	}
}