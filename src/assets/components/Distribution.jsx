import React, { useState, useEffect } from 'react';
import { SlClose } from "react-icons/sl";
import { FaRandom } from "react-icons/fa";
const Distribution = ({ setCurrentPage, roles, players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerRoles, setPlayerRoles] = useState({});
  const [shuffledRoles, setShuffledRoles] = useState([]);

  // Функция для создания и перемешивания ролей
  const shuffleRoles = () => {
    const rolesPool = [];
    roles.forEach(role => {
      for (let i = 0; i < role.count; i++) {
        rolesPool.push({
          name: role.role,
          description: role.description,
          image: role.image 
        });
      }
    });

    // Алгоритм Фишера-Йетса для перемешивания
    const shuffled = [...rolesPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };

  // Распределение ролей по игрокам
  const assignRoles = (rolesToAssign) => {
    const assignedRoles = {};
    players.forEach((player, index) => {
      assignedRoles[player.id] = rolesToAssign[index];
    });
    return assignedRoles;
  };

  // Первоначальное распределение ролей
  useEffect(() => {
    const shuffled = shuffleRoles();
    setShuffledRoles(shuffled);
    setPlayerRoles(assignRoles(shuffled));
  }, [roles, players]);

  // Функция для повторного перемешивания
  const reshuffleRoles = () => {
    const newShuffled = shuffleRoles();
    setShuffledRoles(newShuffled);
    setPlayerRoles(assignRoles(newShuffled));
    setSelectedPlayer(null); // Сбрасываем открытую карточку
  };

  const showRoleCard = (playerId) => {
    setSelectedPlayer({
      id: playerId,
      name: players.find(p => p.id === playerId).name,
      role: playerRoles[playerId]
    });
  };

  return (
    <div className="distribution-container">
      <h1>Распределение ролей</h1>
      <p>После того как все игроки посмотрят свои роли вы можете начать игру</p>
      
      <div className="players-grid">
        {players.map(player => (
          <button
            key={player.id}
            onClick={() => showRoleCard(player.id)}
            className="player-card"
          >
            {player.name}
          </button>
        ))}
      </div>
      
      {selectedPlayer && (
        <div className="role-overlay">
          <div className="role-card">
            <h2>{selectedPlayer.name}</h2>
            <div className="role-info">
              <p className="role-title">Ваша роль:</p>
              <p className="role-name">{selectedPlayer.role.name}</p>
              <img 
                src={selectedPlayer.role.image} 
                alt={selectedPlayer.role.name}
                className="role-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error('Error loading image:', selectedPlayer.role.image);
                }}
              />
              <p className="role-description">{selectedPlayer.role.description}</p>
            </div>
            <button onClick={() => setSelectedPlayer(null)} className="close-btn">
              <SlClose />
            </button>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        <button 
          onClick={reshuffleRoles} 
          className="shuffle-btn"
          title="Перемешать роли заново"
        >
          <FaRandom /> Перемешать
        </button>
        
        <button 
          onClick={() => setCurrentPage('nameplayer')} 
          className="back-btn"
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default Distribution;