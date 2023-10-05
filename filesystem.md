# Write a string data to a text file in current directory in Javascript
	fs.writeFile(`${__dirname}/test.txt`, JSON.stringify(data), (err) => {
	if (err) {
	  console.error(err);
	}
	});

# How to create symlinks
	https://www.linode.com/docs/guides/linux-symlinks/
