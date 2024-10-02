"use client";

import { createContext, useState } from "react";

interface BioContextTypes {
	title: string,
	description: string,
	image: string,
	url: string,
	items: { id: string; label: string; checked: boolean; }[],
  loading: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setURL: React.Dispatch<React.SetStateAction<string>>;
  setItems: React.Dispatch<React.SetStateAction<{ id: string; label: string; checked: boolean; }[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BioContext = createContext<BioContextTypes>({
	title: 'Zoolympics 🏅',
	description: `🎈It's My Birthday, Let's Go to the Zoo!🎈`,
	image: '/assets/event-images/come-hang-club-penguin.jpeg',
	url: 'https://partiful.com/create?title=Zoolympics+%F0%9F%8F%85&poster=come-hang-club-penguin&theme=lofiGrass&effect=sunbeams&description=%F0%9F%8E%88It%27s+My+Birthday%2C+Let%27s+Go+to+the+Zoo%21%F0%9F%8E%88',
  items: [
		{
			id: "birthday",
			label: "🎂 birthday",
			checked: true
		},
		{
			id: "chill",
			label: "🍵 chill",
			checked: false
		},
		{
			id: "summer",
			label: "☀️ summer",
			checked: true
		},
		{
			id: "location",
			label: "🏙️ my location",
			checked: false
		},
		{
			id: "chaos",
			label: "🐒 chaos",
			checked: false
		}
	],
	loading: false,
  setTitle: () => {},
  setDescription: () => {},
  setImage: () => {},
	setURL: () => {},
	setItems: () => {},
  setLoading: () => {},
});

export const BioProvider = ({ children }: { children: React.ReactNode }) => {
const [title, setTitle] = useState('Zoolympics 🏅');
const [description, setDescription] = useState(`🎈It's My Birthday, Let's Go to the Zoo!🎈`);
const [image, setImage] = useState('/assets/event-images/come-hang-club-penguin.jpeg');
const [url, setURL] = useState('https://partiful.com/create?title=Zoolympics+%F0%9F%8F%85&poster=come-hang-club-penguin&theme=lofiGrass&effect=sunbeams&description=%F0%9F%8E%88It%27s+My+Birthday%2C+Let%27s+Go+to+the+Zoo%21%F0%9F%8E%88');
const [loading, setLoading] = useState(false);
const [items, setItems] = useState([
	{
		id: "birthday",
		label: "🎂 birthday",
		checked: true
	},
	{
		id: "chill",
		label: "🍵 chill",
		checked: false
	},
	{
		id: "summer",
		label: "☀️ summer",
		checked: true
	},
	{
		id: "location",
		label: "🏙️ my location",
		checked: false
	},
	{
		id: "chaos",
		label: "🐒 chaos",
		checked: false
	}
])

  return (
    <BioContext.Provider value={{ title, setTitle, description, setDescription, image, setImage, setURL, url, items, setItems, setLoading, loading }}>
      {children}
    </BioContext.Provider>
  );
};
