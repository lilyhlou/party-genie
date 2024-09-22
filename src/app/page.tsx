import UserInput from "@/components/home/UserInput";
import { BioProvider } from "@/context/BioContext";
import { Metadata } from "next";
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: "Party Genie",
  description:
    "Generate your perfect party idea with the help of AI. Just select a few tags and let our AI create an event.",
};

const lausanne = localFont({ src: [{path: './fonts/TWKLausanne-400.woff2', weight: '400', style: 'normal' }, {path: './fonts/TWKLausanne-400Italic.woff2', weight: '400', style: 'italic' }, {path: './fonts/TWKLausanne-900.woff', weight: '900', style: 'normal' }]})

export default function Home() {
	const i = Math.floor(Math.random() * 8) + 1;
	const background = "url('/assets/backgrounds/frame-" + i + ".png')";
	const darkClass = i > 4 ? 'min-h-screen	gap-8 px-4 py-12 dark' : 'min-h-screen gap-8 px-4 py-12'
  return (
    <main className={darkClass + ' ' + lausanne.className} style={{backgroundImage: background, backgroundSize: 'cover'}}>
      <div className="col-span-full group w-full flx flex-col space-y-2 sm:space-y-4 mb-8 text-center">
        <h1 className="font-bold text-3xl md:text-5xl slg:text-5xl lg:text-6xl text-center mx-auto pt-4">
          What&apos;s your party vibe?
        </h1>
      </div>
      <BioProvider>
        <UserInput />
      </BioProvider>
    </main>
  );
}
