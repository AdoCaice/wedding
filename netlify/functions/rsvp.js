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
  const toEmail = process.env.RSVP_TO_EMAIL || "adocaice@gmail.com";
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

  const attendanceColor = attendance === "Да" ? "#6f8353" : "#9a6b52";
  const attendanceLabel = attendance === "Да" ? "Доаѓаат" : "Не доаѓаат";

  const html = `
    <div style="margin:0; padding:32px 18px; background:#f7f4ef; font-family:Arial, Helvetica, sans-serif; color:#593b00;">
      <div style="max-width:620px; margin:0 auto; background:#fffdf8; border:1px solid #e6dcc7; border-radius:14px; overflow:hidden;">
        <div style="padding:28px 30px; background:#7b8a5f; color:#fff;">
          <p style="margin:0 0 8px; font-size:13px; letter-spacing:1.6px; text-transform:uppercase;">Ahtan &amp; Dzejna</p>
          <h1 style="margin:0; font-size:28px; line-height:1.15;">Нов RSVP одговор</h1>
        </div>

        <div style="padding:28px 30px 8px;">
          <div style="display:inline-block; padding:8px 14px; border-radius:999px; background:${attendanceColor}; color:#fff; font-weight:700; font-size:14px;">
            ${escapeHtml(attendanceLabel)}
          </div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px; border-collapse:collapse;">
            <tr>
              <td style="padding:14px 0; border-bottom:1px solid #eee6d8; color:#8a7653; font-size:13px; text-transform:uppercase; letter-spacing:.8px;">Име и презиме</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:24px; color:#593b00;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:14px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-size:13px; text-transform:uppercase; letter-spacing:.8px;">Присуство</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px;">${escapeHtml(attendance)}</td>
            </tr>
            <tr>
              <td style="padding:14px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-size:13px; text-transform:uppercase; letter-spacing:.8px;">Број на придружба</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px;">${escapeHtml(guestCount)}</td>
            </tr>
            <tr>
              <td style="padding:14px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-size:13px; text-transform:uppercase; letter-spacing:.8px;">Имиња на придружба</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px; line-height:1.45;">${escapeHtml(guestNames || "-")}</td>
            </tr>
          </table>
        </div>

        <div style="padding:18px 30px 26px; color:#8a7653; font-size:13px; background:#fbf8f1;">
          Испратено: ${escapeHtml(submittedAt)}
        </div>
      </div>
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
      subject: `Wedding RSVP: ${name} - ${attendanceLabel}`,
      html,
    }),
  });

  if (!response.ok) {
    return json(502, { error: "Could not send RSVP email." });
  }

  return json(200, { ok: true });
};
