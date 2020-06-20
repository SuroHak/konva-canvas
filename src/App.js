import React from 'react';
import Draggable from "./Draggable";
import TextPath from "./TextPath";
import Arrow from "./Arrow";
import Ring from "./Ring";
import Filters from "./Filters";

const App = () => {


  return (
    <div className="app">
      <Draggable />
      <TextPath />
      <Arrow />
      <Ring />
      <Filters />
    </div>
  );
}

export default App;
