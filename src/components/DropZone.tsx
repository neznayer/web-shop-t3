import { type DragEvent, useRef } from "react";

export default function Dropzone({ className }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (inputRef.current && e.dataTransfer?.files) {
      inputRef.current.files = e.dataTransfer?.files;
    }
  }

  function handleDragover(e: DragEvent) {
    e.preventDefault();
  }

  function handleClick() {
    inputRef.current?.dispatchEvent(new Event("click"));
  }

  return (
    <div
      className={` rounded border-dashed border-slate-400 ${
        className ? className : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragover}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        name="files"
        id="files"
        multiple
        className=" hidden"
      />
    </div>
  );
}
