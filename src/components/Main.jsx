import { useState } from "react"

const Main = ({ setCurrentPage, roles, setRoles }) => {
    const [isOwnRole, setIsOwnRole] = useState(false)
    const [newRole, setNewRole] = useState('')
   
    const increaseCount = (id) => {
        setRoles(roleObj => roleObj.map((obj, i) => i === id ? {...obj, count: obj.count + 1}: obj ))
    }
    const decreaseCount = (id) => { 
        setRoles(prevRoles => prevRoles.map((obj, i) => i === id && obj.count>0 ? {...obj, count: obj.count -1 } : obj))
    }
    const addOwnRole = () => { 
        setIsOwnRole(!isOwnRole)
        { isOwnRole && setIsOwnRole('')}
       
    }
    const saveOwnRole = () => { 
        if (!newRole.trim()) return;
        const newRoleObj = { role: newRole, count: 1, image: '/img/dog.jpg',  description:""} 
        setRoles(prevRoles => [...prevRoles, newRoleObj])
        setNewRole('')
        
    }
    const delOwnRole = () => {
        setNewRole('');
        setIsOwnRole(false);
     }
    return <>
        <div className='main'>
           
        <h1>Выберете количество игроков</h1>
        <p>Учтите, что вам необходимо выбрать ведущего</p>

            <table>
                <tbody>
                {roles.map((role,id) => (
                <tr key={id}>
                    <td key={id} className='role'><p>{role.role}</p></td>
                    <td><button onClick={() => decreaseCount(id)}>-</button></td>
                    <td>{role.count}</td>
                    <td><button onClick={ ()=>increaseCount(id)}>+</button></td>    
                    
                  
                    
                    </tr>  
                ))}
                </tbody>
           
                
                      
            </table>
            <p className="main-p" onClick={() => addOwnRole()}>Добавьте собственную роль</p>
            {isOwnRole && (<div className="main__addBlock">
                <input value={newRole} onChange={(e)=>setNewRole(e.target.value)}/>
                <button className='addrole-btn' onClick={() => saveOwnRole()}>Добавить</button>
                <button className='addrole-btn' onClick={() => delOwnRole()}>Отмена</button>
            </div>)}
            <div className="bottom-panel">
          
                <button onClick={() => setCurrentPage('nameplayer')}>Продолжить</button>
                  <button onClick={() => setCurrentPage('welcome')}>Назад</button>
            </div>
       
        </div>
       
     </>
}
   
export default Main