import * as React from "react";
import * as Quill from "quill";
export interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): Quill.BoundsStatic;
  getSelection(focus?: boolean): Quill.RangeStatic;
  getContents(index?: number, length?: number): Quill.DeltaStatic;
}
