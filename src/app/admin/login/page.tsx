import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "YKJ Gallery — site access",
};

export default function LoginPage() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="font-serif text-3xl mb-4 text-text-primary">Admin login</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          When this site is hosted on{" "}
          <strong className="text-text-primary">Azure Static Web Apps</strong>, you
          can sign in with <strong>Microsoft Entra ID</strong> (Azure AD)—an
          Azure-native identity, no third-party auth SaaS. After you enable it in
          the Azure portal, use the button below to authenticate.
        </p>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          After you sign in, the site header shows your account and a{" "}
          <strong className="text-text-primary">Log out</strong> link. Content
          editing in the browser still needs API + storage (see{" "}
          <code className="text-xs bg-warm-gray px-1">AZURE_ADMIN.md</code>). Until
          then, updates are made in the repo and redeployed.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/.auth/login/aad"
            className="inline-block px-6 py-2.5 bg-gold text-white font-semibold tracking-wider uppercase text-sm hover:bg-gold/90 transition-colors"
          >
            Sign in with Microsoft
          </a>
          <p className="text-xs text-text-secondary">
            This link only works after Entra ID is configured on your Static Web App.
            Locally it may 404—that is expected.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 border-2 border-medium-gray text-text-secondary hover:border-gold hover:text-gold transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 border-2 border-medium-gray text-text-secondary hover:border-gold hover:text-gold transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
