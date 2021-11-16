import {Link} from "react-router-dom";
import{useState} from "react";
function Nav()
{
     const [path,setPath] = useState("");

     let handleChange=(value)=>{
         setPath(value);
         console.log(value);
     }

    return(
        <>
        <div className="navbar navbar-expand-md bg-primary navbar-primary">
            <span className="navbar-brand text-white text-bold font-times new roman">Web Scarping</span>
            < span className="navbar-brand text-white text-bold font-times new roman">Application to Display the Product info with React & Node.js</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynavbar">
             <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="mynavbar">
              <ul className ="navbar-nav ml-auto mr-md-4">
                  <li className="Nav-item">
                   <Link className="nav-link text-bold mr-md-3" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <form className="form-inline mt-md-0 mt-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Please Enter Brand " id="demo" name="search" 
                      onChange={(event)=>{handleChange(event.target.value)}}
                      />
                      <div className="input-group-append">
                       <Link className=" btn btn-success" to={`/${path}`}>
                       <i className="fas fa-search"></i>
                       </Link>
                      </div>
                     </div>

                    </form>
                  </li>
              </ul>
            </div>
          </div>  
        </>
    );
}

export default Nav;