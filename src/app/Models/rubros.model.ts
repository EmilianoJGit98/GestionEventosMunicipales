export interface RubroInterface {
  idrubro: number;
  Nombre: string;
}

export interface RubrosResponse {
  rubros: RubroInterface[]; // Asegúrese de que este sea un array de RubroInterface
}
