import * as docx from "docx";

export function gen(slug, data) {
  const name = slug.replace(/-/g, " ").toUpperCase();

  const doc = new docx.Document();
  doc.Header.createParagraph(name);

  const summaryHead = new docx.Paragraph("Summary")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(summaryHead);

  const summaryText = new docx.Paragraph(data.threatactors[0].summary).left();
  doc.addParagraph(summaryText);

  const actorHead = new docx.Paragraph("Threat Actor")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(actorHead);

  const actorText = new docx.Paragraph(data.threatactors[0].actor).left();
  doc.addParagraph(actorText);

  const severityHead = new docx.Paragraph("Severity")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(severityHead);

  const severityText = new docx.Paragraph(data.threatactors[0].severity).left();
  doc.addParagraph(severityText);

  const orientationHead = new docx.Paragraph("Goal Orientation")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(orientationHead);

  const orientationText = new docx.Paragraph(
    data.threatactors[0].orientation
  ).left();
  doc.addParagraph(orientationText);

  const targetHead = new docx.Paragraph("Target")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(targetHead);

  const targetText = new docx.Paragraph(data.threatactors[0].target).left();
  doc.addParagraph(targetText);

  const capabilityHead = new docx.Paragraph("Capability")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(capabilityHead);

  const capabilityText = new docx.Paragraph(
    data.threatactors[0].capability
  ).left();
  doc.addParagraph(capabilityText);

  const operandiHead = new docx.Paragraph("Modus Operandi")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(operandiHead);

  const operandiText = new docx.Paragraph(data.threatactors[0].operandi).left();
  doc.addParagraph(operandiText);

  const activityHead = new docx.Paragraph("Main Activities")
    .heading2()
    .left()
    .pageBreak();
  doc.addParagraph(activityHead);

  const activityText = new docx.Paragraph(data.threatactors[0].activity).left();
  doc.addParagraph(activityText);

  const packer = new docx.Packer();

  packer.toBlob(doc).then(blob => {
    // saveAs from FileSaver will download the file
    saveAs(blob, `${slug}.docx`);
  });
}
