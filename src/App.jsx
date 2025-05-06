// App.jsx
import { useState } from 'react'
import './App.css'
import Welcome from './assets/components/Welcome'
import Main from './assets/components/Main'
import Details from './assets/components/Details'
import NamePlayer from './assets/components/NamePlayer'
import Distribution from './assets/components/Distribution'

function App() {
  
  const [roles, setRoles] = useState([
    { 
      role: "Мафия", 
      count: 0, 
      description: "Ночью убивает мирных жителей",
      image: "/img/mafia.jpg"  
    }, 
    { 
      role: "Мирный житель", 
      count: 0, 
      description: "Днем пытается найти мафию",
      image: "/img/mir.jpg"   
    }, 
    { 
      role: "Доктор", 
      count: 0, 
      description: "Может лечить игроков ночью",
      image: "/img/doctor.jpg"  
    }, 
    { 
      role: "Шериф", 
      count: 0, 
      description: "Может проверять игроков на принадлежность к мафии",
      image: "/img/police.jpg" 
    },
    { 
      role: "Маньяк", 
      count: 0, 
      description: "Убивает всех подряд",
      image: "/img/killer.jpg" 
    }
  ]);
  // const [roles, setRoles] = useState([
  //   { 
  //     role: "Мафия", 
  //     count: 0, 
  //     description: "Ночью убивает мирных жителей", 
  //     image: mafiaImage 
  //   }, 
  //   { 
  //     role: "Мирный житель", 
  //     count: 0, 
  //     description: "Днем пытается найти мафию", 
  //     image: civilianImage 
  //   }, 
  //   { 
  //     role: "Доктор", 
  //     count: 0, 
  //     description: "Может лечить игроков ночью", 
  //     image: doctorImage 
  //   }, 
  //   { 
  //     role: "Шериф", 
  //     count: 0, 
  //     description: "Может проверять игроков на принадлежность к мафии", 
  //     image: sheriffImage 
  //   },
  //   { 
  //     role: "Маньяк", 
  //     count: 0, 
  //     description: "Убивает всех подряд", 
  //     image: maniacImage 
  //   }
  // ]);


  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <div className="app">
      {currentPage === 'welcome' && <Welcome setCurrentPage={setCurrentPage} />}
      {currentPage === 'main' && <Main roles={roles} setRoles={setRoles} setCurrentPage={setCurrentPage} />}
      {currentPage === 'nameplayer' && (
        <NamePlayer 
          roles={roles} 
          setCurrentPage={setCurrentPage}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {currentPage === 'distribution' && (
        <Distribution 
          roles={roles} 
          setCurrentPage={setCurrentPage}
          players={players}
        />
      )}
      {currentPage === 'details' && <Details setCurrentPage={setCurrentPage}/>}
    </div>
  )
}

export default App;