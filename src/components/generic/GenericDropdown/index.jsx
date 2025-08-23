// components/generic/GenericDropdown/index.jsx
import { useState, useRef, useEffect } from 'react';
import './styles.css';

const GenericDropdown = ({ label, items = [], onSelect, theme = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    if (onSelect) onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={`generic-dropdown ${theme}`} ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {label} ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item.label || item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericDropdown;
