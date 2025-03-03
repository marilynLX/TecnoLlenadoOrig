//entidad para almacenar los datos de la alerta de 
//acuerdo con el estado del tinaco
class Alert {
    id: string;
    message: string;
  
    constructor(id: string, message: string) {
      this.id = id;
      this.message = message;
    }
  }
  
  export default Alert;  