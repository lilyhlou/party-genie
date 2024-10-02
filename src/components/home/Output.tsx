"use client";
import React, { useContext } from "react";
import { BorderBeam } from "../magicui/border-beam";
import { BioContext } from "@/context/BioContext";
import { Skeleton } from "../ui/skeleton";
import Image from 'next/image'

const Output = () => {
  const { title, description, image, url, loading } = useContext(BioContext);
  return (
    <div className="relative flex	flex-col items-center mt-5 mb-3.5 overflow-hidden">
      {loading && (
        <BorderBeam
          size={1200}
          borderWidth={1.5}
          duration={4}
          className="z-10"
        />
      )}
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
				<div className="partiful-event partiful-event bg-white/[.24] backdrop-blur-sm p-3.5">
	        <a href={url} className="block max-w-[300px] w-82">
						<Image src={image}  alt="Event cover image" width={300} height={300}/>
						<h3 className="text-base font-bold mt-2.5 mb-1">{title}</h3>
						<p className="text-sm">{description}</p>
	        </a>
				</div>
      )}
    </div>
  );
};

export default Output;
