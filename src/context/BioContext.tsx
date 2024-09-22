"use client";

import { createContext, useState } from "react";

interface BioContextTypes {
  output: string;
	title: string,
	description: string,
	template: string,
	effect: string,
	image: string,
	url: string,
  loading: boolean;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
  setEffect: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setURL: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BioContext = createContext<BioContextTypes>({
  output: `- Party Title: Zoolympics 🏅
- Description: 🎈It's My Birthday, Let's Go to the Zoo!🎈
- Template: winterWonderland
- Effect: snowflakes
- Image: come hang club penguin`,
	title: 'Zoolympics 🏅',
	description: `🎈It's My Birthday, Let's Go to the Zoo!🎈`,
	template: 'winterWonderland',
	effect: 'snowflakes',
	image: '/assets/event-images/come-hang-club-penguin.jpeg',
	url: 'https://partiful.com/create?title=Zoolympics+%F0%9F%8F%85&poster=come-hang-club-penguin&theme=lofiGrass&effect=sunbeams&description=%F0%9F%8E%88It%27s+My+Birthday%2C+Let%27s+Go+to+the+Zoo%21%F0%9F%8E%88',
  loading: false,
  setOutput: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setTemplate: () => {},
  setEffect: () => {},
  setImage: () => {},
	setURL: () => {},
  setLoading: () => {},
});

export const BioProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState(`- Party Title: Zoolympics 🏅
- Description: 🎈It's My Birthday, Let's Go to the Zoo!🎈
- Template: lofiGrass
- Effect: sunbeams
- Image: come hang club penguin`);
const [title, setTitle] = useState('Zoolympics 🏅');
const [description, setDescription] = useState(`🎈It's My Birthday, Let's Go to the Zoo!🎈`);
const [template, setTemplate] = useState('lofiGrass');
const [effect, setEffect] = useState('sunbeams');
const [image, setImage] = useState('/assets/event-images/come-hang-club-penguin.jpeg');
const [url, setURL] = useState('https://partiful.com/create?title=Zoolympics+%F0%9F%8F%85&poster=come-hang-club-penguin&theme=lofiGrass&effect=sunbeams&description=%F0%9F%8E%88It%27s+My+Birthday%2C+Let%27s+Go+to+the+Zoo%21%F0%9F%8E%88');
const [loading, setLoading] = useState(false);

  return (
    <BioContext.Provider value={{ output, setOutput, title, setTitle, description, setDescription, template, setTemplate, effect, setEffect, image, setImage, setURL, url, setLoading, loading }}>
      {children}
    </BioContext.Provider>
  );
};
