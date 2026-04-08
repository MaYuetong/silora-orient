/**
 * SILORA ORIENT — /api/subscribe
 * Vercel serverless function: receives an email address from the
 * homepage newsletter form and adds it to the Mailchimp audience.
 *
 * Environment variables required (set in Vercel project settings):
 *   MAILCHIMP_API_KEY   — your Mailchimp API key (ends in -us21 or similar)
 *   MAILCHIMP_AUDIENCE_ID — the Audience/List ID from Mailchimp
 *   MAILCHIMP_DC        — your datacenter prefix, e.g. "us21"
 *
 * How to find these:
 *   API Key:     Mailchimp → Account → Extras → API Keys → Create A Key
 *   Audience ID: Mailchimp → Audience → Settings → Audience name and defaults → Audience ID
 *   DC prefix:   Last segment of your API key after the final dash (e.g. us21)
 */

export default async function handler(req, res) {
  /* Only accept POST */
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  /* Basic validation */
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const API_KEY     = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DC          = process.env.MAILCHIMP_DC;

  if (!API_KEY || !AUDIENCE_ID || !DC) {
    console.error('Missing Mailchimp environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const url  = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  const data = {
    email_address: email.toLowerCase().trim(),
    status:        'subscribed',
    tags:          ['homepage_signup'],
  };

  try {
    const mcRes = await fetch(url, {
      method:  'POST',
      headers: {
        Authorization:  `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await mcRes.json();

    /* 200 = new subscriber added */
    if (mcRes.status === 200) {
      return res.status(200).json({ success: true });
    }

    /* 400 + "Member Exists" = already subscribed — treat as success */
    if (mcRes.status === 400 && result.title === 'Member Exists') {
      return res.status(200).json({ success: true, note: 'already_subscribed' });
    }

    /* Any other error from Mailchimp */
    console.error('Mailchimp error:', result);
    return res.status(500).json({ error: 'Subscription failed', detail: result.title });

  } catch (err) {
    console.error('Network error calling Mailchimp:', err);
    return res.status(500).json({ error: 'Network error' });
  }
}
