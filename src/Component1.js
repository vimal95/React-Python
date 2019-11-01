import React from 'react';
import writeUserData from './Component2';
export class student extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                userId:'',
                name:'',
                email:'',
                imageUrl:''
            }
        };
    }

    handleChange = (event) => {
        console.log(event.target.value);
        // let { data }= this.state;
        let data ={...this.state.data};
        data[event.target.name] = event.target.value;
        this.setState({data});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { data } = this.state;
        writeUserData(data);
    }
    
        render(){
            return(
                <div>
                    <h1 style={{textAlign:'center'}}>Guidanz College of IT</h1>
                    
                    <label>Register</label>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        User Name:
                        <input type="text" name="userId"  onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                        Name:
                        <input type="text" name="name" value={this.state.data.name} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                        Email:
                        <input type="text" name="email" value={this.state.data.email} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                        Avatar:
                        <input type="text" name="imageUrl" value={this.state.data.imageUrl} onChange={this.handleChange} />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
    }

export default student;