import Image from 'next/image';
import {
  Check,
  Star,
  Users,
  Clock,
  Waves,
  Wind,
  Sparkles,
  Sun,
  Home,
  Layers,
  ShieldCheck,
  Bug,
  Leaf,
  Hammer,
  CheckCircle,
  Sofa,
  Droplet,
  Truck,
  Package,
  Paintbrush,
  RefreshCcw,
  Target,
  Brush,
  Wrench,
  Droplets
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CtaStrip } from '@/components/home/CtaStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | James Bond Cleaning Gold Coast',
  description:
    'Professional cleaning and maintenance services on the Gold Coast including bond cleaning, carpet cleaning, pest control, painting, and more.',
};

const bondStandOuts = [
  {
    icon: Check,
    title: 'Real Estate Checklist Based',
    description: 'We use a comprehensive checklist approved by property managers to ensure nothing is missed.',
  },
  {
    icon: Star,
    title: 'Attention to Hidden Areas',
    description: 'Our team focuses on the details that matter, like inside cupboards, behind appliances, and on top of door frames.',
  },
  {
    icon: Clock,
    title: 'Reliable and Punctual',
    description: 'We respect your time. Our cleaners arrive on schedule and work efficiently to meet your deadline.',
  },
  {
    icon: Users,
    title: 'Competitive, Transparent Pricing',
    description: 'Receive a fair, all-inclusive quote with no surprise fees. Quality service that fits your budget.',
  },
];

const carpetFeatures = [
  {
    icon: Waves,
    title: 'Deep Steam Cleaning',
    description: 'Our powerful hot water extraction method reaches deep into carpet fibers to lift away dirt, grime, and allergens.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Stain Removal',
    description: "We treat and remove a wide variety of tough stains, from coffee and wine to pet accidents, restoring your carpet's appearance.",
  },
  {
    icon: Wind,
    title: 'Effective Odour Removal',
    description: 'Our cleaning process neutralises and eliminates unpleasant odours, leaving your carpets smelling fresh and clean.',
  },
];

const springFeatures = [
  {
    icon: Sun,
    title: 'Seasonal Refresh',
    description: 'The perfect way to reset your home. We air out, dust, and clean to make your space feel new again.',
  },
  {
    icon: Home,
    title: 'Complete Home Reset',
    description: 'Ideal before a special event or anytime you need a more intensive clean than your regular routine.',
  },
  {
    icon: Layers,
    title: 'Detailed Dusting',
    description: 'We go beyond surface cleaning to tackle areas that are often missed, such as behind furniture and on top of cabinets.',
  },
];

const deepCleaningFeatures = [
  {
    icon: Target,
    title: 'Intensive Focus',
    description: 'Targeting areas that are typically overlooked during regular cleaning to remove deep-seated grime.',
  },
  {
    icon: Brush,
    title: 'Heavy Grime Removal',
    description: 'Cutting through tough build-up in kitchens, bathrooms, and high-traffic areas.',
  },
  {
    icon: Sparkles,
    title: 'Complete Restoration',
    description: 'Restoring surfaces, floors, and fixtures to look as pristine as possible.',
  },
];

const pestControlFeatures = [
  { icon: ShieldCheck, title: 'Comprehensive Inspection', description: 'Thorough assessment to identify pest types, entry points, and nesting areas.' },
  { icon: Bug, title: 'Targeted Treatments', description: 'Safe and effective solutions tailored for specific pests like ants, spiders, cockroaches, and termites.' },
  { icon: Leaf, title: 'Family & Pet Safe', description: 'Using environmentally responsible and safe products to protect your loved ones.' },
];

const builderFeatures = [
  { icon: Hammer, title: 'Debris Removal', description: 'Clearing construction dust, paint splatters, and material remnants from all surfaces.' },
  { icon: CheckCircle, title: 'Detailed Cleaning', description: 'Meticulous cleaning of windows, floors, fixtures, and hidden crevices.' },
  { icon: Sparkles, title: 'Ready for Move-In', description: 'Ensuring the newly built or renovated space is spotless and completely ready for occupancy.' },
];

const upholsteryFeatures = [
  { icon: Sofa, title: 'Fabric Protection', description: 'Gentle yet highly effective cleaning methods to protect the integrity of your fabrics.' },
  { icon: Droplets, title: 'Stain & Odor Removal', description: 'Eliminates deep-set stains, pet dander, and trapped odors from your furniture.' },
  { icon: RefreshCcw, title: 'Extends Furniture Life', description: 'Regular professional cleaning prevents wear and preserves the look of your couches and chairs.' },
];

const removalistFeatures = [
  { icon: Truck, title: 'Safe Transport', description: 'Secure loading, transport, and unloading to prevent damage to your belongings.' },
  { icon: Package, title: 'Packing Services', description: 'Optional professional packing and unpacking to save you time and stress during your move.' },
  { icon: ShieldCheck, title: 'Fully Insured', description: 'Comprehensive coverage for absolute peace of mind during your relocation.' },
];

const paintingFeatures = [
  { icon: Paintbrush, title: 'Interior & Exterior', description: 'Expert residential and commercial painting services for inside and outside your property.' },
  { icon: Droplet, title: 'Premium Paints', description: 'Using high-quality paints for durability, excellent coverage, and a flawless finish.' },
  { icon: Layers, title: 'Surface Preparation', description: 'Thorough patching, sanding, and priming to ensure a perfect, long-lasting result.' },
];

