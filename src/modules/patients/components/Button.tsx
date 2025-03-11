interface PropsButton {
  fecha: string;
  id: number;
  setIdFechaSeleccionada: (id: number) => void;
  idFechaSeleccionada: number | undefined;
}

const Button = ({
  fecha,
  id,
  idFechaSeleccionada,
  setIdFechaSeleccionada,
}: PropsButton) => {
  return (
    <button
      onClick={() => setIdFechaSeleccionada(id)}
      className={`w-fit h-32 flex items-center justify-center font-medium px-8 border-2  rounded-lg hover:cursor-pointer  ${
        idFechaSeleccionada == id
          ? "border-4 border-white bg-gray-400 font-bold"
          : "border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400"
      }`}
    >
      {fecha}
    </button>
  );
};

export default Button;
