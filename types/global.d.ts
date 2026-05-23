// types/globals.d.ts
export {};

declare global {
  interface Window {
    MLS_Util: any;
  }
}

// CSS Module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// For side-effect imports like import "@/globals.css"
declare module '*.css' {
  const css: string;
  export default css;
}