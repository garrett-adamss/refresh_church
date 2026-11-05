#!/usr/bin/env python3
import struct
import zlib
from pathlib import Path

REPO = Path("/Users/gar/source/refresh_church/.git")
PACK = REPO / "objects/pack/pack-97371c54dea9be0ea920902d50e2567fe844ac3e.pack"
IDX = REPO / "objects/pack/pack-97371c54dea9be0ea920902d50e2567fe844ac3e.idx"


def parse_idx():
    data = IDX.read_bytes()
    n = struct.unpack(">256I", data[8 : 8 + 256 * 4])[255]
    names_start = 8 + 256 * 4
    crc_start = names_start + n * 20
    offsets_start = crc_start + n * 4
    large_start = offsets_start + n * 4
    mapping = {}
    for i in range(n):
        oid = data[names_start + i * 20 : names_start + (i + 1) * 20].hex()
        off32 = struct.unpack(">I", data[offsets_start + i * 4 : offsets_start + (i + 1) * 4])[0]
        if off32 & (1 << 31):
            pos = large_start + (off32 & 0x7FFFFFFF) * 8
            offset = struct.unpack(">Q", data[pos : pos + 8])[0]
        else:
            offset = off32
        mapping[oid] = offset
    return mapping


OID_TO_OFFSET = parse_idx()
PACK_BYTES = PACK.read_bytes()


def read_size_type(buf, pos):
    byte = buf[pos]
    pos += 1
    typ = (byte >> 4) & 7
    size = byte & 15
    shift = 4
    while byte & 0x80:
        byte = buf[pos]
        pos += 1
        size |= (byte & 0x7f) << shift
        shift += 7
    return typ, size, pos


def apply_delta(base, delta):
    pos = 0
    while delta[pos] & 0x80:
        pos += 1
    pos += 1
    out_size = 0
    shift = 0
    while True:
        cmd = delta[pos]
        pos += 1
        if cmd & 0x80:
            out_size |= (cmd & 0x7F) << shift
            shift += 7
        else:
            out_size |= cmd << shift
            break
    out = bytearray()
    while pos < len(delta):
        cmd = delta[pos]
        pos += 1
        if cmd & 0x80:
            cp_off = cp_size = 0
            if cmd & 0x01:
                cp_off = delta[pos]
                pos += 1
            if cmd & 0x02:
                cp_off |= delta[pos] << 8
                pos += 1
            if cmd & 0x04:
                cp_off |= delta[pos] << 16
                pos += 1
            if cmd & 0x08:
                cp_off |= delta[pos] << 24
                pos += 1
            if cmd & 0x10:
                cp_size = delta[pos]
                pos += 1
            if cmd & 0x20:
                cp_size |= delta[pos] << 8
                pos += 1
            if cmd & 0x40:
                cp_size |= delta[pos] << 16
                pos += 1
            if cp_size == 0:
                cp_size = 65536
            out.extend(base[cp_off : cp_off + cp_size])
        else:
            out.extend(delta[pos : pos + cmd])
            pos += cmd
    return bytes(out)


def read_pack_object_at(offset):
    pos = offset
    typ, _size, pos = read_size_type(PACK_BYTES, pos)
    if typ == 1:
        return zlib.decompress(PACK_BYTES[pos:])
    if typ == 6:
        byte = PACK_BYTES[pos]
        pos += 1
        base_offset = byte & 0x7F
        while byte & 0x80:
            byte = PACK_BYTES[pos]
            pos += 1
            base_offset = ((base_offset + 1) << 7) | (byte & 0x7F)
        base_pos = offset - base_offset
        base = read_pack_object_at(base_pos)
        delta = zlib.decompress(PACK_BYTES[pos:])
        return apply_delta(base, delta)
    if typ == 7:
        base_sha = PACK_BYTES[pos : pos + 20].hex()
        pos += 20
        base = read_object_bytes(base_sha)
        delta = zlib.decompress(PACK_BYTES[pos:])
        return apply_delta(base, delta)
    raise NotImplementedError(f"pack type {typ} at {offset}")


def read_object_bytes(sha):
    path = REPO / "objects" / sha[:2] / sha[2:]
    if path.exists():
        return zlib.decompress(path.read_bytes())
    return read_pack_object_at(OID_TO_OFFSET[sha])


def parse_commit(data):
    nul = data.index(b"\0")
    body = data[nul + 1 :].decode("utf-8", "replace")
    lines = body.split("\n")
    parents = [ln.split()[1] for ln in lines if ln.startswith("parent ")]
    title = body.split("\n\n", 1)[1].strip().split("\n")[0] if "\n\n" in body else ""
    return parents, title


sha = (REPO / "refs/heads/main").read_text().strip()
titles = []
for _ in range(3):
    parents, title = parse_commit(read_object_bytes(sha))
    titles.append(title)
    if not parents:
        break
    sha = parents[0]
print("\n".join(titles))
