# Conversion Adjustments Setup Plan

This document outlines the strategy for capturing and propagating unique identifiers (Order IDs/Transaction IDs and GCLIDs) across different lead sources (Forms, WhatsApp, and Phone Calls). This will allow you to perform manual **Conversion Adjustments** (Retractions) in Google Ads to clean up bad lead data.

---

## 1. Tracking Strategies by Lead Type

### A. Forms (Quick Quote & Detailed Booking)
* **Identifier Method:** Unique Order ID (Transaction ID)
* **Workflow:**
  1. Generate a unique Lead ID (e.g., `JBC-F-10029`) on submission or initial form load.
  2. Send this Lead ID to Google Ads via the `transaction_id` parameter in GTM during the conversion event.
  3. Include this Lead ID in the Resend notification email sent to the administrator.
  4. Append a row to the Google Sheet (see Section 3) with all lead data.
  5. To retract: Upload a CSV containing the `Order ID` (Lead ID) and set the adjustment type to `RETRACT`.

### B. WhatsApp Leads
* **Identifier Method:** Unique Order ID (Transaction ID)
* **Workflow:**
  1. When the user clicks the WhatsApp button, generate a unique Lead ID (e.g., `JBC-WA-20054`).
  2. Fire the GAds conversion tag via GTM passing the Lead ID as the `transaction_id`.
  3. Dynamically append the Lead ID to the pre-filled WhatsApp message text:
     * *Example:* `https://wa.me/61412345678?text=Hi%2C%20I'd%20like%20to%20get%20a%20quote.%20(Ref:%20JBC-WA-20054)`
  4. Append a row to the Google Sheet with the Lead ID, timestamp, GCLID (if present), and source page.
  5. When you receive the WhatsApp message, you will see `JBC-WA-20054` in your chat.
  6. To retract: Upload the retraction CSV using the `Order ID` (`JBC-WA-20054`).

### C. Phone Call Leads (Alternative to Google Call Forwarding)
* **Identifier Method:** Google Click ID (GCLID) with Timestamp Matching
* **Why avoid Call Forwarding:** Dynamic replacement of phone numbers on load can cause layout shifts, look spammy or non-local to clients, and prevent users from saving your direct contact details.
* **Workflow:**
  1. **GCLID Capturing:** A small utility script parses `gclid` (and iOS click IDs: `wbraid`, `gbraid`) from the URL query parameters on landing, storing it in a cookie or `localStorage` for 30 days.
  2. **Call Click Logging:** When a call link is clicked, the stored GCLID and a precise timestamp are sent to the Next.js backend which appends a row to the Google Sheet.
  3. **Call Log Correlation:** When you receive a spam or invalid phone call:
     * Check the call time in your phone records.
     * Filter the Google Sheet for `Call Click` events near that timestamp to find the GCLID.
     * Retract the conversion in Google Ads using the matched GCLID.

---

## 2. CSV Upload Formats for Retractions

Once the system is in place, download the official Google Ads **Conversions adjustments** template from *Goals > Conversions > Uploads* and upload a file with the following columns:

### For Forms and WhatsApp (Using Order ID)
| Order ID | Conversion Name | Adjustment Type | Adjustment Time |
| :--- | :--- | :--- | :--- |
| `JBC-F-10029` | `Submit Partial Lead` | `RETRACT` | `2026-07-01 14:30:00+10:00` |
| `JBC-WA-20054` | `Whatsapp Click` | `RETRACT` | `2026-07-01 15:15:00+10:00` |

### For Phone Calls (Using GCLID)
| Google Click ID | Conversion Name | Conversion Time | Adjustment Type | Adjustment Time |
| :--- | :--- | :--- | :--- | :--- |
| `Cj0KCQjwiMmwBhDx...` | `Phone Call` | `2026-07-01 12:05:00+10:00` | `RETRACT` | `2026-07-01 12:45:00+10:00` |

---

## 3. Data Storage: Google Sheets (Agency Drive)

### Is it safe and okay to store client lead data in the agency's Google Drive?

**Yes, it is safe and acceptable** under the following conditions:

* **Access Control:** The Google Sheet must be kept **private** (not shared publicly or with the client). Only `kinstelsolutions@gmail.com` and any other trusted team members should have access.
* **Data Minimisation:** The sheet will contain Name, Email, Phone, Lead ID, Source, and GCLID. This is standard operational data for running an ads campaign on behalf of the client, which is standard agency practice.
* **Disclosure:** It is good practice (and potentially required under the Australian Privacy Act) to disclose in the website's Privacy Policy that lead data may be processed by the agency managing the advertising campaigns. The existing Privacy Policy should be checked.
* **Non-Workspace Account Note:** Since `kinstelsolutions@gmail.com` is a personal Gmail account (not Google Workspace), there is no organization-level admin or audit trail. Keep this in mind if the arrangement with the client ever changes — you own and control the sheet entirely.

