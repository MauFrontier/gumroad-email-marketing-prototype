import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  FocusEvent,
} from 'react';
import {KeyValuePair} from '../../sharedTypes';

import './ComboBox.scss';

interface ComboBoxProps {
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
  suggestions: KeyValuePair[];
  label?: string;
  disabled?: boolean;
}

const ComboBox = ({
  selectedValues,
  onValuesChange,
  suggestions,
  label,
  disabled = false,
}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    KeyValuePair[]
  >([]);
  const [shouldDisplaySuggestions, setShouldDisplaySuggestions] =
    useState(false);
  const [activeDescendant, setActiveDescendant] = useState<string | undefined>(
    undefined,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const showSuggestions = useCallback(() => {
    const eligibleSuggestions = suggestions.filter(
      s =>
        s.value.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedValues.includes(s.value),
    );

    setFilteredSuggestions(eligibleSuggestions);
  }, [inputValue, selectedValues, suggestions]);

  useEffect(() => {
    showSuggestions();
  }, [showSuggestions]);

  const handleFocus = () => {
    setShouldDisplaySuggestions(true);
  };

  const handleBlur = (event: FocusEvent) => {
    // Check if the new focus target is outside the combobox
    if (!comboboxRef.current?.contains(event.relatedTarget as Node)) {
      setShouldDisplaySuggestions(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setInputValue(e.target.value);
    }
  };

  const handleSelect = (suggestion: KeyValuePair) => {
    if (!disabled) {
      onValuesChange([...selectedValues, suggestion.value]);
      setInputValue('');
      setActiveDescendant(undefined);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleDelete = (value: string) => {
    if (!disabled) {
      onValuesChange(selectedValues.filter(v => v !== value));
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled) {
      switch (e.key) {
        case 'ArrowDown':
          if (filteredSuggestions.length > 0) {
            const currentActiveIndex = filteredSuggestions.findIndex(
              s => s.key === activeDescendant,
            );
            const nextActiveIndex =
              (currentActiveIndex + 1) % filteredSuggestions.length;
            setActiveDescendant(filteredSuggestions[nextActiveIndex].key);
          }
          break;
        case 'ArrowUp':
          if (filteredSuggestions.length > 0) {
            const currentActiveIndex = filteredSuggestions.findIndex(
              s => s.key === activeDescendant,
            );
            const nextActiveIndex =
              (currentActiveIndex - 1 + filteredSuggestions.length) %
              filteredSuggestions.length;
            setActiveDescendant(filteredSuggestions[nextActiveIndex].key);
          }
          break;
        case 'Enter': {
          const activeItem = filteredSuggestions.find(
            s => s.key === activeDescendant,
          );
          if (activeItem) {
            handleSelect(activeItem);
            e.preventDefault();
          }
          break;
        }
        case 'Backspace':
          if (inputValue === '' && selectedValues.length > 0) {
            const newValues = selectedValues.slice(
              0,
              selectedValues.length - 1,
            );
            onValuesChange(newValues);
          }
          break;
        case 'Escape':
          inputRef.current?.blur();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div
      ref={comboboxRef}
      tabIndex={-1}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={shouldDisplaySuggestions}
      aria-owns="suggestions-listbox"
      aria-label={label}
      aria-controls="input-field">
      <div
        className="input-pill-container"
        onClick={() => inputRef.current?.focus()}>
        {selectedValues.map((value, index) => (
          <div
            key={index}
            className="pill"
            onClick={e => {
              e.stopPropagation();
              handleDelete(value);
            }}>
            {value}{' '}
            <span className="pill-close-icon" aria-hidden="true">
              ×
            </span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          id="input-field"
          role="textbox"
          aria-autocomplete="list"
          disabled={disabled}
          aria-controls="suggestions-listbox"
          aria-multiline="false"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="ComboBox input"
        />
      </div>
      {shouldDisplaySuggestions && filteredSuggestions.length > 0 && (
        <ul role="listbox" id="suggestions-listbox">
          {filteredSuggestions.map(suggestion => (
            <li
              key={suggestion.key}
              id={suggestion.key}
              role="option"
              aria-selected={
                activeDescendant === suggestion.key ? 'true' : 'false'
              }
              onMouseDown={() => handleSelect(suggestion)}>
              {suggestion.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
