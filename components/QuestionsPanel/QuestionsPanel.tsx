import React, { useState } from 'react';
import styles from './QuestionsPanel.module.css';
import { useMapContext } from "../Contexts/MapContext";



interface QuestionsPanelProps {
  onClose: (selectedPriority: string | null) => void;
  selectedTransportationMode: string | null;
}

const QuestionsPanel: React.FC<QuestionsPanelProps> = ({ onClose, selectedTransportationMode }) => {
  const [frequencyPriority, setFrequencyPriority] = useState<string | null>(null);
  const [timePriority, setTimePriority] = useState<string | null>(null);
  const [busQuestionAnswer, setBusQuestionAnswer] = useState<string | null>(null);
  const [opusCardType, setOpusCardType] = useState<string | null>(null);
  const [carQuestionAnswer, setCarQuestionAnswer] = useState<string | null>(null);
  const [toyotaModelCar, setToyotaModelCar] = useState<string | null>(null);
  const [volkswagenModelCar, setVolkswagenModelCar] = useState<string | null>(null);
  const {selectedIcons} = useMapContext();



  const renderQuestions = () => {
    if (selectedIcons.some((icon) => icon.iconName == 'car') && 
    selectedIcons.some((icon) => icon.iconName == 'bus')) {
      console.log('selectedIcons:', selectedIcons);
      return (
        <>
         <>
          <label >What is your car brand?</label>
          <select
            value={carQuestionAnswer ?? ''}
            onChange={(e) => setCarQuestionAnswer(e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            <option value="Toyota">Toyota</option>
            <option value="Volkswagen">Volkswagen</option>
          </select>
          {carQuestionAnswer === 'Toyota' && (
            <>
              <label >What is your car model?</label>
              <select
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
              <label>What is your car model?</label>
              <select
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
        <>
          <label>Do you have an opus card?</label>
          <select
            value={busQuestionAnswer ?? ''}
            onChange={(e) => setBusQuestionAnswer(e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {busQuestionAnswer === 'yes' && (
            <>
              <label >What type of opus card do you have?</label>
              <select
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
        </>
      );
    }
    else if (selectedTransportationMode === 'car') {
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
    } else if (selectedTransportationMode === 'bus') {
      
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

    } 

    return null; 
  };

  return (
  <div className={styles.questionsPanel}>
    {renderQuestions()}
    <label htmlFor="frequency">How frequently are you planning on going to your destination?</label>
    <div className={styles.dropdown}>
      <div className={styles.firstdropdownContainer}>
        <select
          id="frequencySelect"
          value={frequencyPriority ?? ''}
          onChange={(e) => setFrequencyPriority(e.target.value)}
          className={styles.firstdropdownContainer}
        >
          <option value="" disabled>Select an option</option>
          <option>one </option>
          <option>two </option>
          <option>three </option>
          <option>four </option>
          <option>five</option>
          <option>six </option>
          <option>seven </option>
          <option>eight </option>
          <option>nine</option>
        </select>
      </div>
      <span className={styles.timePer}>time per</span>
      <div className={styles.seconddropdownContainer}>
        <select
          id="timeSelect"
          value={timePriority ?? ''}
          onChange={(e) => setTimePriority(e.target.value)}
          className={styles.seconddropdown}
        >
          <option value="" disabled>Select an option</option>
          <option>day</option>
          <option>month</option>
          <option>year</option>
        </select>
      </div>
    </div>
    <button onClick={() => onClose(frequencyPriority)}>Compare</button>
  </div>
);
  }
export default QuestionsPanel;