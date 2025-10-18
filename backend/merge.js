import PDFMerger from 'pdf-merger-js';
 
// var merger = new PDFMerger();
// if the new PDFMerger() use outside it will merge every previous file with new one. So to merge only fresh files use inside in function

const mergePDfs = async (p1,p2) => {
  var merger = new PDFMerger();
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); 
  let d= new Date().getTime();
  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d;
};

export default mergePDfs;