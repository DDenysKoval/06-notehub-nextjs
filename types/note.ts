export interface Note {
  content: string;
  id: number;
  tag: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  content: string;
  tag: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}
