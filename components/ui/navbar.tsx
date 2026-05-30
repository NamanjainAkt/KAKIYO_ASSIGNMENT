"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/ui/user-menu";

export function Navbar({ session }: { session: any }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/offerings", label: "Offerings" },
    { href: "/prompts", label: "Prompts" },
    { href: "/prospects", label: "Prospects" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E0] p-6 bg-[#FBFBFA]/90 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl flex gap-8 font-semibold text-[#575752] items-center flex-wrap">
        <Link href="/" className="font-serif text-3xl font-black text-[#1C1C1A] mr-6 tracking-tight hover:opacity-85 transition-opacity">
          Kakiyo
        </Link>
        {session ? (
          <>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-[#1C1C1A] transition-all relative py-1 ${
                    isActive ? "text-[#1C1C1A] underline underline-offset-8 decoration-2 decoration-amber-600 font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="sm:ml-auto flex items-center gap-6">
              <Link 
                href="/messages" 
                className={`border-2 border-[#1C1C1A] px-5 py-2.5 transition-all font-bold tracking-wide uppercase text-xs ${
                  pathname === "/messages"
                    ? "bg-transparent text-[#1C1C1A]"
                    : "bg-[#1C1C1A] text-white hover:bg-transparent hover:text-[#1C1C1A]"
                }`}
              >
                Generate
              </Link>
              <UserMenu />
            </div>
          </>
        ) : (
          <div className="sm:ml-auto flex items-center gap-6">
            <Link href="/sign-in" className="hover:text-[#1C1C1A] transition-all">Sign In</Link>
            <Link href="/sign-up" className="border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-5 py-2.5 hover:bg-transparent hover:text-[#1C1C1A] transition-all font-bold tracking-wide uppercase text-xs">
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
