import { div } from "framer-motion/client";
import React from "react";

export default function Column({title, icon: Icon, children}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-500 uppercase tracking-wider text-xs">
                {Icon && <Icon size={18} />}
                {title}
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}