docker run --shm-size 1G --rm \
  -v $(pwd)/src/dockerTest.js:/app/index.js \
  -v $(pwd)/img:/app/img alekzonder/puppeteer:1.1.1