const pressureWashingFeatures = [
  { icon: Waves, title: 'Hard Surface Cleaning', description: 'Revitalizing driveways, pathways, patios, decking, and building facades.' },
  { icon: Sparkles, title: 'Grime & Mold Removal', description: 'Blasting away years of accumulated dirt, algae, mold, and stubborn stains.' },
  { icon: Leaf, title: 'Eco-Friendly Approach', description: 'Using high pressure combined with environmentally safe cleaning agents.' },
];

const poolFeatures = [
  { icon: Droplets, title: 'Water Balancing', description: 'Testing and adjusting chemicals to ensure water is safe, balanced, and crystal clear.' },
  { icon: Wrench, title: 'Equipment Checks', description: 'Inspecting filters, pumps, and chlorinators for optimal performance.' },
  { icon: Sparkles, title: 'Debris Removal', description: 'Skimming, vacuuming, and brushing to keep your pool pristine year-round.' },
];

export default function ServicesPage() {
  const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] w-full bg-primary/90">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container text-primary-foreground pt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Professional Services
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              Explore our comprehensive range of cleaning and maintenance solutions tailored for the Gold Coast & Brisbane.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Iteration for Alternating Sections */}
      {[
        { id: 'bond-cleaning', title: 'Bond Cleaning', desc: 'We specialise in end-of-lease cleaning designed to help tenants secure their full bond refund, guaranteed. Our team follows a strict real estate approved checklist.', features: bondStandOuts, img: getImage('bond-cleaning-hero') || getImage('bond-cleaning') },
        { id: 'carpet-cleaning', title: 'Carpet Steam Cleaning', desc: "Over time, carpets accumulate dirt, dust, allergens, and tough stains that regular vacuuming can't handle. Our professional steam cleaning service is the solution for a truly deep clean.", features: carpetFeatures, img: getImage('carpet-cleaning-hero') || getImage('carpet-cleaning') },
        { id: 'spring-cleaning', title: 'Spring Cleaning', desc: 'Our Spring Cleaning service involves a complete refresh of your home. We air out, dust, and make your space feel new again.', features: springFeatures, img: getImage('spring-cleaning-hero') || getImage('spring-cleaning') },
        { id: 'deep-cleaning', title: 'Deep Cleaning', desc: 'Far more detailed than a standard clean. We focus on the accumulated dust and grime in all the hard-to-reach places for a hygienic environment.', features: deepCleaningFeatures, img: getImage('deep-cleaning') },
        { id: 'pest-control', title: 'Pest Control', desc: 'Protect your home from unwanted guests with our professional pest control services. We offer safe, reliable treatments to keep your property bug-free.', features: pestControlFeatures, img: getImage('pest-control') },
        { id: 'builder-cleaning', title: 'Builder Cleaning', desc: 'Post-construction cleaning requires specific attention to detail. We remove all traces of construction materials, dust, and paint leaving your new space immaculate.', features: builderFeatures, img: getImage('builder-cleaning') },
        { id: 'upholstery-cleaning', title: 'Upholstery Cleaning', desc: 'Revitalize your furniture with our specialized upholstery cleaning. We safely remove stains, odors, and allergens from all types of fabrics.', features: upholsteryFeatures, img: getImage('upholstery-cleaning') },
        { id: 'removalist', title: 'Removalist Services', desc: 'Moving is stressful enough without having to worry about logistics. Our careful, efficient removalists ensure your belongings are safely transported to your new location.', features: removalistFeatures, img: getImage('removalist') },
        { id: 'painting', title: 'Professional Painting', desc: 'Give your property a fresh new look with our professional painting services. From touch-ups to full exterior/interior repaints, we guarantee a flawless finish.', features: paintingFeatures, img: getImage('painting') },
        { id: 'pressure-washing', title: 'Pressure Washing', desc: 'Blast away years of dirt, mold, and grime from your exterior surfaces. Perfect for driveways, patios, paths, and house washing.', features: pressureWashingFeatures, img: getImage('pressure-washing') },
        { id: 'pool-maintenance', title: 'Pool Maintenance', desc: 'Enjoy your pool without the hassle of maintaining it. We offer regular cleaning, chemical balancing, and equipment checks to keep your pool sparkling.', features: poolFeatures, img: getImage('pool-maintenance') },
      ].map((service, index) => {
        const isEven = index % 2 === 0;

        return (
          <div key={service.id}>
            <section id={service.id} className={`py-16 sm:py-24 scroll-mt-24 ${!isEven ? 'bg-accent/5' : ''}`}>
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={!isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground mb-8">
                      {service.desc}
                    </p>
                    
                    <div className="space-y-6">
                      {service.features.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <feature.icon className="h-5 w-5" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">{feature.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={!isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl w-full">
                      {service.img && (
                        <Image
                          src={service.img.imageUrl}
                          alt={service.img.description}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Divider */}
            {index < 10 && (
              <div className="container">
                <div className="h-px w-full bg-border/50" />
              </div>
            )}
          </div>
        );
      })}

      <CtaStrip />
    </>
  );
}
