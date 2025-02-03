import { Mention, MentionSearchEvent } from "primereact/mention";
import { useState, type FC } from "react";

const MentionFormula: FC = () => {
  const [value, setValue] = useState<string>("");
  const items = ["F1", "F2", "F3"];
  const [suggestions, setSuggestions] = useState<any>([]);

  const onSearch = (event: MentionSearchEvent) => {
    console.log(event)
    setTimeout(() => {
      const query = event.query;
      console.log(query)

      const suggestions = [...items];

      setSuggestions(suggestions);
    }, 250);
  };

  const handleChange = (e)=>{
    console.log(e.target.value.slice(0,1))
    setValue(e.target.value.slice(1))

  }


  return (
    <div className='card flex justify-content-center'>
      <Mention
        value={value}
        onChange={handleChange}
        suggestions={suggestions}
        onSearch={onSearch}
        // field='nickname'
        trigger={['f', 'F']} 
        placeholder='Enter @ to mention people'
        rows={1}
        cols={40}
        autoResize
      />
    </div>
  );
};
export default MentionFormula;
