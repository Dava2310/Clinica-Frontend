type PropsItem = {
  step: number;
  panelCurrent: number;
};

type PropsStep = {
  panelCurrent: number;
};

const Item = ({ step, panelCurrent }: PropsItem) => {
  return (
    <div
      className={`rounded-full border-2 border-gray-400 px-4 py-2  font-medium shadow-sm ${
        panelCurrent == step
          ? "bg-gray-400 text-white"
          : "bg-gray-300 text-gray-500"
      }`}
    >
      {step}
    </div>
  );
};

const Step = ({ panelCurrent }: PropsStep) => {
  return (
    <div className="w-full ">
      <div className="w-fit py-2 px-4  rounded-md  mx-auto flex gap-x-2">
        <Item step={1} panelCurrent={panelCurrent} />
        <Item step={2} panelCurrent={panelCurrent} />
      </div>
    </div>
  );
};

export default Step;
