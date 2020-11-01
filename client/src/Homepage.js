import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import loginImage from './images/login.png'
import ic1 from './images/ic1.png'
import ic2 from './images/ic2.png'
import ic3 from './images/ic3.png'
import ic4 from './images/ic4.png'
import fb from './images/fb.png'
import twt from './images/twt.png'
import gpl from './images/gpl.png'
import tumpnail from './images/tumpnail.png'
import appimage from './images/app-image.png'
import plystr from './images/ply-str.png'
import ft0 from './images/ft0.png'
import ft1 from './images/ft1.png'
import ft2 from './images/ft2.png'
import ft3 from './images/ft3.png'
import ft4 from './images/ft4.png'
import ft5 from './images/ft5.png'
import logo from "./images/logo.png"

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig"; /* Create this file */
const firebaseApp = firebase.initializeApp(firebaseConfig);

const client = axios.create({
  baseURL: "http://localhost:3001",
  json: true
});



export default function Homepage() {


  const [response, updateResponse] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [authStatus, updateAuthStatus] = useState(false);
  const [name,updateName] = useState("");

  useEffect(() => {
    // Listen to changes on the firebase authentication state
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateAuthStatus(true);
      } else {
        updateAuthStatus(false);
      }
    });
  }, []);

  const sendServerRequest = () => {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          client({
            method: "get",
            url: "/",
            headers: {
              AuthToken: idToken
            }
          })
            .then(res => updateResponse(res.data.message))
            .catch(error => updateResponse(`Error getting data! ${error}`));
        })
        .catch(error => updateResponse(`Error getting auth token! ${error}`));
    } else {
      updateResponse("You are not signed in");
    }
  };

  const register = () => {
    if (email.length === 0 || password.length === 0) {
      updateResponse("Please enter a username and password");
    } else {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => handleClose()
        )
        .catch(error => updateResponse(error.message));
    }
  };


  const signIn = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => handleSigninClose())
      .catch(() => updateResponse("Email or password incorrect"));
  };

  const logOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        updateEmail("");
        updatePassword("");
        updateResponse("");

      });
  };

  const [open, setOpen] = useState(false);
  const [openSignin,setOpenSignin] = useState(false);

const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));



const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};



const handleSigninOpen = () => {
  setOpenSignin(true);
};

