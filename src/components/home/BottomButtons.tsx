"use client";
import React, { useContext } from "react";
import { BioContext } from "@/context/BioContext";
import { Loader2 } from "lucide-react";

const BottomButtons = () => {
  const { url, loading } = useContext(BioContext);
  return (
		<div className="flex flex-wrap justify-center gap-x-2 gap-y-2.5 mb-4">
		<button className="select-none cursor-pointer rounded-[100px] border border-transparent px-6 text-black transition-colors duration-200 ease-in-out" type="submit" disabled={loading} form="partiful-tags">
		{loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
		🔮 Ask again
	</button>
		<a href={url} className="partiful-link select-none cursor-pointer rounded-[100px] border border-transparent px-6 text-black transition-colors duration-200 ease-in-out link">
		🎉 Pick this
		</a>
		</div>
);
};

export default BottomButtons;
