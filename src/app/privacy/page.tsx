import { SITE_NAME, SITE_EMAIL } from "@/lib/constants";

export const metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-card pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="container max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          At <strong>{SITE_NAME}</strong>, we respect your privacy and are committed to protecting it through
          compliance with this policy. This Privacy Policy describes how we collect, use,
          and share your personal information when you visit our website or use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect several types of information from and about users of our website, including
          information by which you may be personally identified, such as name, postal address,
          e-mail address, telephone number, and any other identifier by which you may be
          contacted online or offline ("personal information").
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use information that we collect about you or that you provide to us, including
          any personal information:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>To present our website and its contents to you.</li>
          <li>To provide you with information, products, or services that you request from us.</li>
          <li>To fulfill any other purpose for which you provide it.</li>
          <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
          <li>To notify you about changes to our website or any products or services we offer or provide though it.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclosure of Your Information</h2>
        <p>
          We may disclose aggregated information about our users, and information that does not
          identify any individual, without restriction. We do not sell your personal information to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Information</h2>
        <p>
          To ask questions or comment about this privacy policy and our privacy practices, contact us at:{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
