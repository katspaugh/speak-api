# Espeak-based serverless API for IPA transcriptions

### How to build the speak binary
 * Log into a Amazon Linux machine (e.g. an EC2 instance)
 * Install dev packages: `sudo yum groupinstall "Development Tools"`
 * Download the source from http://espeak.sourceforge.net
 * Unzip and switch to the `src` directory
 * In the file `src/speech.h`, comment out the line `#define USE_PORTAUDIO`
 * In `src/Makefile`, set the `AUDIO` variable to `sada`
 * Run `make speak`
