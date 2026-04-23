import type { Metadata } from "next";
import ExhibitionContent from "@/components/ExhibitionContent";

export const metadata: Metadata = {
  title: "Exhibition",
  description:
    "YKJ Gallery exhibitions — Seattle Art Fair, Young K. Jang & Young Nam Cho, THE SPACE Exhibition.",
};

export default function ExhibitionPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Exhibitions</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <ExhibitionContent />
    </>
  );
}
