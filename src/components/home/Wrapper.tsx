"use client";

import React, { PropsWithChildren, useState , useEffect, useContext} from 'react';
import { BioContext } from "@/context/BioContext";
import localFont from 'next/font/local'

interface WrapperProps {
  className?: string;
}
const lausanne = localFont({ src: [{path: '../../app/fonts/TWKLausanne-400.woff2', weight: '400', style: 'normal' }, {path: '../../app/fonts/TWKLausanne-400Italic.woff2', weight: '400', style: 'italic' }, {path: '../../app/fonts/TWKLausanne-500.woff2', weight: '500', style: 'normal' }, {path: '../../app/fonts/TWKLausanne-700.woff2', weight: '700', style: 'normal' }]})

const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({ children, className }) => {
  const { background, darkMode, setDarkMode, setBackground } = useContext(BioContext);
	//const i = Math.floor(Math.random() * 8) + 1;
	//setBackground(i);
	//setDarkMode(i < 6);
	//const [background, setBackground] = useState(3);
	//const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		let i = Math.floor(Math.random() * 8) + 1
		setBackground(i);
		setDarkMode(i < 6);
		document.body.style.backgroundImage = "red"

  }, []);

  return (
    <main className={`min-h-screen gap-8 px-4 py-12 ${darkMode ? 'dark' : ''} ${lausanne.className} ${className}`} style={{backgroundImage: `url('/assets/backgrounds/frame-${background}.png')`, backgroundSize: 'cover'}}>
      {children}
    </main>
  );
};

export default Wrapper;