"use client";

import { AlertTriangle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant="secondary" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
