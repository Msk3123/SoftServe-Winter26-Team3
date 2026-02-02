import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './SelectableInput.module.css';
import type { BaseEntity } from '../../../types/api.types';

interface Props<T extends BaseEntity> {
  title: string;
  error?:string;
  items: T[];
  selectedIds: (number | string)[];
  onSelect: (item: T) => void;
  onRemove: (id: number | string) => void;
  onCreateNew?: (query: string) => void;
  getLabel: (item: T) => string;
  renderOption: (item: T) => React.ReactNode;
  multiple?: boolean;
}

export function SelectableInput<T extends BaseEntity>({
  title,
  error,
  items,
  selectedIds,
  onSelect,
  onRemove,
  onCreateNew,
  getLabel,
  renderOption,
  multiple = true,
}: Props<T>) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const filteredItems = items.filter(item => 
    getLabel(item).toLowerCase().includes(query.toLowerCase()) && 
    !selectedIds.includes(item.id)
  );

  const selectedItems = items.filter(item => selectedIds.includes(item.id));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (item:T) => {
    if(!multiple) setIsOpen(false);
    onSelect(item);
    setQuery('');
  }

  const displayValue = !multiple && selectedItems.length > 0 
  ? getLabel(selectedItems[0])
  : query;



  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.label} htmlFor={id}>{title}</label>
      <div className={styles.inputWrapper} onClick={() => setIsOpen(true)}>
        {multiple && selectedItems.map(item => (
          <div key={item.id} className={styles.chip}>
            {getLabel(item)}
            <button type="button" onClick={() => onRemove(item.id)}>×</button>
          </div>
        ))}
        <input
          className={styles.input}
          value={isOpen && !multiple ? query : displayValue}
          onFocus={() => { if(!multiple) setQuery(''); setIsOpen(true); }}
          onChange={(e) => setQuery(e.target.value)}
          id={id}
          placeholder="Search..."
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}

      {isOpen && (
        <div className={styles.dropdown}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={styles.option}
              onClick={()=>handleSelect(item)}
            >
              {renderOption(item)}
            </div>
          ))}
          {onCreateNew &&
          <div
            className={styles.createOption}
            onClick={() => { onCreateNew(query); setIsOpen(false); }}
          >
            + Add new {query}
          </div>
          }
        </div>
      )}
    </div>
  );
}