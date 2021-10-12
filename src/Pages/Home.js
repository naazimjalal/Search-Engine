import React from 'react'
import './Home.css'
import logosrc from '../Pages/Logo.png'
import Avatar from '@material-ui/core/Avatar'
import History from '@material-ui/icons/History'
import Block from '@material-ui/icons/Block'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { useOpenWeather } from 'react-open-weather';
import Backdrop from '@material-ui/core/Backdrop'
import IconButton from '@material-ui/core/IconButton'
import Cookies from 'js-cookie'
import GoogleLogin from 'react-google-login';
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase';
import firebaseConfig from '../database/db'
function Home() {
    const [datawe, setdatawe] = React.useState('')
    const [open, setopen] = React.useState(false)
    const [searchterm, setsearchterm] = React.useState([])
    const [blocked, setblocked] = React.useState('')
    const [as, setas] = React.useState([])
    let a = 0
    let fin = ''
    let ars = []
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
       }
       return result;
    }
    
    React.useEffect(() => {
        if (blocked!==''){
            var result = [];
            for(var i in blocked.users)
                result.push([i, blocked.users [i]]);
                for(var j in result)
                    if (result[j][0]===account_details[4]){
                        fin=result[j][1].blocked
                        for(var k in fin)
                            ars.push(k)
                    }
            setas(ars)
        }
    }, [blocked])
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const Widget=({content})=>{
        return(
            <div className="widg">
                <Paper><div className="">{content}</div></Paper>
            </div>
        )
    }
     
    const weather_style = {
        color: 'white',
        background: 'linear-gradient(135deg, rgb(60 77 238), rgb(127 180 250))',
    }
     
    const { data } = useOpenWeather({
        key: '52930a5d94848ef419cc6d7070082bc7',
        lat: '9.9312',
        lon: '76.2673',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
        });
    const Mapped=()=>{
        if (as.length>0){
            return(
                <div>
                    {as.map(errr=><div style={{fontSize: '20px', padding: '1px 16px', fontFamily: 'Plus'}}>{errr}</div>)}
                </div>
            )
        }else{
            return(
                <div>
                    {searchterm.map(e=><div style={{fontSize: '20px', padding: '1px 16px', fontFamily: 'Plus'}}>{e}</div>)}
                </div>
            )
        }
    }
    const Blocked=()=>{
        if (JSON.parse(Cookies.get('account'))[0]==='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'){
            return(
                <div>
                    <h3>click on the icon towards the extreme right and sign in to use this function</h3>
                </div>
            )
        }else{
            return(
                <div>
                    <Mapped />
                    <TextField onKeyPress={onKeyPress} style={{    position: 'absolute', bottom: '13px', marginLeft: 'auto', justifyContent: 'center', display:'flex', left: '28px'}}id="outlined-basic" label="Enter a Search Term" variant="outlined" />
                </div>
            )
        }
    }
    const Set=()=>{
        let date = ''
        let temp = ''
        let wind = ''
        let hum = ''
        let icon = ''
        if (data!==null){
            setdatawe(data)
        }
        if (datawe!==undefined){
            if (datawe.current!==undefined){
                if (datawe.current.date!==undefined){
                    date = datawe.current.date
                }
                if (datawe.current.icon!==undefined){
                    icon = datawe.current.icon
                }
                if (datawe.current.humidity!==undefined){
                    hum = datawe.current.humidity
                }
                if (datawe.current.wind!==undefined){
                    wind = datawe.current.wind
                }
                if (datawe.current.temperature!==undefined){
                    if (datawe.current.temperature.current!==undefined){
                        temp = datawe.current.temperature.current
                    }
                }
                
            }
            
        }
        return(
            <div className="widg">
            <Paper style={weather_style}>
                <div className=""> <div><h3 className="title">Kochi</h3> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 -5 35 40" className="svg-1-2-26 svg-d1-1-2-28"><path d={icon}></path></svg>
                </div><div className="weather-text">
                {date}<br/>
                temp: {temp}°C<br/>
                wind: {wind}km/h<br/>
                humidity: {hum}%
                    </div></div></Paper>
        </div>
        )
    }
    if (Cookies.get('account')===undefined) {
        Cookies.set('account', ['https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', " ", " ", " "])
        if (Cookies.get('blocked')===undefined) {
            Cookies.set('blocked', [])
        }
    }
    var account_details = JSON.parse(Cookies.get('account'))
    if (account_details[0]!=="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"){
        firebase.database().ref(`/users/${account_details[4]}/email`).set(account_details[3])
        firebase.database().ref(`/users/${account_details[4]}/name`).set(account_details[1])
        firebase.database().ref(`/users/${account_details[4]}/image`).set(account_details[0])
    }
    const responseGoogle = (response) => {
        Cookies.set('account', [response.profileObj.imageUrl, response.profileObj.name, response.profileObj.familyName, response.profileObj.email, makeid(11)])
        window.location.href = '/'
      }
    function searched(searchvalue){
         
            if(as.indexOf(searchvalue) !== -1){
                alert("blocked")
            }
            else{
                console.log(searchvalue)
                Cookies.set('search', searchvalue)
                window.location.href = '/results'
            }
    }
    const check =()=>{
        if (a===0){
            setopen(false)
            document.getElementById('search-button').style.zIndex = '1';
        }
    }
    const onKeyPress = (event)=>{
        
        if (event.key === 'Enter'){
            setsearchterm(oldArray => [...oldArray, event.target.value ] )
            firebase.database().ref(`/users/${account_details[4]}/blocked/${event.target.value}`).set(event.target.value)
            event.target.value = ''
        }
        
    }
    function dataref(){
        setopen(true);
        document.getElementById('blockpaper').style.visibility = 'visible';
        document.getElementById('search-button').style.zIndex = '-1';
        document.getElementById('Subhere').style.visibility = 'hidden';
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            {/*firebase.analytics();*/}
        }
        let ref = firebase.database().ref('/');
        ref.on('value', snapshot => {
            setblocked(snapshot.val())
        })
    }
    function datarefe(){
        console.log(JSON.parse(Cookies.get('account'))[0].length)
        if (JSON.parse(Cookies.get('account'))[0].length>0){
            if (JSON.parse(Cookies.get('account'))[0]!=='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'){
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                    {/*firebase.analytics();*/}
                }
                let ref = firebase.database().ref('/');
                ref.on('value', snapshot => {
                    setblocked(snapshot.val())
                })}
            }   
            
    }
    return (
        <div className="Home-page" onLoad={()=>{setsearchterm(JSON.parse(Cookies.get('blocked')))}}> 
                <Backdrop id="backdrop"
                style={{ color: '#fff', zIndex: "1"}}
                open={open}
                onClick={()=>{check(); a =0}}
            >
                 <Paper id ="Subhere"style={{height: '71vh', width: '271px', position: 'absolute', right: '15px', visibility: 'visible', top: '92px',}}>
                    <div>
                    <Avatar id="avatar_stat" src={account_details[0]}></Avatar>
                    </div>
                    <div className="details">
                        <div className="details-info">First Name : {account_details[1]}</div>
                        <div className="details-info">Last Name : {account_details[2]}</div>
                        <div className="details-info">Email  : {account_details[3]}</div>
                    </div>
                    <div className="google-button">
                    <GoogleLogin
                        clientId="284447626447-vt0r0hemf2smapmgfrf147c6kf8t8vcr.apps.googleusercontent.com"
                        buttonText="Continue With Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div>
                 </Paper>
                 <Paper onClick={()=>{a=1}} id ="blockpaper" style={{height: '71vh', width: '271px', position: 'absolute', right: '15px', visibility: 'visible', top: '92px',}}>
                    <div>
                    <h3 className="blocked-title">Blocked Terms</h3>
                    </div>
                    <Blocked />
                 </Paper>
            </Backdrop>
            
            <header className="app-bar" onLoad={datarefe}>
                <div id="bimg" className="app-bar">
                    <div className="logo-img"><img src={logosrc} alt="logo"/></div>
                    <div className="logo-text"><h2>N o r t h &emsp; L a n d s</h2></div>
                </div>
                <div className="icons">
                <History style={{fontSize: '46px',color: "white", position: 'relative', top:' -3px',zIndex: '1'}}/>&emsp;
                    <Block onClick={dataref}style={{fontSize: '46px',color: "white", position: 'relative', top:' -3px',zIndex: '1'}}/>&emsp;
                    <Avatar onClick={()=>{setopen(true); document.getElementById('Subhere').style.visibility = 'visible';document.getElementById('blockpaper').style.visibility = 'hidden';document.getElementById('search-button').style.zIndex = '-1';}} id="avatar" src={account_details[0]}></Avatar>
                </div>
            </header>
            <div className="canvas">
                <div className="search-bar-container">
                    <div className="search-bar">
                        <input id="search-bar-value"/> <IconButton id="search-button"style={{position: 'absolute', top: '4px', right: '3px', zIndex: '1'}} onClick={()=>{searched(document.getElementById('search-bar-value').value)}}><SearchIcon /></IconButton>
                    </div>
                </div>
                <div className="widgets">
                    <Widget content="Adverstisement here"/>
                   <Set />
                     
                    <div className="widg">
                        <Paper style={{ background: 'linear-gradient(160deg, rgb(10, 10, 10), rgb(70, 70, 70))', color: 'white',}}>
                            <div className=""> <h3 className="title">Abbreviation of the day</h3> <div className="title-of"> SSDD </div>
                             </div>
                             <div className="meaning">Same stuff, different day</div>
                                                <div className="sta">Internet Slang</div>
                            </Paper>
                    </div>
                     
                </div>
            </div>
        </div>
    )
    
}

export default Home
