"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

interface ScrollToElementProps {
  className?: string;
  to: string;
}

const ScrollToElement: React.FC<ScrollToElementProps> = ({ className, to }) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-5",
        className
      )}
    >
      <Link href={to}>
        <ArrowUp className="h-10 w-10 text-white" />
      </Link>
    </div>
  );
};

export default ScrollToElement;
