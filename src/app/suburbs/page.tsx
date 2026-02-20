import { ServiceArea } from '@/components/home/ServiceArea';
import { CtaStrip } from '@/components/home/CtaStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas | James Bond Cleaning',
  description:
    'We provide professional cleaning services across Gold Coast and Brisbane. Check out our service areas.',
};

export default function SuburbsPage() {
  return (
    <>
      <div className="pt-24 bg-accent/5">
        {/* We reuse the ServiceArea component which has a title and the lists */}
        <ServiceArea />
      </div>

      <CtaStrip />
    </>
  );
}
