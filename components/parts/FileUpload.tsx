"use client";

import { ChangeEvent } from "react";
import { extractXmlFromFile, parseXml } from "@/lib/xml-utils";

export function FileUpload() {
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (!file) return;
    const xml = await extractXmlFromFile(file);
    const feedback = parseXml(xml);
    console.log(feedback);
    // feedback.record;
  };

  return (
    <>
      <input type="file" onChange={handleOnChange} />
    </>
  );
}
