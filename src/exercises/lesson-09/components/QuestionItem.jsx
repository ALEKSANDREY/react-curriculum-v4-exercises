import { useContext, useState, useEffect } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

export function QuestionItem({ question }) {
  const { state, dispatch } = useContext(SurveyContext);

  // Controlled states for typing smoothly
  const [workingText, setWorkingText] = useState(question.question);
  const [optionInputs, setOptionInputs] = useState(question.options || []);

  const isEditingThis = state?.ui?.editingQuestionId === question.id;

  // CRITICAL FIX: Keep local inputs synchronized with global question state changes
  useEffect(() => {
    setWorkingText(question.question);
    setOptionInputs(question.options || []);
  }, [question]);

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEditToggle = () => {
    if (isEditingThis) {
      dispatch({ type: 'SET_EDITING_QUESTION', payload: { id: null } });
    } else {
      dispatch({ type: 'SET_EDITING_QUESTION', payload: { id: question.id } });
    }
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { id: null } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
  };

  const handleAddOption = () => {
    const text = window.prompt('Enter text for the new option:');
    if (text && text.trim() !== '') {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText: text.trim() },
      });
    }
  };

  // CONTROLLED INPUT FIX: Updates state instantly as you type each letter
  const handleOptionTextChange = (index, value) => {
    const updated = [...optionInputs];
    updated[index] = value;
    setOptionInputs(updated);
  };

  // Dispatches text lock to global state when user clicks away
  const handleOptionBlur = (index, value) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: { questionId: question.id, optionIndex: index, newText: value },
    });
  };

  const handleDeleteOption = (index) => {
    if (question.options.length <= 2) {
      alert('Multiple choice formats require a minimum of 2 options!');
      return;
    }
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex: index },
    });
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEditToggle}>
            {isEditingThis ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditingThis ? (
          <div style={{ width: '100%' }}>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              style={{ width: '80%', padding: '6px', marginBottom: '10px' }}
            />
            <button
              onClick={handleSave}
              style={{ marginLeft: '5px', padding: '6px 12px' }}
            >
              Save
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {optionInputs.map((option, index) => (
              <li
                key={index}
                className={styles['option-item']}
                style={{ marginBottom: '8px' }}
              >
                {isEditingThis ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <input
                      type="text"
                      value={option || ''}
                      onChange={(e) =>
                        handleOptionTextChange(index, e.target.value)
                      }
                      onBlur={(e) => handleOptionBlur(index, e.target.value)}
                      style={{ padding: '4px' }}
                    />
                    <button
                      onClick={() => handleDeleteOption(index)}
                      disabled={question.options.length <= 2}
                      style={{
                        padding: '2px 6px',
                        color: question.options.length <= 2 ? '#999' : 'red',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditingThis && (
            <button
              onClick={handleAddOption}
              style={{ marginTop: '5px', padding: '4px 8px' }}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
