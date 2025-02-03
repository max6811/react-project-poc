import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { FormEventHandler, useState } from "react";

const AutoCompleteExample = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Lista de frases
  const items = ['F1', 'F2', 'F3'];

  const onSearch = (event) => {
    setInputValue(event.query); 
    const lastChar = event.query.charAt(event.query.length - 1); 

    if (event.query) {
      // Filtrar las sugerencias por el texto ingresado
      const filteredSuggestions = items.filter(item =>
        item.toLowerCase().includes(lastChar.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Si no hay texto, limpia las sugerencias
    }
  };

  return (
    <div>
      <h3>Autocomplete con PrimeReact</h3>
      <AutoComplete
        value={inputValue}
        suggestions={suggestions}
        completeMethod={onSearch} // Llama a la función de búsqueda cada vez que el usuario escribe
        onChange={(e) => setInputValue(e.value)} // Actualiza el valor del input
        placeholder="Escribe algo..." // Placeholder para el campo de entrada
      />
    </div>
  );
};

export default AutoCompleteExample;
