import { readFileSync, writeFileSync } from 'fs';
import { inflateSync } from 'zlib';
import { join } from 'path';

const repo = '/Users/gar/source/refresh_church/.git';
const PACK = 'pack-97371c54dea9be0ea920902d50e2567fe844ac3e';

const pack = readFileSync(join(repo, 'objects/pack', `${PACK}.pack`));
const idx = readFileSync(join(repo, 'objects/pack', `${PACK}.idx`));

const n = idx.readUInt32BE(8 + 255 * 4);
const namesStart = 8 + 256 * 4;
const crcStart = namesStart + n * 20;
const offsetsStart = crcStart + n * 4;
const largeStart = offsetsStart + n * 4;

const oidToOffset = new Map();
for (let i = 0; i < n; i++) {
  const oid = idx.subarray(namesStart + i * 20, namesStart + (i + 1) * 20).toString('hex');
  let off32 = idx.readUInt32BE(offsetsStart + i * 4);
  let offset;
  if (off32 & (1 << 31)) {
    offset = Number(idx.readBigUInt64BE(largeStart + (off32 & ~(1 << 31)) * 8));
  } else offset = off32;
  oidToOffset.set(oid, offset);
}

const objectCache = new Map();

/** Inflate exactly one zlib stream (git pack objects are back-to-back). */
function inflateOne(fromOffset) {
  const input = pack.subarray(fromOffset);
  for (let len = 2; len <= input.length; len++) {
    try {
      return inflateSync(input.subarray(0, len));
    } catch (err) {
      if (err.code === 'Z_BUF_ERROR') continue;
      if (len < input.length && err.code === 'Z_DATA_ERROR') continue;
      if (len === input.length) throw err;
    }
  }
  throw new Error(`inflate failed at ${fromOffset}`);
}

function readHeader(pos) {
  let byte = pack[pos++];
  const type = (byte >> 4) & 7;
  let size = byte & 15;
  let shift = 4;
  while (byte & 0x80) {
    byte = pack[pos++];
    size |= (byte & 0x7f) << shift;
    shift += 7;
  }
  return { type, size, pos };
}

function applyDelta(base, delta) {
  let pos = 0;
  const readSize = () => {
    let size = 0;
    let shift = 0;
    for (;;) {
      const c = delta[pos++];
      size |= (c & 0x7f) << shift;
      if (!(c & 0x80)) break;
      shift += 7;
    }
    return size;
  };
  readSize();
  const resultSize = readSize();
  const result = Buffer.alloc(resultSize);
  let resPos = 0;
  while (pos < delta.length) {
    let cmd = delta[pos++];
    if (cmd & 0x80) {
      let copyFrom = 0;
      let copyLen = 0;
      if (cmd & 0x01) copyFrom = delta[pos++];
      if (cmd & 0x02) copyFrom |= delta[pos++] << 8;
      if (cmd & 0x04) copyFrom |= delta[pos++] << 16;
      if (cmd & 0x08) copyFrom |= delta[pos++] << 24;
      if (cmd & 0x10) copyLen = delta[pos++];
      if (cmd & 0x20) copyLen |= delta[pos++] << 8;
      if (cmd & 0x40) copyLen |= delta[pos++] << 16;
      if (copyLen === 0) copyLen = 65536;
      base.copy(result, resPos, copyFrom, copyFrom + copyLen);
      resPos += copyLen;
    } else {
      result[resPos++] = cmd;
    }
  }
  return result.subarray(0, resPos);
}

function readPackAt(offset) {
  if (objectCache.has(offset)) return objectCache.get(offset);
  let { type, size, pos } = readHeader(offset);
  let data;
  if (type === 6) {
    let ofs = 0;
    let b = pack[pos++];
    ofs = b & 0x7f;
    while (b & 0x80) {
      ofs = (ofs + 1) << 7;
      b = pack[pos++];
      ofs += b & 0x7f;
    }
    const baseStart = pos - ofs;
    const base = readPackAt(baseStart);
    data = applyDelta(base, inflateOne(pos));
  } else if (type === 7) {
    const baseSha = pack.subarray(pos, pos + 20).toString('hex');
    pos += 20;
    const base = readObject(baseSha);
    data = applyDelta(base, inflateOne(pos));
  } else {
    data = inflateOne(pos);
  }
  objectCache.set(offset, data);
  return data;
}

function readObject(sha) {
  const loose = join(repo, 'objects', sha.slice(0, 2), sha.slice(2));
  try {
    return inflateSync(readFileSync(loose));
  } catch {
    const off = oidToOffset.get(sha);
    if (off === undefined) throw new Error('missing ' + sha);
    return readPackAt(off);
  }
}

function commitBody(raw) {
  const nul = raw.indexOf(0);
  return raw.subarray(nul + 1).toString('utf8');
}

function commitSubject(raw) {
  const text = commitBody(raw);
  const blank = text.indexOf('\n\n');
  const msg = blank >= 0 ? text.slice(blank + 2) : text;
  return msg.split('\n')[0].trim();
}

function commitParents(raw) {
  const text = commitBody(raw);
  return text
    .split('\n')
    .filter((l) => l.startsWith('parent '))
    .map((l) => l.split(' ')[1]);
}

function walkCommits(start, limit) {
  const subjects = [];
  let sha = start;
  while (sha && subjects.length < limit) {
    const raw = readObject(sha);
    if (!raw.subarray(0, 7).equals(Buffer.from('commit '))) break;
    subjects.push(commitSubject(raw));
    const parents = commitParents(raw);
    sha = parents.length ? parents[0] : null;
  }
  return subjects;
}

const head = readFileSync(join(repo, 'refs/heads/main'), 'utf8').trim();
const lines = walkCommits(head, 3);
const out = lines.join('\n') + (lines.length ? '\n' : '');
writeFileSync('/Users/gar/source/refresh_church/.rlog.stdout', out);
process.stdout.write(out);
