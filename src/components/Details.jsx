const Details = ({setCurrentPage}) => { 
    return <>
      <h1>Details</h1>
      <button onClick={()=>setCurrentPage('welcome')}>back to home</button>
      <button onClick={()=>setCurrentPage('main')}>main page</button>
    </>
}
  
export default Details