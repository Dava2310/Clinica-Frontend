import { Link } from "react-router-dom";

type Props = {
  id: number;
  viewPath: string; // Ruta de redirección opcional para "Ver"
  onCancel: (id: number) => void;
};

const ActionButtonsTable = ({ id, viewPath, onCancel }: Props) => {
  const path = `${viewPath}/${id}`;

  return (
    <div className="flex gap-x-2">
      {viewPath && (
        <Link to={path}>
          <button
            type="button"
            className="w-fit text-white bg-primary-600 hover:bg-primary-700 
            focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
            rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
            dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Ver
          </button>
        </Link>
      )}
      <button
        type="button"
        onClick={() => onCancel(id)}
        className="w-24 text-white bg-red-600 hover:bg-red-700 focus:ring-4 
        focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm 
        px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 
        dark:focus:ring-red-800"
      >
        Cancelar
      </button>
    </div>
  );
};

export default ActionButtonsTable;
