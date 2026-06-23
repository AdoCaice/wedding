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

  const isAttending = attendance === "Да";
  const attendanceColor = isAttending ? "#7b8a5f" : "#9a6b52";
  const attendanceLabel = isAttending ? "Доаѓаат" : "Не доаѓаат";
  const attendanceText = isAttending ? "Да, со задоволство" : "Не, за жал не сум во можност";

  const html = `
    <div style="margin:0; padding:28px 16px; background:#f7f4ef; font-family:Georgia, 'Times New Roman', serif; color:#593b00;">
      <div style="max-width:620px; margin:0 auto; background:#fffdf8; border:1px solid #e8ddc9; border-radius:10px; overflow:hidden;">
        <div style="padding:30px 30px 24px; background:#fbfaf5; border-bottom:1px solid #e8ddc9; text-align:center;">
          <p style="margin:0 0 10px; color:#7b8a5f; font-family:Arial, Helvetica, sans-serif; font-size:12px; letter-spacing:2.2px; text-transform:uppercase;">Ahtan &amp; Dzejna</p>
          <h1 style="margin:0; color:#593b00; font-size:30px; font-weight:400; line-height:1.15;">Нов одговор за свадбата</h1>
          <p style="margin:12px 0 0; color:#8a7653; font-size:16px;">12.08.2026</p>
        </div>

        <div style="padding:28px 30px 10px;">
          <div style="display:inline-block; padding:9px 16px; border-radius:999px; background:${attendanceColor}; color:#fff; font-family:Arial, Helvetica, sans-serif; font-weight:700; font-size:14px;">
            ${escapeHtml(attendanceLabel)}
          </div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px; border-collapse:collapse;">
            <tr>
              <td style="padding:16px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:1.4px;">Име и презиме</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:26px; color:#593b00; line-height:1.2;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:16px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:1.4px;">Присуство</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px; line-height:1.35;">${escapeHtml(attendanceText)}</td>
            </tr>
            <tr>
              <td style="padding:16px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:1.4px;">Број на придружба</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px;">${escapeHtml(guestCount)}</td>
            </tr>
            <tr>
              <td style="padding:16px 0 6px; border-top:1px solid #eee6d8; color:#8a7653; font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:1.4px;">Имиња на придружба</td>
            </tr>
            <tr>
              <td style="padding:0 0 16px; font-size:18px; line-height:1.45;">${escapeHtml(guestNames || "-")}</td>
            </tr>
          </table>
        </div>

        <div style="padding:18px 30px 24px; color:#8a7653; font-family:Arial, Helvetica, sans-serif; font-size:13px; background:#fbf8f1; border-top:1px solid #eee6d8;">
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
      subject: `Нов одговор за свадбата: ${name} - ${attendanceLabel}`,
      html,
    }),
  });

  if (!response.ok) {
    return json(502, { error: "Could not send RSVP email." });
  }

  return json(200, { ok: true });
};
