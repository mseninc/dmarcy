import { FileUpload } from "@/components/parts/FileUpload";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <FileUpload />
      </div>
    </main>
  );
}
