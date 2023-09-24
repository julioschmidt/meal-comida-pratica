"use client";
import { List } from "phosphor-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-14 bg-green-500">
      <div className="h-full flex items-center justify-between xl:mx-7 flex-wrap w-full">
        <a href="#" className="uppercase ml-6 text-2xl font-bold	">
          meal
        </a>
        <List
          className="lg:hidden block cursor-pointer mr-6"
          size={32}
          onClick={() => setOpen(!open)}
        />
        <nav
          className={`${
            open ? "block" : "hidden"
          } lg:flex lg:items-center lg:w-auto w-full`}
        >
          <ul className="lg:flex lg:justify-between mr-6">
            <li>
              <a href="#" className="lg:px-5 py-2 block hover:text-slate-200">
                Armazém
              </a>
            </li>
            <li>
              <a href="#" className="lg:px-5 py-2 block hover:text-slate-200">
                Comunidade
              </a>
            </li>
            <li>
              <a href="#" className="lg:px-5 py-2 block hover:text-slate-200">
                Sugestão semanal
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
