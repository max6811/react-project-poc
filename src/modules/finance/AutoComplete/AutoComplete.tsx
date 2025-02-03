import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { FormEventHandler, useState } from "react";

const AutoCompleteExample = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Lista de frases que serán las recomendaciones
  const phrases = [
    "Hola, ¿cómo estás?",
    "¿Qué tal el día?",
    "Hace buen tiempo hoy",
    "¿Vas a salir más tarde?",
    "¿Cómo va todo en el trabajo?",
    "¿Te gusta la música?",
    "3 + 2 = ?",
    "La raíz cuadrada de 16 es",
    "El área de un círculo es",
    "x * y = z",
  ];

  // Filtrar las frases en función del texto ingresado
  const searchWords = (event:AutoCompleteCompleteEvent) => {
    // console.log(event)
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

  // Detectar cambios en el input y aplicar la búsqueda
  const onInputChange = (e) => {
    console.log(e)
    const newValue = e.target.value;
    setInputValue(newValue);

    // searchWords({ query: newValue }); // Llamar a la función de búsqueda
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
          // onInput={onInputChange} // Detectar cambios en el input
          placeholder='Escribe para ver sugerencias'
        />

        <label htmlFor='ac'>Float Label</label>
      </span>
    </>
  );
};

export default AutoCompleteExample;
