"use client";

import * as React from "react";
import { GripVertical } from "lucide-react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

/* ================= Panel Group ================= */

export function ResizablePanelGroup({
  className,
  ...props
}: GroupProps & { className?: string }) {
  return (
    <Group
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

/* ================= Panel ================= */

export function ResizablePanel(props: PanelProps) {
  return <Panel {...props} />;
}

/* ================= Handle ================= */

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: SeparatorProps & { withHandle?: boolean; className?: string }) {
  return (
    <Separator
      className={cn(
        "relative flex items-center justify-center bg-border",
        // horizontal resize
        "aria-[orientation=horizontal]:w-px aria-[orientation=horizontal]:cursor-col-resize",
        // vertical resize
        "aria-[orientation=vertical]:h-px aria-[orientation=vertical]:cursor-row-resize",
        className
      )}
      {...props}
    >
      {withHandle && (
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      )}
    </Separator>
  );
}
