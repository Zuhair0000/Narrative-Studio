import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, onSubmit }) {
  return (
    <button
      className="px-8 py-3 text-lg font-medium rounded-2xl bg-gradient-brand hover:opacity-90 transition bg-gradient-to-r from-[#F3911D] to-[#840B86]"
      onClick={onSubmit}
    >
      {children}
    </button>
  );
}
