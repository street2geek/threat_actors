import * as docx from "docx";
import saveAs from "file-saver";
import marked from "marked";

export default (function() {
  function htmlEscapeToText(text) {
    return text.replace(/&#[0-9]*;|&amp;/g, function(escapeCode) {
      if (escapeCode.match(/amp/)) {
        return "&";
      }

      return String.fromCharCode(escapeCode.match(/[0-9]+/));
    });
  }

  function renderPlain() {
    var render = new marked.Renderer();

    // render just the text of a link
    render.link = function(href, title, text) {
      return text;
    };

    // render just the text of a paragraph
    render.paragraph = function(text) {
      return htmlEscapeToText(text) + "\r\n";
    };

    // render just the text of a heading element, but indecate level
    render.heading = function(text, level) {
      return level + " ) " + text;
    };

    render.br = function() {
      return "\r\n";
    };

    render.code = function(code) {
      return "\n\n" + code + "\n\n";
    };

    render.strong = function(text) {
      return text;
    };

    return render;
  }

  function generate(slug, data) {
    //console.log(marked(data.threatactors[0].summary));
    const name = slug.replace(/-/g, " ").toUpperCase();

    const doc = new docx.Document();
    doc.Header.createParagraph(name);

    const summaryHead = new docx.Paragraph("Summary").heading2().left();
    doc.addParagraph(summaryHead);

    const summaryText = new docx.Paragraph(
      marked(data.threatactors[0].summary || "...", { renderer: renderPlain() })
    ).left();
    doc.addParagraph(summaryText);

    const actorHead = new docx.Paragraph("Threat Actor").heading2().left();

    doc.addParagraph(actorHead);

    const actorText = new docx.Paragraph(
      marked(data.threatactors[0].actor || "...", { renderer: renderPlain() })
    ).left();
    doc.addParagraph(actorText);

    const severityHead = new docx.Paragraph("Severity").heading2().left();

    doc.addParagraph(severityHead);

    const severityText = new docx.Paragraph(
      marked(data.threatactors[0].severity || "...", {
        renderer: renderPlain()
      })
    ).left();
    doc.addParagraph(severityText);

    const orientationHead = new docx.Paragraph("Goal Orientation")
      .heading2()
      .left();

    doc.addParagraph(orientationHead);

    const orientationText = new docx.Paragraph(
      marked(data.threatactors[0].orientation || "...", {
        renderer: renderPlain()
      })
    ).left();
    doc.addParagraph(orientationText);

    const targetHead = new docx.Paragraph("Target").heading2().left();

    doc.addParagraph(targetHead);

    const targetText = new docx.Paragraph(
      marked(data.threatactors[0].target || "...", { renderer: renderPlain() })
    ).left();
    doc.addParagraph(targetText);

    const capabilityHead = new docx.Paragraph("Capability").heading2().left();

    doc.addParagraph(capabilityHead);

    const capabilityText = new docx.Paragraph(
      marked(data.threatactors[0].capability || "...", {
        renderer: renderPlain()
      })
    ).left();
    doc.addParagraph(capabilityText);

    const operandiHead = new docx.Paragraph("Modus Operandi").heading2().left();

    doc.addParagraph(operandiHead);

    const operandiText = new docx.Paragraph(
      marked(data.threatactors[0].operandi || "...", {
        renderer: renderPlain()
      })
    ).left();
    doc.addParagraph(operandiText);

    const activityHead = new docx.Paragraph("Main Activities")
      .heading2()
      .left();

    doc.addParagraph(activityHead);

    const activityText = new docx.Paragraph(
      marked(data.threatactors[0].activity || "...", {
        renderer: renderPlain()
      })
    ).left();
    doc.addParagraph(activityText);

    const packer = new docx.Packer();

    packer.toBlob(doc).then(blob => {
      saveAs(blob, `${slug}.docx`);
    });
  }

  return {
    generate
  };
})();
