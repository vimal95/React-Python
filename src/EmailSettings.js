import React, { Component } from 'react';
import axios from 'axios';

function EmailSettings(){


        return(
            <form>
                <label>Sender Email ID :  </label><input type='text'></input>
                <br></br>
                <label>Receiver Email ID: </label><input type='text'></input>
                <br></br>
                <input type="submit"></input>
            </form>
        );
}

export default EmailSettings;