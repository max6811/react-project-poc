import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { FormEventHandler, useState } from "react";

const AutoCompleteExample = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const phrases = [
    'F1',
    'F2',
    'F3'
  ];

  const searchWords = (event:AutoCompleteCompleteEvent) => {
    let _suggestions = [];
    if (event.query.length === 0) {
      _suggestions = [...phrases];
    } else {
      _suggestions = phrases.filter((phrase) =>
        phrase.toLowerCase().includes(event.query.toLowerCase())
      );
    }

    setSuggestions(_suggestions);
  };

  const onInputChange = (e) => {
    console.log(e)
    const newValue = e.target.value;
    setInputValue(newValue);

    // searchWords({ query: newValue }); // 
  };

  return (
    <>
      <span className='p-float-label p-fluid'>
        <AutoComplete
          value={inputValue}
          suggestions={suggestions}
          completeMethod={searchWords}
          // field='name'
          onChange={(e) => setInputValue(e.value)}
          // onInput={onInputChange} 
          placeholder='Escribe para ver sugerencias'
        />

        <label htmlFor='ac'>Float Label</label>
      </span>
    </>
  );
};

export default AutoCompleteExample;
