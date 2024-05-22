import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]){
  return twMerge(clsx(inputs));
}

/**
** Usage:
import React from 'react';
import { cn } from './tuArchivo'; // Asegúrate de importar la función desde el archivo correcto

function MiComponente() {
  const clase1 = 'text-center text-red-500';
  const clase2 = { 'bg-blue-500': true };
  const clase3 = 'border border-green-500';
  const clase4 = ['p-4', 'rounded'];

  return (
    <div className={cn(clase1, clase2, clase3, clase4)}>
      Hola, mundo!
    </div>
  );
}

export default MiComponente;

 */