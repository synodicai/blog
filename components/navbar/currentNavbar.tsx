"use client";
import { PcNavbar } from "@/components/navbar/Navbar";
import { PhoneNavbar } from "@/components/navbar/PhoneNavbar";

export function Navbar() {

    return (
        <div>
            <>
                <PcNavbar />
                <PhoneNavbar />
            </>
        </div>
    );
}
