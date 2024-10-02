import UserInput from "@/components/home/UserInput";
import { BioProvider } from "@/context/BioContext";
import { Metadata } from "next";
import localFont from 'next/font/local'
import Output from "@/components/home/Output";
import BottomButtons from "@/components/home/BottomButtons";

export const metadata: Metadata = {
  title: "Party Genie",
  description:
    "Generate your perfect party idea with the help of AI. Just select a few tags and let our AI create an event.",
};

const lausanne = localFont({ src: [{path: './fonts/TWKLausanne-400.woff2', weight: '400', style: 'normal' }, {path: './fonts/TWKLausanne-400Italic.woff2', weight: '400', style: 'italic' }, {path: './fonts/TWKLausanne-500.woff2', weight: '500', style: 'normal' }, {path: './fonts/TWKLausanne-700.woff2', weight: '700', style: 'normal' }]})

export default function Home() {
	const i = Math.floor(Math.random() * 8) + 1;
	const background = "url('/assets/backgrounds/frame-" + i + ".png')";
	const darkClass = i > 6 ? 'min-h-screen	gap-8 px-4 py-12 dark' : 'min-h-screen gap-8 px-4 py-12'
  return (
    <main className={darkClass + ' ' + lausanne.className} style={{backgroundImage: background, backgroundSize: 'cover'}}>
      <div className="col-span-full group w-full flx flex-col space-y-2 sm:space-y-4 mb-8 text-center">
        <h1 className="font-medium text-2xl text-center mx-auto pt-4">
          What&apos;s your party vibe?
        </h1>
      </div>
      <BioProvider>
        <UserInput />
				<Output />
				<BottomButtons />
      </BioProvider>
    </main>
  );
}
