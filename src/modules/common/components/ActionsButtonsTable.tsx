import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  viewPath: string; // Ruta de redirección opcional para "Ver"
  onCancel: (id: number) => void;
  labelOk: string;
  isDisplayed: boolean;
  labelCancel: string;
  cancelable: boolean;
};

const ActionButtonsTable = ({
  id,
  viewPath,
  labelOk,
  isDisplayed,
  labelCancel,
  cancelable,
  onCancel,
}: Props) => {
  const navigate = useNavigate();

  const path = `/${viewPath}/${id}`; // Asegúrate de que el path comience con una barra "/"
  const handleClick = () => {
    navigate(path, { replace: true });
  };

  return (
    <div className="flex gap-x-2">
      {isDisplayed && (
        <button
          type="button"
          className="w-fit text-white bg-primary-600 hover:bg-primary-700 
            focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
            rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
            dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleClick}
        >
          {labelOk}
        </button>
      )}
      {cancelable && (
        <button
          type="button"
          onClick={() => onCancel(id)}
          className="w-24 text-white bg-red-600 hover:bg-red-700 focus:ring-4 
        focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm 
        px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 
        dark:focus:ring-red-800"
        >
          {labelCancel}
        </button>
      )}
    </div>
  );
};

export default ActionButtonsTable;
