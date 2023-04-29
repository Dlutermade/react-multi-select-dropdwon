import { useEffect, useRef, useState } from "react";
import "./StateDropdown.css";
import states from "./states";

const StateDropdown = () => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>(
    states.reduce((obj, state) => ({ ...obj, [state.abbreviation]: false }), {})
  );

  const numberOfStatesSelected =
    Object.values(selectedStates).filter(Boolean).length;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target !== dropdownRef.current) {
        setIsDropdownDisplayed(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <fieldset className="state-dropdown">
      <button
        onClick={(e) => {
          e.stopPropagation(); // 避免觸發 onClick
          setIsDropdownDisplayed((prev) => !prev);
        }}
      >
        {numberOfStatesSelected > 0
          ? `${numberOfStatesSelected} selected`
          : "-- Select Your States --"}
      </button>
      {isDropdownDisplayed && (
        <div
          onClick={(e) => e.stopPropagation() /* 避免觸發 onClick */}
          ref={dropdownRef}
          className="panel"
        >
          {states.map((state) => (
            <fieldset
              key={state.abbreviation}
              className={selectedStates[state.abbreviation] ? "selected" : ""}
            >
              <input
                onChange={(e) =>
                  setSelectedStates((prev) => ({
                    ...prev,
                    [state.abbreviation]: e.target.checked,
                  }))
                }
                checked={selectedStates[state.abbreviation]}
                id={`input-${state.abbreviation}`}
                type="checkbox"
              />
              <label htmlFor={`input-${state.abbreviation}`}>
                {state.name}
              </label>
            </fieldset>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default StateDropdown;
