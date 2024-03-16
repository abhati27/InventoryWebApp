import { useEffect, useState } from "react";
 
const Nums = ()=>{
    /* Any react function must have a return method which must return JSX */
    const [arry,setArry] = useState([]);
    useEffect(()=>{
        setArry([2,4,1,6,8,7]);
    },[]);
    const sortArry=(direction)=>{
        let tempArry = arry;
         switch (direction) {
           case "ASC":
            tempArry = tempArry.sort((a, b) => a - b)
             setArry(tempArry)
             console.log(arry)
             break;
           case "DESC":
             setArry(tempArry.sort((a, b) => b - a))
             console.log(arry)
             break;
           default:
            setArry(tempArry)
            break;
         }
    }
    return(
        <div style={{marginLeft: '5px'}}> 
            <div>
                <h3>Nums Component</h3>
            </div>
            <div>
                {/* Each child in a list should have a unique "key" prop. */}
                 {
                    arry.map((e,index)=> <li key={index}>{e}</li> )
                 } 
                 <hr />
                 <button onClick={()=>sortArry('ASC')}>Sort-ASC</button> &nbsp;&nbsp;
                 <button onClick={()=>sortArry('DESC')}>Sort-DESC</button>&nbsp;&nbsp;
                 <button onClick={()=>sortArry('RESET')}>Reset</button>
            </div>
        </div>
    )
}

export default Nums; 

 