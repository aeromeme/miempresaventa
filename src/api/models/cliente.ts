/**
 * Cliente - represents a client in the system
 */
export interface Cliente {
  /**
   * The unique identifier of the client
   */
  clienteId: string;

  /**
   * The name of the client
   */
  nombre: string;

  /**
   * The email address of the client
   */
  correo: string;
}
