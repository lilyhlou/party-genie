"use client";
import React, { useContext } from "react";
import { BorderBeam } from "../magicui/border-beam";
import { BioContext } from "@/context/BioContext";
import { Skeleton } from "../ui/skeleton";

const PartifulLink = () => {
  const { url } = useContext(BioContext);
  return (
		<a href={url} className="partiful-link select-none cursor-pointer rounded-[100px] border border-transparent px-6 text-black transition-colors duration-200 ease-in-out link">
		🎉 Pick this
		</a>
);
};

export default PartifulLink;
