import { useEffect } from "react";
const Collection = () => {

    useEffect(()=> {
        const getCollection = async () => {
            const data = await fetch("http://localhost:8000/collection/collection", {
                method: 'GET',
                
            })
        }

    },[])
    return(
        <div>My Collection</div>
        
    )
}

export default Collection;