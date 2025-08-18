"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link href="/" className="hover:text-gray-300">Home</Link>
      <Link href="/explore" className="hover:text-gray-300">Explore</Link>
      <Link href="/campaign/new" className="hover:text-gray-300">Create Campaign</Link>
    </nav>
  );
}
