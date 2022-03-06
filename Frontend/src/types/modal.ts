import { ReactNode } from "react";

export interface ModalState {
  title: string;
  pagesNames: string[];
  children: ReactNode[];
}