import React from 'react';
import { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import LoginForm from './loginForm';
import ReactDOM from 'react-dom';

//http://sterling.ghost.io/working-with-jqueryui-and-reactjs-components/
export default class LoginComponent extends Component {
        
       
        
        componentDidMount()
        {

 
        }

        openDialog(ev)
        {
            ev.preventDefault();
            var dLoc =  $("<div id='dLoc'>").appendTo('body');
             
            var $dialog = dLoc.dialog({
                         title: 'Login',
                         'resizable':false,
                         'modal':true,
                         'dialogClass': 'loginDialog',
                         'width':500,
                         'height':270,
                         'minHeight':270,
                        'draggable': false ,
                close: function(e){
                     ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode($dialog[0]).parentNode);
                     $( this ).remove();
                    }
            });
            
               
             ReactDOM.render(<LoginForm   jqueryDialogRef={$dialog} />, $dialog[0])
            
        }
        


        render() {

           
                  
                    return(
                    <button className="btn btn-primary" onClick= {this.openDialog}>Login</button>
                    )

                    
           


 
                }
        
}