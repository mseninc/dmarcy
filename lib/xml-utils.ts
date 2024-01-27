import pako from "pako";
import { Zlib } from "zlibjs/bin/unzip.min.js";
import { XMLParser } from "fast-xml-parser";

export async function extractXmlFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  if (!buffer) {
    throw new Error("Failed to read file");
  }
  if (file.name.endsWith(".gz")) {
    const deflated = pako.inflate(buffer);
    return new TextDecoder().decode(deflated);
  } else if (file.name.endsWith(".zip")) {
    const unzip = new Zlib.Unzip(new Uint8Array(buffer));
    const fileName = unzip.getFilenames()[0];
    const fileData = unzip.decompress(fileName);
    return new TextDecoder().decode(fileData);
  } else if (file.name.endsWith(".xml")) {
    return new TextDecoder().decode(new Uint8Array(buffer));
  } else {
    throw new Error("Unsupported file type");
  }
}

export function parseXml(xml: string): FeedbackType {
  const options = {};
  const parser = new XMLParser(options);
  const object = parser.parse(xml);
  if (!("feedback" in object)) {
    throw new Error("feedback element not found");
  }
  return object.feedback;
}
