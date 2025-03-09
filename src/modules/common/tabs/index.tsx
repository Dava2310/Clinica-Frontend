import React from "react";

type PropsTabs = {
  panel: number;
  setPanel: (panel: number) => void;
};

const Tabs = ({ panel, setPanel }: PropsTabs) => {
  const onHandleclick = (p: number) => setPanel(p);
  return (
    <div className="w-full mt-2">
      <div className="w-fit border-2 border-gray-200 bg-gray-300 rounded-md mx-auto flex shadow-sm font-medium">
        <div
          className={`border-r-2 border-gray-50 ${
            panel === 1 ? "bg-gray-400 text-white" : "bg-gray-300"
          }`}
        >
          <button
            onClick={() => onHandleclick(1)}
            className={`w-full border-2 py-2 px-6 rounded-md ${
              panel === 1 ? "border-2 shadow-lg" : ""
            }`}
          >
            Citas Pendientes
          </button>
        </div>
        <div
          className={`border-r-2 border-gray-50 ${
            panel === 2 ? "bg-gray-400 text-white" : "bg-gray-300"
          }`}
        >
          <button
            onClick={() => onHandleclick(2)}
            className={`w-full border-2 py-2 px-6 rounded-md ${
              panel === 2 ? "border-2 shadow-lg" : ""
            }`}
          >
            Citas En Proceso
          </button>
        </div>
        <div
          className={`border-r-2 border-gray-50 ${
            panel === 3 ? "bg-gray-400 text-white" : "bg-gray-300"
          }`}
        >
          <button
            onClick={() => onHandleclick(3)}
            className={`w-full border-2 py-2 px-6 rounded-md ${
              panel === 3 ? "border-2 shadow-lg" : ""
            }`}
          >
            Citas Programadas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
