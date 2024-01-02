import React, { useState } from 'react';
import styles from './QuestionsPanel.module.css';

interface QuestionsPanelProps {
  onClose: (selectedPriority: string | null) => void;
  selectedTransportationMode: string | null;
}

const QuestionsPanel: React.FC<QuestionsPanelProps> = ({ onClose, selectedTransportationMode }) => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [busQuestionAnswer, setBusQuestionAnswer] = useState<string | null>(null);
  const [opusCardType, setOpusCardType] = useState<string | null>(null);
  const [carQuestionAnswer, setCarQuestionAnswer] = useState<string | null>(null);
  const [toyotaModelCar, setToyotaModelCar] = useState<string | null>(null);
  const [volkswagenModelCar, setVolkswagenModelCar] = useState<string | null>(null);

  const renderQuestions = () => {
    switch (selectedTransportationMode) {
      case 'car':
        return (
          <>
            <label htmlFor="carQuestion">What is your car brand?</label>
            <select
              id="carQuestionAnswer"
              value={carQuestionAnswer ?? ''}
              onChange={(e) => setCarQuestionAnswer(e.target.value)}
            >
            <option value="" disabled>Select an option</option>
            <option value="Toyota">Toyota</option>
            <option value="Volkswagen">Volkswagen</option>
            </select>
            {carQuestionAnswer === 'Toyota' && (
              <>
                <label htmlFor="toyotaModelCar">What is your car model?</label>
                <select
                  id="toyotaModelCar"
                  value={toyotaModelCar ?? ''}
                  onChange={(e) => setToyotaModelCar(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="Yaris">Yaris</option>
                  <option value="Echo">Echo</option>
                  <option value="Matrix">Matrix</option>
                  <option value="Corolla">Corolla</option>
                  <option value="Camry">Camry</option>
                  <option value="Rav4">Rav4</option>
                </select>
              </>
                )}
                {carQuestionAnswer === 'Volkswagen' && (
              <>
                <label htmlFor="volkswagenModelCar">What is your car model?</label>
                <select
                  id="volkswagenModelCar"
                  value={volkswagenModelCar ?? ''}
                  onChange={(e) => setVolkswagenModelCar(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="jetta">Jetta</option>
                  <option value="Tiguan">Tiguan</option>
                  <option value="Atlas">Atlas</option>
                  <option value="Taos">Taos</option>
                  <option value="Passat">Passat</option>
                  <option value="Golf">Golf</option>
                </select>
              </>
                )}
          </>
        );
      case 'bus':
        return (
          <>
            <label htmlFor="busQuestion">Do you have an opus card?</label>
            <select
              id="busQuestionAnswer"
              value={busQuestionAnswer ?? ''}
              onChange={(e) => setBusQuestionAnswer(e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {busQuestionAnswer === 'yes' && (
              <>
                <label htmlFor="opusCardType">What type of opus card do you have?</label>
                <select
                  id="opusCardType"
                  value={opusCardType ?? ''}
                  onChange={(e) => setOpusCardType(e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="Student">Student</option>
                  <option value="senior">65 years and older</option>
                </select>
              </>
            )}
          </>
        );
      default:
        return null; 
    }
  };

  return (
    <div className={styles.questionsPanel}>
      {renderQuestions()} 
      <label htmlFor="prioritySelect">What do you want to prioritize?</label>
      <select
        id="prioritySelect"
        value={selectedPriority ?? ''}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="" disabled>Select an option</option>
        <option value="time">Time</option>
        <option value="money">Money</option>
      </select>
      <button onClick={() => onClose(selectedPriority)}>Submit</button>
    </div>
  );
}

export default QuestionsPanel;
