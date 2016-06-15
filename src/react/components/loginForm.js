import React from 'react';
import { Component } from 'react';


//http://sterling.ghost.io/working-with-jqueryui-and-reactjs-components/
export default class LoginForm extends Component {
        
      constructor(props)
        {
            super(props);
            //console.log(props.jqueryDialogRef[0].toString())
        }
 
    handleSubmit(ev)
    {
        ev.preventDefault();
        console.log("hit submit");
        this.props.jqueryDialogRef.dialog('close');
        
    }
    render()
    {
            return (
                <div>
                 
                    <div id = "loginDialog">

                        <h3>Login To Deviant Art</h3>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <table className="table">
                            <tbody>
                            <tr><th>User Name:</th><td><input type="text" size="20" id="name" /></td></tr>
                            <tr><th>Password:</th><td><input type="password" size="20" id="password" /></td></tr>
                            <tr><td colSpan="2"><button onClick={this.handleSubmit.bind(this)} className="btn btn-red">Login</button></td></tr>
                            </tbody>

                            </table>
                        </form>
                    </div>
                 </div>
        
        )
    
    }


}