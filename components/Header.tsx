"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDownIcon, MenuIcon } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "التقارير", href: "/reports" },
  { name: "الاخبار", href: "/news" },
  { name: "من نحن", href: "/about" },
  { name: "اتصل بنا", href: "/contact" },
]

const mediaItems = [
  { name: "الصور", href: "/media/photos" },
  { name: "الفيديوهات", href: "/media/videos" },
  { name: "الاخبار", href: "/news" }, // Fixed the property name from 'namea' to 'name'
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMediaOpen, setIsMediaOpen] = React.useState(false)

  return (
    <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }} className=" -mt-24  z-50 sticky top-3">
      <nav
        className="md:mx-auto flex max-w-5xl mx-4 bg-background/60 backdrop-blur-md rounded-full items-center justify-between p-2 lg:px-6"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 flex gap-2 items-center justify-center text-white  p-1.5">
            <Image className="h-12 w-auto"
            src="/logo.png" alt="فريق معاً التطوعي" width={150} height={50} />
            <span className=" text-xl font-bold">فريق معاً التطوعي</span>
          </Link>
        </div>

        {/* mobile menu */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">افتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>القائمة</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-semibold"
                        onClick={() => setIsMediaOpen(!isMediaOpen)}
                      >
                        المركز الاعلامي
                        <ChevronDownIcon className={cn("ml-2 h-4 w-4 transition-transform duration-200", isMediaOpen ? "rotate-180" : "")} />
                      </Button>
                      <div className={cn("pl-4 space-y-1", isMediaOpen ? "block" : "hidden")}>
                        {mediaItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-md font-semibold leading-6 text-foreground hover:text-primary_blue transition-colors duration-200"
              >
              {item.name}
            </Link>
          ))}

          <div className="relative group">
            <Button
              variant="ghost"
              className="p-0 text-sm font-semibold leading-6 h-auto hover:bg-transparent hover:text-primary_blue transition-colors duration-200"
              >
              المركز الاعلامي
              <ChevronDownIcon
                className="ml-1 h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:rotate-180"
                aria-hidden="true"
              />
            </Button>
            <div className="absolute top-full left-1/2 z-50 mt-1 w-48 -translate-x-1/2 transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
              <div className="rounded-md bg-background shadow-lg ring-1 ring-black h-fi  ring-opacity-5">
                <div className="py-1 h-fit">
                  {mediaItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}