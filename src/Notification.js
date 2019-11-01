import React, { Component } from 'react';

import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';


import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
 
import axios from 'axios';
import EmailSettings from './EmailSettings';
import { thisExpression } from '@babel/types';



class Notification extends Component {

  constructor(props){
    super(props);
    this.state={name : '',
                id:'',
                bool:false,
                SenderEmail:'',
                receiverEmail:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageUpload=this.onImageUpload.bind(this);
    this.EmailSettings=this.EmailSettings.bind(this);
  }

 
  handleChange = event => {
      console.log(event);
       this.setState({ name: event});
  }

  onChangetext=(event)=>{

    this.setState({id:event.target.value})
    console.log(this.state.id)
  }

 handleSubmit = event => {
       event.preventDefault();
       const user = {
       id:this.state.id,
       name: this.state.name
       };
       if (this.state.id===null) {
         return null
       }
       else{
        axios.post('http://localhost:5003/vimal',{user})
        .then(res => {
        this.setState({bool:true})
        console.log(res);
         })
       }
 }

 onImageUpload = (fileList) => {

	const reader = new FileReader();
	reader.onloadend = () => {
		ReactSummernote.insertImage(reader.result);
  }
  reader.readAsDataURL(fileList[0]);
}

EmailSettings=()=>{

  return(
      <div>
          <label>Sender Email ID :  </label><input type='text' onChange={this.SenderEmail}></input>
          <br></br>
          <label>Receiver Email ID: </label><input type='text' onChange={this.receiverEmail}></input>
          <br></br>
          <input type="submit" onSubmit={this.onSubmitEmailSettings}></input>
      </div>
  );
}

SenderEmail=event=>{
  this.setState({SenderEmail:event.target.value})
  console.log(this.state.SenderEmail);
}

receiverEmail=event=>{
  this.setState({receiverEmail:event.target.value})
  console.log(this.state.receiverEmail);
}

onSubmitEmailSettings=event=>{
  event.preventDefault();
  const Email={ SenderEmail:this.state.SenderEmail,
    receiverEmail:this.state.receiverEmail
  }
  console.log(this.state.SenderEmail)
  console.log(this.state.receiverEmail)
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-Requested-With"
  }
  };
  axios.post('http://localhost:5003/mail',{Email},{options})
  .then(res => {
    console.log(res);
     })

}
 

  render() {
    const a= (<div>
      <label>Sender Email ID :  </label><input type='text' onChange={this.SenderEmail}></input>
      <br></br>
      <label>Receiver Email ID: </label><input type='text' onChange={this.receiverEmail}></input>
      <br></br>
      <input type="submit" onClick={this.onSubmitEmailSettings}></input>
  </div>)

    return (
      
      <form  className='summmer' >
        
        <label>Template Name:</label>
        <input type="text" name="inputName" onChange={this.onChangetext}></input>
        
        <ReactSummernote
        options={{
          height: 700,
          width:1000,
          dialogsInBody: true,
          DragAndDrop: true,
          background:'black',
          
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline','fontsize','clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['picture', 'link', 'video']],
            ['view', ['fullscreen','undo','redo' ,'codeview','help']]
          ]
          }}
        onChange={this.handleChange}  
        onImageUpload={this.onImageUpload}
      />
      <input type="submit" onClick={this.handleSubmit} />
        <div>
          { 
            this.state.bool===true ? a : null
          }
        </div>
      </form>
    );
      }
}
export default Notification;