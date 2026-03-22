import { promisify } from 'util';
import { createInterface } from 'readline';
import { parse } from 'url';
import { readFile } from 'fs';
import { join } from 'path';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const parseUrl = (url) => {
  const parsed = parse(url);
  return {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.path,
    query: parsed.query
  };
};

const parseFile = (filePath) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split('\n');
        const parsedLines = lines.map((line) => {
          const trimmed = line.trim();
          if (trimmed) {
            return parseUrl(trimmed);
          } else {
            return null;
          }
        });
        resolve(parsedLines);
      }
    });
  });
};

const parseInput = async () => {
  const lines = [];
  for await (const line of rl) {
    lines.push(line.trim());
  }
  const parsedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed) {
      return parseUrl(trimmed);
    } else {
      return null;
    }
  });
  return parsedLines;
};

const parse = async (filePath) => {
  if (filePath) {
    return parseFile(filePath);
  } else {
    return parseInput();
  }
};

export { parse };