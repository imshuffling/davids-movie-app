import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function wrapper({ children }: Props) {
  return (
    <div className="mx-auto p-8 max-w-7xl">
      <Link href="/">
        <h1 className="text-4xl mb-10">Davids MovieDB</h1>
      </Link>
      {children}
    </div>
  );
}

export default wrapper;
