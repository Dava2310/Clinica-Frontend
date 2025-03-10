import { useMemo } from "react";
import { Table } from "flowbite-react";
import { AppointmentResponse } from "../../administrator/interfaces/appointmentInterfaces";
import ActionButtonsTable from "./ActionsButtonsTable";

interface Column {
  title: string;
  accessor: string; // Ruta del dato, por ejemplo: 'paciente.usuario.nombre'
}

interface Props {
  columns: Column[];
  rows: AppointmentResponse[];
  modalOpen: (id: number) => void;
  viewPath: string;
}

const AppointmentTable = ({ columns, rows, viewPath, modalOpen }: Props) => {
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  // Procesar las filas usando useMemo
  const processedRows = useMemo(() => {
    return rows.map((e) => ({
      id: e.id,
      data: columns.map((column) => getNestedValue(e, column.accessor)),
    }));
  }, [rows, columns]);

  return (
    <Table hoverable={true} className="">
      <Table.Head className="w-full">
        {columns.map((column) => (
          <Table.HeadCell key={column.title}>{column.title}</Table.HeadCell>
        ))}
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {processedRows.map((row) => (
          <Table.Row
            key={row.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {row.data.map((cellData, index) => (
              <Table.Cell
                key={index}
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                {cellData}
              </Table.Cell>
            ))}
            <Table.Cell className="flex gap-x-2">
              <ActionButtonsTable
                id={row.id}
                onCancel={modalOpen}
                viewPath={viewPath}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AppointmentTable;
