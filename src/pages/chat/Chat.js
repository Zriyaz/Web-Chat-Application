import React from "react"
import LoginString from "../login/loginStrings"
import firebase from "../../services/firebase"
import "./Chat.css"
import ReactLoading from 'react-loading'

export default class Chat extends React.Component{
	constructor(props){
		super(props)
    this.state={
      isLoading: true,
      isOpenDialogConfirmLogout :false,
      currentPeerUser:null,
      displayedContactSwitchedNotification:[],
      displayedContacts:[]
    }
		this.currentUserName = localStorage.getItem(LoginString.Name)
    this.currentUserId = localStorage.getItem(LoginString.ID)
    this.currentUserPhoto =localStorage.getItem(LoginString.PhotoRUL) 
    this.currentUserDocumentId=localStorage.getItem(LoginString.FirebaseDocumentId)

    
    this.currentUserMessages=[]
    this.searchUsers=[]
    this.notificationMessagesErase = []

    this.onProfileClick=this.onProfileClick.bind(this)
    this.getListUsers=this.getListUsers.bind(this)
    this.renderListUser = this.renderListUser.bind(this)
    this.getClassNameForUserAndNotification=this.getClassNameForUserAndNotification.bind(this)
    this.notificationErase = this.notificationErase.bind(this)
    this.updateRenderList = this.updateRenderList.bind(this)
	}
	logout=()=>{
		firebase.auth().signOut()
		this.props.history.push('/')
		localStorage.clear()
	}
  onProfileClick = ()=>{
    this.props.history.push('/profile')
  }
  componentDidMount(){
    firebase.firestore().collection('users').doc(this.currentUserDocumentId).get()
    .then((doc)=>{
      doc.data().messages.map((item)=>{
        this.currentUserMessages.push({
          notificationId:item.notificationId,
          number:item.number
        })
      })
      this.setState({
        displayedContactSwitched:this.currentUserMessages
      })
    })
    this.getListUsers()
  }
  getListUsers = async ()=>{
    const result = await firebase.firestore().collection('users').get()
    if(result.docs.length>0){
      let listUsers=[]
      listUsers = [...result]
      listUsers.forEach((item, index)=>{
        this.searchUsers.push({
          key:index,
          documentKey:item.id,
          id:item.data().id,
          name:item.data().name,
          URL:item.data().URL,
          description:item.data().description, 
        })
      })
      this.setState({
        isLoading:false,

      })
    }
    this.renderListUser()
  }
  getClassNameForUserAndNotification = (itemId)=>{
    let number = 0
    let className= ''
    let check = false
    if(this.state.currentPeerUser && this.state.currentPeerUser.id == itemId){
      className = 'viewWrapItemFocused'
    }else{
      this.state.displayedContactSwitchedNotification.forEach((item)=>{
        if(item.notificationId.length> 0 ){
          if(item.notificationId === itemId){
             check=true
             number = item.number
          }
        }
      })
      if(check===true){
        className='viewWrapItemFocused'
      }else{
        className='viewWrapItem'
      }
    }
    return className
  }

  notificationErase=(itemId)=>{
    this.state.displayedContactSwitchedNotification.forEach(()=>{
      if(itemId.notificationId.length> 0 ){
        this.notificationMessagesErase.push(
          {
            notificationId:itemId.notificationId,
            number:itemId.number
          }
        )
        
      }
    })
    this.updateRenderList()
  }
  updateRenderList = () =>{
    firebase.firestore().collection('users').doc(this.currentUserDocumentId).update(
      {messages:this.notificationMessagesErase}
    )
    this.setState({
      displayedContactSwitchedNotification: this.notificationMessagesErase
    })
  }

  renderListUser=()=>{
    if(this.searchUsers.length>0){
      let viewListUser = []
      let classname= ''
      this.searchUsers.map((item)=>{
        if(item.id!=this.currentUserId){
          classname=this.getClassNameForUserAndNotification(item.id)
          viewListUser.push(
            <button id={item.key} 
            clasName = {classname}
            onClick = {()=>{
              this.notificationErase(item.id)
              this.setState({currentPeerUser:item})
              document.getElementById(item.key).style.backgroundColor='#fff'
              document.getElementById(item.key).style.color='#fff'
            }}

            >
             <img className="viewAvatarItem" src={item.URL} alt="" />
             <div clasName="viewWrapContactItem">
               <span clasName="textItem">
                 {`Name : ${item.name}`}
               </span>
             </div>
              {classname === 'viewWrapItemNotification' ? 
              <div clasName="notificationparagraph">
                <p id={item.key} clasName="newmessages">New Messages</p>
              </div> : null}
            </button>
          )
        }
      })
       this.setState({
         displayedContacts:viewListUser

       })
    }else{
      console.log('no user is present')
    }
  }
	render(){
		return(
      <div clasName="root">
        <div clasName="body">
          <div clasName="viewListUser">
            <div clasName="profileviewleftside">
              <img  
               className="profilePicture"
               alt="" 
               src={this.currentUserPhoto}
               onClick={this.onProfileClick}
                />
                <button className="Logout" onClick={this.logout}>Logout</button>
            </div>
            {this.state.displayedContacts}
          </div>
        </div>
      </div>
		)
	}
}
