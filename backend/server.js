
import express from "express"
import path from "path";
const app = express();
const port = 5000;
import multer from "multer";
const upload = multer({ dest: 'uploads/' })
import mergePDfs from "./merge.js";
 import cors from 'cors'
 app.use(cors());
app.use('/static', express.static('public'))

import { fileURLToPath } from "url";
// These two lines recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
//   res.send("hello from backend")
  res.send("hello from backend" );
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    const file1 = path.join(__dirname, req.files[0].path);
    const file2 = path.join(__dirname, req.files[1].path);

    // Merge the uploaded PDFs into public/merged.pdf
   let d = await mergePDfs(file1, file2);

    //  Redirect to the merged file
    res.redirect(`/static/${d}.pdf`);
  } catch (error) {
    console.error("Merge failed:", error);
    res.status(500).send("PDF merge failed");
  }
}
);



app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});