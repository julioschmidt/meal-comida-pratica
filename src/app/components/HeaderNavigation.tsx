//do some props for this component
import React from "react";

interface HeaderNavigationProps {
  open: boolean;
}

export default function HeaderNavigation({ open }: HeaderNavigationProps) {
  return (
    <nav
      className={`${open ? "z-40 absolute flex justify-end" : "hidden"
        } lg:flex lg:items-center lg:w-auto w-full`}
    >
      <ul className="lg:flex lg:justify-between bg-green-500 -mt-1 pl-3 rounded-bl-md">
        <li>
          <a
            href="/meal/armazem"
            className="mr-6 text-right lg:px-5 py-2 text-white block hover:text-slate-200 on"
          >
            Armazém
          </a>
        </li>
        <li>
          <a
            href="/meal/comunidade"
            className="mr-6 text-right text-white lg:px-5 py-2 block hover:text-slate-200"
          >
            Comunidade
          </a>
        </li>
        <li>
          <a
            href="/meal/home"
            className="mr-6 text-right text-white lg:px-5 py-2 block hover:text-slate-200"
          >
            Sugestão semanal
          </a>
        </li>
        <li>
          <a
            href="/meal/configuracao"
            className="mr-6 text-right text-white lg:px-5 py-2 block hover:text-slate-200"
          >
            Configuração
          </a>
        </li>
        <li>
          <a
            href="/meal/configuracao"
            className="mr-6 text-right text-white lg:px-5 py-2 block hover:text-slate-200"
          >
            Salvas
          </a>
        </li>
      </ul>
    </nav>
  );
}
