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

  const renderQuestions = () => {
    switch (selectedTransportationMode) {
      case 'car':
        return (
          <>
            <label htmlFor="carQuestion">What is your car model?</label>
            {/* ... (additional car-related questions or content) */}
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
                  {/* Add more options as needed */}
                </select>
              </>
            )}
          </>
        );
      default:
        return null; // No specific questions for other transportation modes
    }
  };

  return (
    <div className={styles.questionsPanel}>
      {renderQuestions()} {/* Include the function call here */}
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
