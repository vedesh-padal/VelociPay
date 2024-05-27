"use client";

import { RecoilRoot } from "recoil";
// import React from "react";   // from NextJS 13 onward writing this isn't necessary
// No need for React import: Since the "use client" directive is present, you can define your React components without importing the React library. 

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>
    { children }
  </RecoilRoot>
}