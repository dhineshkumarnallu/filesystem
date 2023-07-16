const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/createTextFile', (req, res) => {
const currentTimestamp = Date.now();
const dateObj = new Date(currentTimestamp);
const formattedDate = dateObj.toLocaleString();
const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
  
const fileName = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}.txt`;
const filePath = path.join(__dirname, 'fileFolder', fileName);
fs.writeFile(filePath, formattedDate.toString(), (err) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error creating text file');
  } else {
    console.log(`Text file ${fileName} created successfully`);
    res.status(200).send(`Text file ${fileName} created successfully`);
  }
  });
});

app.get("/files", (req, res) => {
    const folderPath = path.join(__dirname, "fileFolder");
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.send(files);
      }
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});