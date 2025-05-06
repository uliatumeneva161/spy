import React, { useState, useRef, useEffect } from 'react';

const NamePlayer = ({ setCurrentPage, roles, players, setPlayers }) => {
  const calculateTotalPlayers = () => roles.reduce((total, role) => total + role.count, 0);
  const inputRefs = useRef([]);
  const [showValidationError, setShowValidationError] = useState(false);

  useEffect(() => {
    const totalPlayers = calculateTotalPlayers();
    setPlayers(
      Array(totalPlayers).fill(null).map((_, index) => ({
        id: index,
        name: ''
      }))
    );
  }, [roles]);

  const updatePlayerName = (playerId, newName) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === playerId ? { ...player, name: newName } : player
      )
    );
    setShowValidationError(false);
  };

  const handleEnterKeyPress = (event, currentIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (nextIndex < players.length) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const removePlayer = (playerId) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
  };

  const hasMinimumPlayers = players.length >= 3;
  const allNamesFilled = players.every(player => player.name.trim());
  const canContinue = hasMinimumPlayers && allNamesFilled;

  const proceedToNextPage = () => {
    if (canContinue) {
      setCurrentPage('distribution');
    } else {
      setShowValidationError(true);
    }
  };

  return (
    <div className="main">
      <h1>Введите имена игроков</h1>
      
      {hasMinimumPlayers ? (
        <p>Каждому игроку будет назначена уникальная роль</p>
      ) : (
        <strong>Требуется минимум 3 игрока для начала игры</strong>
      )}
      
      <ul>
        {players.map((player, index) => (
          <li key={player.id}>
            <input
              ref={el => (inputRefs.current[index] = el)}
              value={player.name}
              onChange={(e) => updatePlayerName(player.id, e.target.value)}
              onKeyDown={(e) => handleEnterKeyPress(e, index)}
              placeholder={`Игрок ${index + 1}`}
              aria-label={`Имя игрока ${index + 1}`}
            />
            {players.length > 3 && (
              <button onClick={() => removePlayer(player.id)}>
                Удалить
              </button>
            )}
          </li>
        ))}
      </ul>

      {showValidationError && (
        <p>Пожалуйста, укажите имена всех игроков</p>
      )}
      
      <div className="bottom-panel">
        <button
          onClick={proceedToNextPage}
          disabled={!canContinue}
        >
          Продолжить
        </button>
        <button onClick={() => setCurrentPage('main')}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default NamePlayer;