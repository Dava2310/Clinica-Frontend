export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Milisegundos

    // Formato ISO-8601: YYYY-MM-DDTHH:mm:ss.SSS
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const mostrarFecha = (date:string) => {

  // Convertir la cadena a un objeto Date
  const fecha = new Date(date);

  // Formatear la fecha para obtener solo el año, mes y día
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
  const day = String(fecha.getDate()).padStart(2, '0');

  // Combinar en formato 'YYYY-MM-DD'
  return `${year}-${month}-${day}`;
}