**Verdict:** ✅ Fully possible. ✅ Safe if the sheet is private. ✅ Standard agency practice.

---

### Google Sheet Structure

**Sheet Name:** `JBC - Lead Log`
**Location:** `kinstelsolutions@gmail.com` Google Drive > `Clients / James Bond Cleaning` folder

| Column | Description |
| :--- | :--- |
| `Timestamp` | Date & time the event occurred (AEST/AEDT) |
| `Lead ID` | The unique identifier (e.g. `JBC-F-1001`, `JBC-WA-1002`) |
| `Type` | `Form - Partial`, `Form - Full`, `WhatsApp`, `Call Click` |
| `Name` | Customer name (Forms only; blank for WhatsApp/Call) |
| `Email` | Customer email (Forms only) |
| `Phone` | Customer phone (Forms only) |
| `Services` | Services selected (Forms only) |
| `GCLID` | The Google Click ID captured from URL params (all types) |
| `Source Page` | The page URL the event was triggered from |
| `Notes / Status` | Manual field: e.g., `Spam`, `Qualified`, `Retracted` |

---

## 4. Manual Setup Guide (One-Time, Done by You)

### Step 1 — Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) while logged into `kinstelsolutions@gmail.com`.
2. Create a new spreadsheet named `JBC - Lead Log`.
3. Set up the column headers exactly as listed in Section 3 above.
4. Keep the sharing settings as **Restricted** (only you can access).
5. Copy the **Spreadsheet ID** from the URL:
   * URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   * Save this ID — you will need it later.

### Step 2 — Set Up a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com) and log in with `kinstelsolutions@gmail.com`.
2. Click **Select a project** (top bar) > **New Project**.
3. Name it `kinstel-jbc-leads` and click **Create**.
4. In the left sidebar, go to **APIs & Services > Library**.
5. Search for **Google Sheets API** and click **Enable**.

### Step 3 — Create a Service Account
A Service Account is a "robot" Google identity that the website will use to write to the sheet — no human login required.

1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials > Service Account**.
3. Name it `jbc-sheet-writer`, click **Create and Continue**, then **Done**.
4. Click the newly created service account in the list.
5. Go to the **Keys** tab > **Add Key > Create new key > JSON**.
6. A `.json` file will download to your computer. **Keep this file safe — it is a credential secret.**
7. Open the JSON file and note the `client_email` value (looks like `jbc-sheet-writer@kinstel-jbc-leads.iam.gserviceaccount.com`).

### Step 4 — Share the Sheet with the Service Account
1. Open your `JBC - Lead Log` Google Sheet.
2. Click **Share** (top right).
3. Paste the `client_email` from Step 3 into the share dialog.
4. Set the permission to **Editor**.
5. Uncheck "Notify people" and click **Share**.
6. The sheet is now writable by the service account, but still invisible to anyone else.

### Step 5 — Add Credentials to Vercel Environment Variables
The JSON key file contents need to be available to the Next.js server securely. **Do not commit this to Git.**

1. Open the downloaded JSON key file in a text editor.
2. Copy the entire JSON content.
3. Go to your [Vercel project dashboard](https://vercel.com) > **Settings > Environment Variables**.
4. Add the following variables:
   * `GOOGLE_SHEETS_SPREADSHEET_ID` → The Spreadsheet ID from Step 1.
   * `GOOGLE_SERVICE_ACCOUNT_KEY` → Paste the entire JSON content as the value (Vercel handles multi-line secrets correctly).
5. Also add these to your local `.env.local` file for development testing.

---

## 5. Next Steps & Implementation Tasks

- [x] Agree on tracking strategy per lead type.
- [x] Choose Google Sheets (agency Drive) as the storage layer.
- [ ] Align on unique ID prefixes (e.g. `JBC-F-` for forms, `JBC-WA-` for WhatsApp, `JBC-C-` for call clicks).
- [ ] You complete the **Manual Setup Guide** (Steps 1–5 above).
- [ ] Implement GCLID capturing utility script on the frontend.
- [ ] Implement unique Lead ID generation logic.
- [ ] Update GTM data layer pushes to include `transaction_id` for all conversion events.
- [ ] Update Next.js server actions to write rows to the Google Sheet on form submit.
- [ ] Add a Google Sheets API call on WhatsApp and Call button clicks (client-side API route).
- [ ] Update GTM config JSON to include `transaction_id` variable and pass it to Google Ads conversion tags.
