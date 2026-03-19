"use client";

import { CheckCircle2, Info, LayoutList, ChefHat, Bath, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "@/hooks/use-in-view";

const checklistCategories = [
  {
    id: "general",
    title: "General",
    icon: LayoutList,
    items: [
      "Remove cobwebs, insect nests, and small pests where accessible.",
      "Clean air conditioner filters, vents, and exhaust fans.",
      "Clean light fittings (where accessible & reasonably practical).",
      "Spot cleaning of walls (We don't guarantee removing permanent marks).",
      "Clean all skirting boards and architraves.",
      "Clean internal and external of all cupboards and drawers.",
      "Clean all windows, frames, tracks, and window sills (Inside & Outside).",
      "Vacuum all floors and mop hard floors.",
      "Clean all door surfaces, handles, frames, and tracks.",
      "Blind dusting (only)."
    ]
  },
  {
    id: "kitchen",
    title: "Kitchen",
    icon: ChefHat,
    items: [
      "Clean and sanitize sink, taps, tiles, and fittings.",
      "Clean all bench tops, splash backs, and drawers (Inside & outside).",
      "Thoroughly clean oven, racks, trays, and grill.",
      "Clean cooktop and range hood (including filters).",
      "Degrease and wipe all surfaces.",
      "Clean exterior of all appliances including dishwasher.",
      "Vacuum and mop floor area."
    ]
  },
  {
    id: "laundry",
    title: "Laundry",
    icon: Waves,
    items: [
      "Remove lint from ceiling, fans, and exhaust fans.",
      "Clean all tiles, sinks, tubs, and fittings.",
      "Clean cupboards and drawers (inside and outside).",
      "Clean dryer filters.",
      "Clean behind washing machine and dryer areas.",
      "Vacuum and mop floor area."
    ]
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    icon: Bath,
    items: [
      "Clean exhaust fans and vents.",
      "Deep scrub and sanitize toilet.",
      "Clean and polish bathtub and shower glass.",
      "Clean and polish sinks, mirrors, taps, and handles.",
      "Clean all soap holders, fittings, and remove soap scum.",
      "Clean and polish mirrors and towel rails.",
      "Scrub mold where possible.",
      "Vacuum and mop floor area."
    ]
  }
];

const additionalServices = [
  "Carpet steam cleaning.",
  "Pest control service/flea treatment.",
  "Blinds (Venetians).",
  "BBQ cleaning.",
  "Garden & Pool maintenance.",
  "External pressure cleaning (Patio/Deck/Driveway).",
  "Wall washing.",
  "Upholstery cleaning.",
];

export function BondCleaningChecklist() {
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  const [contentRef, contentInView] = useInView({ threshold: 0.05 });

  return (
    <section className="py-12 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container relative z-10">
        <div
          ref={headerRef}
          className={`text-center max-w-4xl mx-auto mb-10 sm:mb-16 transition-opacity duration-500 ${headerInView ? "animate-in fade-in slide-in-from-bottom-8 opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl mb-4 sm:mb-6 text-primary">
            Professional Bond Cleaning Checklist
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground/80 leading-relaxed">
            Our comprehensive checklist covers everything from general areas to detailed kitchen and bathroom sanitation. 
            We follow strict real estate standards to ensure your bond return.
          </p>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ${contentInView ? "animate-in fade-in slide-in-from-bottom-12 opacity-100" : "opacity-0"}`}
        >
          <Tabs defaultValue="general" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-white border border-slate-200 shadow-sm rounded-full mb-8 sm:mb-12">
              {checklistCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full py-3 px-4 sm:px-8 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex items-center gap-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="font-semibold">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {checklistCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0 outline-none">
                <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="bg-primary/5 py-4 px-6 border-b border-primary/10">
                    <CardTitle className="text-2xl text-primary flex items-center gap-3">
                      <category.icon className="h-6 w-6" />
                      {category.title} Inclusions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                      {category.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm sm:text-base text-slate-700 font-medium leading-normal">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Additional Services */}
        <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Additional Services</h3>
            <div className="max-w-2xl mx-auto bg-amber-50 rounded-2xl p-4 flex items-start gap-3 border border-amber-200">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 text-left">
                <strong>Attention:</strong> These services are quoted separately and only included if listed in your specific quotation.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((item, i) => (
              <div key={i} className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-primary group-hover:text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
