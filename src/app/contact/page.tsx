import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with YKJ Gallery. Located in Seattle, WA.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Contact</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Contact info */}
          <div className="md:w-2/5">
            <h2 className="font-serif text-3xl mb-4">Get in Touch</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                <a
                  href="mailto:ykj@ykjgallery.com"
                  className="hover:text-gold transition-colors"
                >
                  ykj@ykjgallery.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Location
                </h3>
                <p>Seattle, WA, USA</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:w-3/5">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
