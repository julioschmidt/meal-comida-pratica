"use client";
import { List } from "phosphor-react";
import { useState } from "react";
import HeaderNavigation from "./HeaderNavigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="">
      <div className="h-full flex items-center justify-between flex-wrap w-full py-2 bg-green-500">
        <a href="/meal/home" className="text-white ml-6 text-2xl font-bold	">
          meal
        </a>
        <List
          className="lg:hidden block text-white cursor-pointer mr-6"
          size={32}
          onClick={() => setOpen(!open)}
        />
        {!open ? <HeaderNavigation open={open} /> : null}
      </div>
      {open ? <HeaderNavigation open={open} /> : null}
    </header>
  );
}
