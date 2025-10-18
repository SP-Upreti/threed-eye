import ThreeScene from "@/component/modal";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-dvh ">
      <Suspense >
        <ThreeScene />
      </Suspense>
    </div>
  );
}
