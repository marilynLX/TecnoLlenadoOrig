export default class Alert {
    id: string;
    message: string;
    status: string; // Agrega el campo status
    
    constructor(id: string, message: string, status: string = 'active') {
      this.id = id;
      this.message = message;
      this.status = status;
    }
  }
  