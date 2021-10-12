import React, {useEffect} from 'react'
import Cookies, { set } from 'js-cookie'
import './Result.css'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import logosrc from './Logo.png'
import PreviewIcon from '@material-ui/icons/Web';
function Results() {
    const [term, setterm] = React.useState(Cookies.get('search'))
    const [result, setresult] = React.useState(0)
    const [as, setas] = React.useState([])
    const [blocked, setblocked] = React.useState('')
    const API_KEY = 'AIzaSyAKzWS5hdKBbh35qLEcovymHgFdnQmPZtw'
    const CX = 'c3f1793ef64e3afd7'
    let fin = ''
    let ars = []
    var account_details = JSON.parse(Cookies.get('account'))
    const custom_style = {
        top: '28px',
        left: '163px',
        position: 'absolute',
        boxShadow: '0px 0px 21px 1px #000c0aa3'
    }
    /*Google Hook*/
    useEffect(() => {
        async function GoogleHook() {
            await axios.get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&q=${term}&cx=${CX}`).then(response => {
                setresult(response)
            })
            
        }
        GoogleHook();
    }, [])
    console.log(result)
    const Card =()=>{
        if (result!==0){
            return(
                <div className="Cardar"> 
                    <div className="Cardimg">
                        <img style={{width: '150px'}} src={result.data.items[0].pagemap.cse_image[0].src}/>
                        <img style={{width: '150px'}} src={result.data.items[1].pagemap.cse_image[0].src}/>
                    </div>
                    <h2>{result.data.items[0].title}</h2><br />
                    <h4>{result.data.items[0].snippet}</h4>
                </div>
            )
        }
        else{
            return(
                <div>Loading...</div>
            )
        }
    }
    const ResultItem =({link, title, snippet, id})=>{
        return(
            <div className="item">
                <div className="container_web">
                    <iframe src={link} id={id}></iframe>
                </div>
                <div className="link-title">
                    <a href={link} className="link_web">
                        <a href={link} style={{color: '#000'}} className="link_web">{link}</a><br />
                        <a href={link} className="itemtitle">{title}</a>
                    </a> <PreviewIcon className="web-icon" onClick={() =>{}} />
                    <div className="snippet">
                        {snippet}
                    </div>
                </div>
            </div>
        )
    }
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
    const Resultin =()=>{
        if (result===0){
            return(
                <h1 style={{fontFamily: 'Plus', color: 'white'}}>Loading...</h1>
            )
        }else{
            return(
                <div style={{width: '58vw'}}>
                    {result.data.items.map(e=><div><ResultItem link={e.link} title={e.title} snippet={e.snippet} id={makeid(5)}/><br /></div>)}
                </div>
            )
            }
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
    return (
        <div className="results-page" >
            <div className="results-area">
                <div className="results-search-logo">
                <div className="logo-img"><img src={logosrc} alt="logo" style={{    position: 'absolute',top: '25px',left: '75px',}}/></div>
                <div style={custom_style} className="search-bar-container">
                    <div className="search-bar">
                        <input id="search-bar-value"/> <IconButton id="search-button"style={{position: 'absolute', top: '4px', right: '3px', zIndex: '1'}} onClick={()=>{searched(document.getElementById('search-bar-value').value)}}><SearchIcon /></IconButton>
                    </div>
                </div>
                </div>
                <Resultin />
                <div>
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Results
