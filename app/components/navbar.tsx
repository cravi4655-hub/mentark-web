"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      {/* Logo */}
      <h1 className="font-bold text-lg">Mentark</h1>

      {/* Links */}
      <Link href="/" className="hover:text-gray-300">Home</Link>
      <Link href="/explore" className="hover:text-gray-300">Explore</Link>
      <Link href="/campaign/new" className="hover:text-gray-300">Create Campaign</Link>

      {/* CTA Button */}
      <Link
        href="/train"
        className="ml-auto bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
      >
        Train Your Model
      </Link>
    </nav>
  );
}
