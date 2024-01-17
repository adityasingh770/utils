#### Write a string data to a text file in current directory in Javascript
```
fs.writeFile(`${__dirname}/test.txt`, JSON.stringify(data), (err) => {
	 console.error(err);
});
```