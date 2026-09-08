"use client";
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import Link from "next/link";
import { Menu, Search, X } from 'lucide-react';
import { useState } from "react";
const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const Links = [
        {name:"Home",href:"/"},
        {name:"Movies",href:"/movies"},
        {name:"TV-series",href:"/tv-series"},
    ]
  return (
    <div>
      <motion.header
      className="bg-transparent text-white w-full py-2 z-50 px-4 md:px-10 xl:px-36 absolute top-0 left-0"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.5}}
      >
        {/* desktop desigin section  */}
        <div className="flex flex-col md:flex-row md:item-center md:justify-between gap-4 ">
        {/* logo section  */}
        <div className="flex  item-center justify-between w-full md:w-auto">
            <Link href="/" className="flex flex-col item-center">
                <span className="text-2xl md:text-xl lg:text-3xl font bold text-yellow-400">
                    ALL  MOVIES
                </span>
                <span className="text-xs lg:text-base  text-white">
                    Movies and TV-Series
                </span>
            </Link>
            {/* the mobile response */}
            <motion.button
            className="md:hidden text-white hover:text-white/80 cursor-pointer"
            onClick={()=>setIsMenuOpen(!isMenuOpen)}
            whileTap={{scale:0.9}}
            >
                {isMenuOpen ? (<X className="w-6 h-6 "/> )
                :
                ( <Menu className="w-6 h-6 "/>)}
            </motion.button>
        </div>
        {/* search bar  */}
        <motion.div className="relative w-full md:w-1/2 md:mx-8 hidden md:block ">
            <input
                type="text "
                placeholder="quick shearch"
                className="w-full px-4 py-1.5 lg:py-3 bg-white text-sm text-gray-500 focus:outline-none placeholder-gray-500
                rounded-xl border border-gray-500 focus:border-white pr-10"  
            />
            <button className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-default">
                <Search className="w-5 h-5 text-gray-500" />
            </button>
        </motion.div>
        {/* navigation links */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
            {Links.map((link)=>(
                <Link
                key={link.name}
                href={link.href}
                className={`text-xs sm:text-base font-medium relative text-white ${ pathname === link.href ? "text-white ":"hover:text-white/80" }
               `}>
                 {link.name}
                 {/* underline animation for active links */}
                 {pathname === link.href && (
                    <motion.span
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-400"
                    layoutId="underline"
                    transition={{duration:0.3}}
                    />

                    
                 )}
                </Link>
            ))}
        </nav>
        </div>
        {/* mobile menu */}
        <motion.div
        className={`md:hidden backdrop-blur-xs bg-black/20 z-50 absolute left-0 w-full px-4 py-4 ${isMenuOpen ? "block":"hidden"}`}
        initial={{y:-20 , opacity:0}}
        animate={isMenuOpen?{y:0 , opacity:1}:{y:-20 , opacity:0}}
        transition={{duration:0.3}}
        >
       {/* search bar  */}
        <motion.div className="relative w-full mb-4 ">
            <input
                type="text "
                placeholder="quick shearch"
                className="w-full px-4 py-2 bg-white text-sm text-gray-500 focus:outline-none placeholder-gray-500
                rounded-xl border border-gray-500 focus:border-white pr-10"  
            />
            <button className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer">
                <Search className="w-5 h-5 text-gray-500" />
            </button>
        </motion.div>
        {/* navigation links mobile */}
        <nav className="flex flex-col items-center gap-2">
            {Links.map((link)=>(
                <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium relative text-white block hover:text-white/80">
                 {link.name}
                </Link>
            ))}
        </nav>
        </motion.div>
      </motion.header>
    </div>
  )
}

export default Header
