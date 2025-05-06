const Welcome = ({ setCurrentPage }) => {
    
    return <>
        <div className="welcome">
            <div className="welcome__border">
            <h1>Мафия</h1>
            <p>Отличная игра для разумной компании</p>
             <button onClick={()=>setCurrentPage('main')}>Новая игра</button>
            </div>
           
        </div>
            
      
    </>
}
  
export default Welcome