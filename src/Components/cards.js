import {useState,useEffect,useContext} from "react";
import Context from "../context";
import axios from "axios";
function Card({match})
{
    const context = useContext(Context);
    const [card, setCard] = useState([]);


   //To  Fetch data
    let getsearch = async()=>{
        if(context.state.length !==0 || match.path==="/:id")
        {
            if(match.path==="/:id")
            {
                const {data} = await axios.get(`https://web-888.herokuapp.com/products/${match.params.id}`);
                console.log("search");
                console.log(data);
                setCard(data);
            }
            else
            {
             console.log("home");
             pagination(context.state);
            }
         }
        else
        {
            const {data} = await axios.get("https://web-888.herokuapp.com/products");
           
            pagination(data);
        }
    }
  useEffect(()=>{
           getsearch();
    },[]);


 //To Change States --> when params change
  useEffect(()=>{ 
                   getsearch();
                },[match.params.id]);




 //---> Pagination<---//

   let allvalues =[];

   let pagination = (data)=>{

    allvalues = [...data];
    console.log(allvalues);
   
    previousPage();
}
 
 let nextPage =()=>{
    
    if(allvalues.length===0)
    {
        allvalues = [...context.state];
        console.log(allvalues);
    }
    let temp=[];
      
      let startindex = context.pagenumber;
      let endindex = context.pagenumber+10;
      for(let i=startindex;i<endindex;i++)
      {
       temp.push(allvalues[i]);
      }
      setCard(temp);
      context.pagenumber= endindex;
      if(context.pagenumber >=allvalues.length)
      {
         context.pagenumber= allvalues.length-10;
      }
    
}
   let previousPage = ()=>{
       if(allvalues.length===0){ allvalues = [...context.state]; }
       let temp=[];
  
       let endindex = context.pagenumber;
       let startindex = context.pagenumber-10;
        for(let i=startindex;i<endindex;i++)
       {
         temp.push(allvalues[i]);
    
       }
        setCard(temp);

        context.pagenumber=startindex;
    
    if(context.pagenumber <=0){context.pagenumber=10;}
}

    return(
        <>
        <div className="container-fluid mt-4 cardgrid">
            {
              card.map((x)=>{
                return <div className="card" key={x._id}>
                    <img className="card-img-top cardimg" alt="laptops" style={{width:"100%"}} src={x.image}></img>
                    <div className="card-body">
                      <p className="title">{x.title}</p>
                      <p className="rating">Rating:{x.rating}</p>
                      <p className="finalprice">Final Price:{x.finalprice}</p>
                      <p className="price">price{x.price}</p>
                    </div>
                 </div>

              })
            }
       
        </div>
        {
            match.params.id ? (<></>):(
                <>
                <button type="button" className="btn btn-info mr-md-2 mb-4"onClick={nextPage}>Next</button>
                <button type="button" className="btn btn-info mr-md-2 mb-4" onClick={previousPage}>Previous</button>
                <button type="button" className="btn btn-info mr-md-2 mb-4"onClick={nextPage}>Next</button>
                </>
            )
        }
       
        </>
    );
}
export default Card;