const handleSigninClose = () => {
  setOpenSignin(false);
};

   return(
    <>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" type="text/css" href="css/mar-pad.css" />
    <link rel="stylesheet" type="text/css" href="css/pagestyle.css" />
    <title />
    <header className="header">
      <div className="container">
    

        <div className="row">
          <div className="col-md-3">
            <img src={logo} />
          </div>
          <div className="col-md-6">
            <ul className="topsrch">
              <li>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Country"
                />
              </li>
              <li>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type of Business"
                  />
                  <div className="input-group-prepend">
                    <button className="btn tobtn-green">SEARCH</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="toplinks">
            {authStatus ?<>
              <h4>Authenticated</h4>
              <li>
              <button onClick={() => logOut()} className="btn tobtn-green">Logout</button>
            </li>
              
              </> :<><h4>Not Authenticated</h4>

            <li>
            <a onClick={handleSigninOpen} >
              <img src={loginImage}  />
              Login 
            </a>
          </li>
          <li>
            <button onClick={handleClickOpen} className="btn tobtn-green">Join</button>
          </li>
     
            
              </> } 


            </ul>
          
            </div>
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
           
          <DialogTitle id="responsive-dialog-title">{"Enter Your Email to Login"}</DialogTitle>
            <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}

            onChange={input => updateName(input.target.value)}

          /> 
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={input => updateEmail(input.target.value)}
          /> 
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={input => updatePassword(input.target.value)}
        /> 
            </DialogContent>
            <DialogActions>
              <Button  onClick={() => register()} color="primary" autoFocus>
                Signup
              </Button>
            </DialogActions>
          </Dialog>
      
          <Dialog
          fullScreen={fullScreen}
          open={openSignin}
          onClose={handleSigninClose}
          aria-labelledby="responsive-dialog-title"
        >
         
        <DialogTitle id="responsive-dialog-title">{"Enter Your Email to Login"}</DialogTitle>
          <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={input => updateEmail(input.target.value)}
        /> 
        <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={input => updatePassword(input.target.value)}
      /> 
          </DialogContent>
          <DialogActions>
            <Button  onClick={() => signIn() } color="primary" autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>

      
      
          </div>
      </div>
    </header>
    <div className="banner-video">
      <div className="video-container">
        <video width="100%" height={760} controls>
          <source src="https://drive.google.com/file/d/14njvaPeDRnT2LReMkP0WlMi0KetHuDAD/view?usp=sharing" type="video/mp4" />
        </video>
      </div>
      <div className="bnrscearch">
        <h1 className="heading1">
          Discover Trusted Marijuana Businesse in
          <br />
          Your Communinty
        </h1>
        <p>Enter your city or zip code below:</p>
        <div className="bnr-search">
          <div className="input-group">
            <input type="text" className="form-control" />
            <div className="input-group-prepend">
              <button className="btn tobtn-green">SEARCH</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="now-to text-center margin-bottom-70">
        <h1 className="heading1 margin-top-50 margin-bottom-30 ">
          New to JointPlug?
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </p>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h1 className="heading1">Create an Account</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="ct-hld">
                <img src={ic1} alt="ic1" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ct-hld">
                <img src={ic2} alt="ic2"/>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ct-hld">
                <img src={ic3} alt="ic3" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ct-hld">
                <img src={ic4} alt ="ic4" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="crear-login">
            <h1 className="heading1">Login:</h1>
            <ul>
              <li>
                <a href="#">
                  <img src={fb} />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={twt} />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={gpl} />
                </a>
              </li>
            </ul>
            <p>Don't Have Account</p>
            <button className="btn btn-green creat-btn">Create an Account</button>
          </div>
        </div>
      </div>
    </div>
    <div className="black-bg">
      <h1 className="heading1">Marijuana News &amp; Events</h1>
      <div className="container" id="tourpackages-carousel">
        <div className="row">
          <div className="col-xs-18 col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={tumpnail} alt />
              <div className="caption">
                <p>October 27, 2020</p>
                <h4>How These 7 Amazing Women Changed the weed Industry?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facere, soluta, eligendi doloribus sunt minus amet sit debitis
                  repellat. Consectetur, culpa itaque odio similique suscipit
                </p>
                <a href="#" className="btn btn-green" role="button">
                  VIEW EVENT
                </a>
              </div>
            </div>
          </div>
          <div className="col-xs-18 col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={tumpnail} alt='thumbnail' />
              <div className="caption">
                <p>October 27, 2020</p>
                <h4>How These 7 Amazing Women Changed the weed Industry?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facere, soluta, eligendi doloribus sunt minus amet sit debitis
                  repellat. Consectetur, culpa itaque odio similique suscipit
                </p>
                <a href="#" className="btn btn-green" role="button">
                  VIEW EVENT
                </a>
              </div>
            </div>
          </div>
          <div className="col-xs-18 col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={tumpnail} alt />
              <div className="caption">
                <p>October 27, 2020</p>
                <h4>How These 7 Amazing Women Changed the weed Industry?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facere, soluta, eligendi doloribus sunt minus amet sit debitis
                  repellat. Consectetur, culpa itaque odio similique suscipit
                </p>
                <a href="#" className="btn btn-green" role="button">
                  VIEW EVENT
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End row */}
      </div>
      {/* End container */}
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={appimage} />
        </div>
        <div className="col-md-6">
          <h1 className="heading1 margin-bottom-18">Get the App</h1>
          <p className="discover margin-bottom-50">
            Discover local businesses. Find the best deals.
            <br /> Connect &amp; share wih friends.
          </p>
          <a href="#" className="margin-right-20 pull-left">
            <img src={plystr}  alt="ply-str" />
          </a>
          <a href="#" className="margin-right-20 pull-left">
            <img src={plystr}  alt="ply-str" />
          </a>
          <a href="#" className="margin-right-20 pull-left">
            <img src={plystr}  alt="ply-str" />
          </a>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="heading2">CORPRATE OFFICE</h1>
            <p>
              <img src={ft0} alt="ft0" /> 111, Tower A1, Loremlpsume Park,
              Gurugram India
            </p>
          </div>
          <div className="col-md-5">
            <h1 className="heading2">CONNECT WITH US</h1>
            <ul className="footer-socil">
              <li className>
                <a href="#">
                  <img src="./" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ft2} alt ="ft2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ft3} alt ="ft3" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ft4} alt ="ft4" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ft5}  alt ="ft5"/>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-12">
            <ul className="footelink">
              <li>COMPANY</li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
            </ul>
            <ul className="footelink">
              <li>USERS</li>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Register</a>
              </li>
              <li>
                <a href="#">Forget Password?</a>
              </li>
            </ul>
            <p className="text-center">JointPlug Pvt.Ltd. © 2012-2020</p>
          </div>
        </div>
      </div>
    </footer>
  </>)
  
}