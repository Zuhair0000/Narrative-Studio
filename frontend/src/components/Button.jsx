import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children }) {
  return (
    <Link
      to="/signup"
      className="px-8 py-3 text-lg font-medium rounded-md bg-gradient-brand hover:opacity-90 transition bg-gradient-to-r from-[#F3911D] to-[#840B86]"
    >
      {children}
    </Link>
  );
}
