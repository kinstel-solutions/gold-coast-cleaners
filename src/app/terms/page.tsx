import { SITE_NAME, SITE_EMAIL } from "@/lib/constants";

export const metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of Service for ${SITE_NAME}`,
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-card pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="container max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          These Terms and Conditions are applicable to all agreements for the provision of Services by Us to the Customer, and they take precedence over any other documents or communications from the Customer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Interpretation</h2>
        <p>Within these terms and conditions, the following definitions apply:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>“Customer” or “You”</strong> refers to any individual who purchases services from {SITE_NAME}.</li>
          <li><strong>“We” or “Us”</strong> refers to {SITE_NAME} or any authorized contractor approved by {SITE_NAME}.</li>
          <li><strong>“Services” or “Service”</strong> denotes any service that the client wishes to have performed.</li>
          <li><strong>“Terms and Conditions”</strong> pertains to the terms and conditions of service outlined on this webpage, as well as any mutually agreed-upon terms in written form by Us.</li>
          <li><strong>“Cleaner” or “Cleaners”</strong> signifies any person employed by Us to carry out the services.</li>
          <li><strong>“Heavily Soiled”</strong> indicates the presence of increased grime, dust, or dirt beyond the normal levels found in a residence.</li>
          <li><strong>“Managing Agent”</strong> is the agent responsible for managing the rental affairs of the property, such as a Real Estate agent.</li>
          <li><strong>“Property”</strong> refers to the specific property for which a Bond Clean is required.</li>
          <li><strong>“Bond Cleaning Standards”</strong> refers to the level of cleanliness in the Property that meets the scrutiny of the Managing Agent (in accordance with the Residential Tenancies and Rooming Act 2008) and enables the release of the bond to the Customer.</li>
          <li><strong>“Reasonable endeavors”</strong> indicates that We have made the best possible effort to arrive at an informed decision based on the available information at that specific point in time.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Inappropriate Behavior</h2>
        <p>
          We do not tolerate any form of inappropriate behavior towards Us or our cleaners. This includes behavior that is harassing, intimidating, threatening, or fear-inducing, whether conveyed verbally, in writing, or physically. This also encompasses explicit language, racism, and defamatory statements. We retain the right to take necessary actions, including legal recourse, against individuals engaged in such behavior. We hold the authority to terminate Services immediately without issuing a refund. By engaging our services, you, the Customer, acknowledge and agree to these terms, recognizing that you have no claim to any refund in such cases.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Pricing</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Quotations are provided as estimates and are based on average house and room sizes.</li>
          <li>While we strive to provide accurate quotes, certain factors may lead to quote adjustments. These factors include: discrepancies between the property’s description and the actual property, such as additional rooms or different blinds.</li>
          <li>For properties with up to 2 bedrooms, the quoted price includes cleaning one sliding door panel and 4 standard-sized windows. Beyond this, for properties with more than 2 bedrooms, the quoted price covers 2 sliding doors and 8 windows.</li>
          <li>Properties heavily soiled may require extra time or chemicals to meet the Bond Cleaning Standards set by the Managing Agent under the Residential Tenancies and Rooming Act 2008.</li>
          <li>Specialist services may be necessary for certain areas, such as high windows or areas requiring specific skills or equipment to meet Bond Cleaning standards.</li>
          <li>Any area or contents not within the defined scope of the cleaning schedule.</li>
          <li>Additional costs incurred by the cleaner, such as parking fees or property key pickup fees.</li>
          <li>Changes to the original customer requirements, such as cleaning specific items.</li>
          <li>Exclusion of cleaning for items or areas that pose risks to cleaners, in which case, related Bond Cleaning Guarantees are void.</li>
          <li>Natural wear and tear or excessive grime buildup, which may render some areas or items ineligible for warranty.</li>
          <li>If a quote adjustment is necessary, we will communicate with you to reach an agreement.</li>
          <li>Upon agreement on the quote adjustment, you commit to paying the adjusted amount using the provided Credit Card before the adjusted work begins.</li>
          <li>If you disagree with a quote adjustment, please note that this could affect your Bond back guarantee for some or all areas. In such cases, we will convey this information in person, over the phone, or via email.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Access</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>The Customer must remain reachable and accessible, with communication established at least 1 hour before the agreed job commencement time. If we are unable to contact you, we will make reasonable efforts to proceed with the job. However, failure to establish contact might result in an incomplete job and void any warranty. In such cases, returning to the property will incur a fee based on the cleaner’s required hours.</li>
          <li>Ensuring access to the Property for the Cleaner is solely the Customer’s responsibility.</li>
          <li>In cases where the property is inaccessible by key or entry is denied at the agreed time, the Customer accepts a non-access fee of $40 per hour, up to the total job cost.</li>
          <li>Written agreement (via SMS or email) on key collection may incur extra charges based on distance, calculated in 10km increments using Google Maps’ shortest route. The fee is $40 per 10km increment.</li>
          <li>Inaccessible properties could incur a $70 cancellation fee or a $70 postponement fee, subject to availability.</li>
          <li>Unobstructed access to all areas needing service is required for our Cleaners.</li>
          <li>The Customer permits the taking of photographic images of the Property before, during, and after service for quality assurance and proof of limitations.</li>
          <li>The Property must have electricity and running water for a bond clean. Lack of these utilities may void the Bond Cleaning Guarantee, and the Cleaner will contact the Customer for advice.</li>
          <li>Heavy items (above 5kgs) need to be moved by the Customer before cleaning, at their own risk and cost. Failing this, the Bond Cleaning Guarantee for that area is void.</li>
          <li>Personal items, furniture, etc., must be removed by the Customer before cleaning, with no liability for potential damage during service.</li>
          <li>All rubbish, including items in drawers and cupboards, should be removed. Failure to do so will affect the Bond Cleaning guarantee.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Postponement, Cancellations and Refund Policy</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>In the event that the Customer chooses to postpone any Services on the scheduled service date, a postponement charge of $70 will be applicable. Additionally, if a Customer decides to postpone a Service, the entire monetary value associated with that particular Service will be retained as a security measure by our company.</li>
          <li>For cancellations of Bond Cleaning services following a booking, an administration fee of $50 will be levied.</li>
          <li>Cancellations made within 72 hours prior to the scheduled job date will incur a cancellation and administration charge of $100.</li>
          <li>In cases where a booking is canceled within 24 hours of the initial booking date, a cancellation fee of $200 will apply.</li>
          <li>It is important to note that we retain the authority to cancel a job if we determine that the condition of the property poses a risk to the safety, health, or well-being of our staff, or if access to the property is not feasible as previously agreed upon. In such cases, same-day cancellation fees will be enforceable.</li>
          <li>We maintain the right to reschedule or cancel any Service if the property’s condition or size differs from the description provided or if unforeseen circumstances arise.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payment</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Payment through Credit Card or Bank Transfer is required prior to service. Full payment must be made before the clean starts, unless agreed otherwise in writing.</li>
          <li>A valid credit card is required to secure a booking date, with a minimum $50 booking fee.</li>
          <li>For bank transfers, remittance details should be sent, with a 3-day clearance period. Failure to remit within 3 days leads to cancellation and forfeiture of the booking fee, if applicable.</li>
          <li>Unpaid jobs for one month incur a $250 late charge and 5% of the total invoice amount per month from the 8th day onwards.</li>
          <li>Additional legal costs and expenses arising from breaches of these terms are borne by the Customer.</li>
          <li>Non-payment may result in reporting to credit agencies, affecting credit ratings and rental/credit opportunities.</li>
          <li>Unauthorized credit card chargebacks incur a 25% admin fee plus GST and interest.</li>
          <li>Unauthorized chargebacks may involve Recovery Agents and impact Credit Scores.</li>
          <li>In the case of work orders from rental/leasing agencies or government agencies, we need a formal work order approving the cost and details of the same party responsible for the payment. {SITE_NAME} will never chase the customers or any third party.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Bond Return Guarantee</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Our Bond Cleaning Guarantee ensures free rectification of any cleaning issue identified by the Managing Agent (in accordance with the Residential Tenancies and Rooming Act 2008) within the scope of these Terms and Conditions and our Inclusions and Exclusions.</li>
          <li>This guarantee is specific to the Service you’ve engaged us for. For example, if you’ve hired us for a Bond Clean but not carpet cleaning, the Bond Cleaning Guarantee only pertains to the bond clean, excluding carpets.</li>
          <li>Some items, such as ceilings, garage walls, or deep stains requiring third-party professionals, are not covered by our Bond Cleaning Guarantee.</li>
          <li>A re-clean is applicable upon receipt of a Managing Agent’s report detailing cleaning issues along with images.</li>
          <li>A notice period of 24-72 working hours from the Managing Agent’s report reception is required to reschedule a re-clean, if necessary.</li>
          <li>The re-clean only addresses problems stated in the original report by the property manager/agent, if applicable.</li>
          <li>Following a re-clean, we warrant the work for one day. If the Managing Agent does not provide feedback within 1 day (24 hours), we consider the re-clean as fulfilling the Bond Cleaning Guarantee, adhering to our Terms and Conditions.</li>
          <li>These Terms and Conditions persist during the Service, re-clean, or the interim period between re-cleans and inspections.</li>
          <li>All re-cleans are subject to these Terms and Conditions.</li>
          <li>The Bond Return Guarantee only applies if you contact us within 7 calendar days of the completed Service.</li>
          <li>The Bond Return Guarantee does not cover natural events over time, such as settled dust, watermarks, or open windows.</li>
          <li>The Bond Return Guarantee becomes void if the property is not vacant after our cleaners’ service, except for authorized carpet cleaning or with written agreement from us.</li>
          <li>For the Bond Return Guarantee to apply, the bond clean must occur after furniture removal, with no occupants, and all necessary maintenance completed.</li>
          <li>We are not liable for Acts of God like floods, storms, fires, earthquakes, or cyclones.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Claims &amp; Complaints</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>No refund claims will be considered after Service completion and our departure from the property.</li>
          <li>Before engaging a third party for service, the Customer must agree to a re-clean or inspection for unsatisfactory work.</li>
          <li>The Bond Cleaning guarantee is specific to Bond Cleaning services only. Carpet cleaning and pest control service/flea treatment are warranted by the respective contractors.</li>
          <li>While utmost care is taken during the Service, accidental breakage might occur for older items susceptible to wear and tear. Damage beyond this needs to be reported in writing with relevant photos.</li>
          <li>Claims against Us will not cover incidental costs, including rent or bond loss resulting from the service.</li>
          <li>Damage claims require proof from either party indicating that the damage occurred during the service. Responsibility lies with the contractor in case of fault. Both parties agree to share details and grant property access for the claim process, including quotes for replacement/repair.</li>
          <li>If fridge/freezer cleaning is required, the Customer must empty and defrost it beforehand. Additional charges may apply.</li>
          <li>Any incidents involving accidents, breakage, property damage, or theft due to a cleaner’s action must be reported within 24 hours of the Service’s completion.</li>
          <li>To file a complaint, please send a written message to <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a>.</li>
          <li>Complaints need to be lodged within 24 hours of the completed Service. Provide your name, contact number, complaint date, a detailed explanation including relevant documents and notes, and your desired resolution.</li>
          <li>Failure to follow our complaints procedure empowers us to dismiss or take no further action at our discretion.</li>
        </ul>
      </div>
    </div>
  );
}
