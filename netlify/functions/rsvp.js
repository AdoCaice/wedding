const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RSVP_TO_EMAIL || "sefteapp@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.RSVP_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return json(500, { error: "Email service is not configured." });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  const name = String(payload.name || "").trim();
  const attendance = String(payload.attendance || "").trim();
  const guestCount = String(payload.guestCount || "").trim();
  const guestNames = String(payload.guestNames || "").trim();

  if (!name || !attendance || !guestCount) {
    return json(400, { error: "Missing required RSVP fields." });
  }

  const submittedAt = new Date().toLocaleString("mk-MK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Skopje",
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2f250f; line-height: 1.5;">
      <h1 style="margin: 0 0 16px;">Нов RSVP одговор</h1>
      <p><strong>Име и презиме:</strong> ${escapeHtml(name)}</p>
      <p><strong>Присуство:</strong> ${escapeHtml(attendance)}</p>
      <p><strong>Број на придружба:</strong> ${escapeHtml(guestCount)}</p>
      <p><strong>Имиња на придружба:</strong> ${escapeHtml(guestNames || "-")}</p>
      <p><strong>Испратено:</strong> ${escapeHtml(submittedAt)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `RSVP: ${name} - ${attendance}`,
      html,
    }),
  });

  if (!response.ok) {
    return json(502, { error: "Could not send RSVP email." });
  }

  return json(200, { ok: true });
};
