import { type MouseEvent, type PropsWithChildren, useState } from "react";

interface DropdownProps extends PropsWithChildren {
  text: string;
}

export default function DropdownMenu(props: DropdownProps) {
  const [show, setShow] = useState(false);

  const toggleShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };
  return (
    <div className="relative">
      <button
        onClick={toggleShow}
        className=" rounded bg-cyan-300 text-white outline-none"
      >
        {props.text}
      </button>
      {show && <div className=" absolute -top-2 left-0">{props.children}</div>}
    </div>
  );
}
