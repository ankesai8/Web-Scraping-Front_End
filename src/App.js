import "./App.css";
import axios from "axios";
import Context from "./context";
import Card from "./Components/cards";
import Navbar from "./Components/Navbar";
import {useState,useEffect} from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";


function App() {
   const [state,setState] = useState([]);
    //Pagination
    let pagenumber=10;
   let getdata= async()=>{
       const {data} = await axios.get("https://web-888.herokuapp.com/products");
       console.log(data);
       setState(data);
   }
   
   useEffect(()=>{
     getdata();
   },[])

  return (
    <>
   <Context.Provider value ={{ state, setState, pagenumber}}>
   <BrowserRouter>
   <Navbar />

   <Switch>
     <Route exact path="/" component={Card}></Route>
     <Route path="/:id" component={Card}></Route>
   </Switch>

   </BrowserRouter>
   </Context.Provider>
  
    </>
  );
}

export default App;

//build added
