// figma-assets.d.ts

declare module 'figma:asset/*' {
  // This tells TypeScript that the imported value will be a string (like a URL).
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}
