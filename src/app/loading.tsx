"use client";

import React from "react";
import { Loader } from "lucide-react";

function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default LoadingPage;
