"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Orbit, Moon, Sun  } from "lucide-react";
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
export const PhoneNavbar = ({
    className,
}: {
    className?: string;
}) => {
    const { setTheme } = useTheme()

    return (
        <motion.div
            initial={{
                opacity: 1,
                y: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.2,
            }}
            className={cn(
                "md:flex-row max-w-full fixed top-0 inset-x-0 mx-auto m-4 p-4 border border-transparent dark:border-white/[0.2] rounded-xl bg-white dark:bg-syntax-navbar shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] p-2 items-center justify-between space-x-4 flex md:hidden",
                className
            )}
        >
            <Link
                href="/"
                className="flex items-center gap-1 font-semibold md:text-base text-lg"
                style={{ marginRight: "0.25rem" }}
            >
                <Orbit className="h-6 w-6" />
                <span>Blog</span>
            </Link>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    );
};
