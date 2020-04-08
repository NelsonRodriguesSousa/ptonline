// require dependencies
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

export const pdfwriter = (plano) => {

    // create a document and pipe to a blob
    var doc = new PDFDocument();
    var stream = doc.pipe(blobStream());

    // draw some text
    doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

   
    // and some justified text wrapped into columns
    doc
        .text('And here is some wrapped text...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .text("jriejriejriejrejrijierjieirje", {
            width: 412,
            align: 'justify',
            indent: 30,
            columns: 2,
            height: 300,
            ellipsis: true
        });

    // end and display the document in the iframe to the right
    doc.end();
    stream.on('finish', function () {
        window.location = stream.toBlobURL('application/pdf');
    });

}